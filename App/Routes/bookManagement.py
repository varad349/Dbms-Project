from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from App import schemas
from sqlalchemy.orm import Session
from App import database
from App import models
from App import utils, oauth2

router = APIRouter(
    prefix="/BookManage",
    tags=["BookManage"]
)


@router.post("/add_book", status_code=status.HTTP_201_CREATED)
async def add_book(book: schemas.BookCreate, db: Session = Depends(database.get_db), user_id: int = Depends(oauth2.get_current_user)):
    # Ensure that only a librarian can add books
    user = db.query(models.User).filter(models.User.user_id == user_id, models.User.role == 'librarian').first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only librarians can add books.")
    
    # Create the new book from the schema
    new_book = models.Book(**book.dict())
    
    # Add and commit the new book to the database
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    
    # Return a success message with the book_id
    return {"message": "Book added successfully", "book_id": new_book.book_id}


@router.put("/update_book/{book_id}", status_code=status.HTTP_200_OK)
async def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(database.get_db), user_id: int = Depends(oauth2.get_current_user)):
    # Ensure that only a librarian can update books
    user = db.query(models.User).filter(models.User.user_id == user_id, models.User.role == 'librarian').first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only librarians can update books.")

    # Get the existing book from the database
    existing_book = db.query(models.Book).filter(models.Book.book_id == book_id).first()
    if not existing_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found.")
    
    # Update the fields based on the incoming schema data (exclude unset values)
    for key, value in book.dict(exclude_unset=True).items():
        setattr(existing_book, key, value)

    # Commit the updates
    db.commit()
    db.refresh(existing_book)
    
    # Return a success message
    return {"message": "Book updated successfully"}


@router.delete("/remove_book/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_book(book_id: int, db: Session = Depends(database.get_db), user_id: int = Depends(oauth2.get_current_user)):
    # Ensure that only a librarian can remove books
    user = db.query(models.User).filter(models.User.user_id == user_id, models.User.role == 'librarian').first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only librarians can remove books.")
    
    # Get the existing book from the database
    existing_book = db.query(models.Book).filter(models.Book.book_id == book_id).first()
    if not existing_book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found.")
    
    # Delete the book
    db.delete(existing_book)
    db.commit()
    
    # Return a success message
    return {"message": "Book removed successfully"}
