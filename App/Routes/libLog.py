from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from App import schemas, models, oauth2, database
from sqlalchemy import func

router = APIRouter(
    prefix="/book-management",
    tags=["Book Management"]
)

@router.post("/log-action", status_code=status.HTTP_201_CREATED)
async def log_book_management_action(
    book_id: int,
    action: str,  # 'add', 'update', or 'remove'
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    # Verify librarian status
    librarian = db.query(models.User).filter(
        models.User.user_id == current_user,
        models.User.role == 'librarian'
    ).first()
    
    if not librarian:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only librarians can perform this action"
        )

    # Verify book exists
    book = db.query(models.Book).filter(models.Book.book_id == book_id).first()
    if not book:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Book not found"
        )

    # Create management record
    new_management_record = models.BookManagement(
        librarian_id=current_user,
        book_id=book_id,
        action=action
    )

    db.add(new_management_record)
    db.commit()
    db.refresh(new_management_record)

    return {"message": f"Book management action '{action}' logged successfully"}

@router.get("/history", response_model=List[schemas.BookManagementResponse])
async def get_book_management_history(
    book_id: int = None,
    action_type: str = None,
    librarian_id: int = None,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    # Verify librarian status
    librarian = db.query(models.User).filter(
        models.User.user_id == current_user,
        models.User.role == 'librarian'
    ).first()
    
    if not librarian:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only librarians can view management history"
        )

    # Build query
    query = db.query(models.BookManagement)

    # Apply filters
    if book_id:
        query = query.filter(models.BookManagement.book_id == book_id)
    if action_type:
        query = query.filter(models.BookManagement.action == action_type)
    if librarian_id:
        query = query.filter(models.BookManagement.librarian_id == librarian_id)

    # Order by most recent first
    query = query.order_by(models.BookManagement.action_date.desc())

    records = query.all()
    return records

@router.get("/librarian-activity", status_code=status.HTTP_200_OK)
async def get_librarian_activity(
    start_date: datetime = None,
    end_date: datetime = None,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    # Verify librarian status
    librarian = db.query(models.User).filter(
        models.User.user_id == current_user,
        models.User.role == 'librarian'
    ).first()
    
    if not librarian:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only librarians can view activity reports"
        )

    # Build base query
    query = db.query(
        models.BookManagement.librarian_id,
        models.User.username,
        models.BookManagement.action,
        func.count(models.BookManagement.management_id).label('action_count')
    ).join(models.User, models.BookManagement.librarian_id == models.User.user_id)

    # Apply date filters if provided
    if start_date:
        query = query.filter(models.BookManagement.action_date >= start_date)
    if end_date:
        query = query.filter(models.BookManagement.action_date <= end_date)

    # Group by librarian and action
    query = query.group_by(
        models.BookManagement.librarian_id,
        models.User.username,
        models.BookManagement.action
    )

    activity_data = query.all()

    # Format the response
    activity_summary = {}
    for record in activity_data:
        if record.username not in activity_summary:
            activity_summary[record.username] = {
                'librarian_id': record.librarian_id,
                'actions': {}
            }
        activity_summary[record.username]['actions'][record.action] = record.action_count

    return activity_summary

# Update the existing add_book endpoint to use book_management
@router.post("/books", status_code=status.HTTP_201_CREATED)
async def add_book(
    book: schemas.BookCreate,
    db: Session = Depends(database.get_db),
    current_user: int = Depends(oauth2.get_current_user)
):
    # Verify librarian status
    librarian = db.query(models.User).filter(
        models.User.user_id == current_user,
        models.User.role == 'librarian'
    ).first()
    
    if not librarian:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only librarians can add books"
        )

    # Create new book
    new_book = models.Book(**book.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    # Log the action in book_management
    management_record = models.BookManagement(
        librarian_id=current_user,
        book_id=new_book.book_id,
        action='add'
    )
    db.add(management_record)
    db.commit()

    return {"message": "Book added successfully", "book_id": new_book.book_id}