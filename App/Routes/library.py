from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from typing import List, Optional
from App import schemas, models, oauth2
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from App import schemas
from sqlalchemy.orm import Session
from App import database
from App import models
from App import utils, oauth2

router = APIRouter(
    prefix="/library",
    tags=["library"]
)

@router.post("/borrow/{book_id}", status_code=status.HTTP_201_CREATED)
async def borrow_book(
    book_id: int,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    # Check if book exists and is available
    book = db.query(models.Book).filter(models.Book.book_id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    if book.available_copies <= 0:
        raise HTTPException(status_code=400, detail="Book is not available")

    # Check if user has any overdue books
    overdue_books = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user,
        models.Transaction.status == 'overdue'
    ).count()
    if overdue_books > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot borrow new books while you have overdue books"
        )

    # Create new transaction
    due_date = datetime.now() + timedelta(days=14)  # 2 weeks borrowing period
    new_transaction = models.Transaction(
        user_id=current_user,
        book_id=book_id,
        transaction_type='borrow',
        due_date=due_date,
        status='pending'
    )

    # Update book availability
    book.available_copies -= 1

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return {"message": "Book borrowed successfully", "due_date": due_date}

@router.post("/return/{book_id}", status_code=status.HTTP_200_OK)
async def return_book(
    book_id: int,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    # Find active transaction
    transaction = db.query(models.Transaction).filter(
        models.Transaction.book_id == book_id,
        models.Transaction.user_id == current_user,
        models.Transaction.transaction_type == 'borrow',
        models.Transaction.status.in_(['pending', 'overdue'])
    ).first()

    if not transaction:
        raise HTTPException(status_code=404, detail="No active borrow record found")

    # Update transaction
    transaction.return_date = datetime.now()
    transaction.status = 'completed'
    transaction.transaction_type = 'return'

    book = db.query(models.Book).filter(models.Book.book_id == book_id).first()
    book.available_copies += 1
    db.commit()
    return {"message": "Book returned successfully"}

# 3. Search Books
@router.get("/search", response_model=List[schemas.BookResponse])
async def search_books(
    title: Optional[str] = None,
    author: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(database.get_db)
):
    query = db.query(models.Book)
    
    if title:
        query = query.filter(models.Book.title.ilike(f"%{title}%"))
    if author:
        query = query.filter(models.Book.author.ilike(f"%{author}%"))
    if category:
        query = query.filter(models.Book.category.ilike(f"%{category}%"))
        
    books = query.all()
    return books


@router.get("/my-books", status_code=status.HTTP_200_OK)
async def get_user_books(
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    transactions = db.query(models.Transaction).filter(
        models.Transaction.user_id == current_user
    ).all()
    
    return transactions