from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, TIMESTAMP, Date, Enum, func, ARRAY
from sqlalchemy.orm import relationship, backref, declarative_base
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.schema import MetaData

# Create the base class
Base = declarative_base()

# Create the tables in correct order - parent tables first
class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    role = Column(Enum('member', 'librarian', name='user_roles'), default='member')
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    transactions = relationship("Transaction", back_populates="user")
    managed_books = relationship("BookManagement", back_populates="librarian")


class Book(Base):
    __tablename__ = 'books'
    
    book_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    author = Column(String(100), nullable=True)
    category = Column(String(50), nullable=True)
    ISBN = Column(String(20), unique=True, nullable=True)
    published_year = Column(Integer, nullable=True)
    total_copies = Column(Integer, default=0)
    available_copies = Column(Integer, default=0)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    transactions = relationship("Transaction", back_populates="book")
    book_management = relationship("BookManagement", back_populates="book")


class Transaction(Base):
    __tablename__ = 'transactions'
    
    transaction_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    book_id = Column(Integer, ForeignKey('books.book_id', ondelete='CASCADE'), nullable=False)
    transaction_type = Column(Enum('borrow', 'return', name='transaction_types'), nullable=False)
    transaction_date = Column(TIMESTAMP, server_default=func.now())
    due_date = Column(Date, nullable=True)
    return_date = Column(Date, nullable=True)
    status = Column(Enum('pending', 'completed', 'overdue', name='transaction_statuses'), default='pending')
    
    # Relationships
    user = relationship("User", back_populates="transactions")
    book = relationship("Book", back_populates="transactions")


class BookManagement(Base):
    __tablename__ = 'book_management'
    
    management_id = Column(Integer, primary_key=True, index=True)
    librarian_id = Column(Integer, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    book_id = Column(Integer, ForeignKey('books.book_id', ondelete='CASCADE'), nullable=False)
    action = Column(Enum('add', 'update', 'remove', name='book_management_actions'), nullable=False)
    action_date = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    librarian = relationship("User", back_populates="managed_books")
    book = relationship("Book", back_populates="book_management")

# Function to create tables
