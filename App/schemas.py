# from pydantic import BaseModel,EmailStr,AnyUrl,Field
# from typing import Optional, Dict
# from datetime import datetime,date
# from pydantic import BaseModel,validator
# from typing import List
# from datetime import datetime
# from enum import Enum

# class TransactionStatus(str, Enum):
#     PENDING = "pending"
#     COMPLETED = "completed"
#     OVERDUE = "overdue"


# class user_login(BaseModel):
#     email: EmailStr
#     password: str

# class UserRegistration(BaseModel):
#     username: str = Field(..., min_length=3, max_length=50, description="Unique username for the user")
#     first_name: Optional[str] = Field(None, max_length=50, description="First name of the user")
#     last_name: Optional[str] = Field(None, max_length=50, description="Last name of the user")
#     email: EmailStr = Field(..., description="User's email address")
#     password: str = Field(..., min_length=8, description="Password for the account")

#     class Config:
#         schema_extra = {
#             "example": {
#                 "username": "john_doe",
#                 "first_name": "John",
#                 "last_name": "Doe",
#                 "email": "john@example.com",
#                 "password": "strongpassword123"
#             }
#         }


# class BookBase(BaseModel):
#     title: str
#     author: Optional[str] = None
#     category: Optional[str] = None
#     ISBN: Optional[str] = None
#     published_year: Optional[int] = None
#     total_copies: Optional[int] = 0
#     available_copies: Optional[int] = 0

#     class Config:
#         orm_mode = True
# class BookCreate(BookBase):
#     title: str  # Title is required

# class TransactionType(str, Enum):
#     BORROW = "borrow"
#     RETURN = "return"


# class TransactionBase(BaseModel):
#     book_id: int
#     transaction_type: TransactionType
#     due_date: Optional[date]
# # Schema for updating an existing book (used for PUT/PATCH requests)
# class BookUpdate(BookBase):
#     title: Optional[str] = None
#     author: Optional[str] = None
#     category: Optional[str] = None
#     ISBN: Optional[str] = None
#     published_year: Optional[int] = None
#     total_copies: Optional[int] = None
#     available_copies: Optional[int] = None

# # Schema for the book response (used when getting a book)
# class BookResponse(BookBase):
#     book_id: int
#     created_at: str  # Changed from datetime to str

#     @validator('created_at', pre=True)
#     def format_datetime(cls, v):
#         if isinstance(v, datetime):
#             return v.strftime("%Y-%m-%d %H:%M:%S")
#         return v

#     class Config:
#         orm_mode = True


# # Schema for deleting a book (you could just return a status message)
# class BookDelete(BaseModel):
#     message: str
# class TransactionResponse(TransactionBase):
#     transaction_id: int
#     user_id: int
#     status: TransactionStatus
#     transaction_date: datetime
#     return_date: Optional[date]
#     book: BookResponse
#     user: UserResponse

#     class Config:
#         orm_mode = True

# # Statistics Schema
# class LibraryStatistics(BaseModel):
#     total_books: int
#     available_books: int
#     active_borrowers: int
#     overdue_books: int

# # Search Schema
# class BookSearchResults(BaseModel):
#     results: List[BookResponse]
#     total: int
#     page: int
#     pages: int

# # Transaction History Schema
# class UserTransactionHistory(BaseModel):
#     current_borrowings: List[TransactionResponse]
#     past_borrowings: List[TransactionResponse]
#     total_borrowed: int
#     current_overdue: int

#     class Config:
#         orm_mode = True

# # Overdue Books Schema
# class OverdueBookRecord(BaseModel):
#     transaction: TransactionResponse
#     days_overdue: int
#     fine_amount: float  # If you implement a fine system

#     class Config:
#         orm_mode = True

# class OverdueBooksResponse(BaseModel):
#     overdue_records: List[OverdueBookRecord]
#     total_overdue: int
#     total_fines: float

# # Book Management Schema
# class BookManagementResponse(BaseModel):
#     management_id: int
#     librarian_id: int
#     book_id: int
#     action: BookManagementAction
#     action_date: datetime
#     librarian: UserResponse
#     book: BookResponse

#     class Config:
#         orm_mode = True



# from pydantic import BaseModel, EmailStr, constr
# from typing import Optional, List
# from datetime import datetime, date
# from enum import Enum

# # Enums
# class UserRole(str, Enum):
#     MEMBER = "member"
#     LIBRARIAN = "librarian"

# class TransactionType(str, Enum):
#     BORROW = "borrow"
#     RETURN = "return"

# class TransactionStatus(str, Enum):
#     PENDING = "pending"
#     COMPLETED = "completed"
#     OVERDUE = "overdue"

# class BookManagementAction(str, Enum):
#     ADD = "add"
#     UPDATE = "update"
#     REMOVE = "remove"

# # Base Schemas
# class UserBase(BaseModel):
#     username: str
#     email: EmailStr
#     first_name: Optional[str]
#     last_name: Optional[str]
#     role: UserRole = UserRole.MEMBER

# class BookBase(BaseModel):
#     title: str
#     author: Optional[str]
#     category: Optional[str]
#     ISBN: Optional[constr(max_length=20)]
#     published_year: Optional[int]
#     total_copies: int
#     available_copies: int

# class TransactionBase(BaseModel):
#     book_id: int
#     transaction_type: TransactionType
#     due_date: Optional[date]

# # Create/Update Schemas
# class UserCreate(UserBase):
#     password: str

# class UserUpdate(BaseModel):
#     email: Optional[EmailStr]
#     first_name: Optional[str]
#     last_name: Optional[str]
#     password: Optional[str]

# class BookCreate(BookBase):
#     pass

# class BookUpdate(BaseModel):
#     title: Optional[str]
#     author: Optional[str]
#     category: Optional[str]
#     ISBN: Optional[str]
#     published_year: Optional[int]
#     total_copies: Optional[int]
#     available_copies: Optional[int]

# class TransactionCreate(TransactionBase):
#     pass

# # Response Schemas
# class UserResponse(UserBase):
#     user_id: int
#     created_at: datetime

#     class Config:
#         orm_mode = True

# class BookResponse(BookBase):
#     book_id: int
#     created_at: datetime

#     class Config:
#         orm_mode = True

# class TransactionResponse(TransactionBase):
#     transaction_id: int
#     user_id: int
#     status: TransactionStatus
#     transaction_date: datetime
#     return_date: Optional[date]
#     book: BookResponse
#     user: UserResponse

#     class Config:
#         orm_mode = True

# # Statistics Schema
# class LibraryStatistics(BaseModel):
#     total_books: int
#     available_books: int
#     active_borrowers: int
#     overdue_books: int

# # Search Schema
# class BookSearchResults(BaseModel):
#     results: List[BookResponse]
#     total: int
#     page: int
#     pages: int

# # Transaction History Schema
# class UserTransactionHistory(BaseModel):
#     current_borrowings: List[TransactionResponse]
#     past_borrowings: List[TransactionResponse]
#     total_borrowed: int
#     current_overdue: int

#     class Config:
#         orm_mode = True

# # Overdue Books Schema
# class OverdueBookRecord(BaseModel):
#     transaction: TransactionResponse
#     days_overdue: int
#     fine_amount: float  # If you implement a fine system

#     class Config:
#         orm_mode = True

# class OverdueBooksResponse(BaseModel):
#     overdue_records: List[OverdueBookRecord]
#     total_overdue: int
#     total_fines: float

# # Book Management Schema
# class BookManagementResponse(BaseModel):
#     management_id: int
#     librarian_id: int
#     book_id: int
#     action: BookManagementAction
#     action_date: datetime
#     librarian: UserResponse
#     book: BookResponse

#     class Config:
#         orm_mode = True



from pydantic import BaseModel, EmailStr, AnyUrl, Field, constr,validator
from typing import Optional, List, Dict
from datetime import datetime, date
from enum import Enum

# Enums
class TransactionStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    OVERDUE = "overdue"

class TransactionType(str, Enum):
    BORROW = "borrow"
    RETURN = "return"

class UserRole(str, Enum):
    MEMBER = "member"
    LIBRARIAN = "librarian"

class BookManagementAction(str, Enum):
    ADD = "add"
    UPDATE = "update"
    REMOVE = "remove"

# Base Schemas
    


class UserBase(BaseModel):
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    role: UserRole = UserRole.MEMBER

class UserResponse(UserBase):
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class UserRegistration(UserBase):
    password: str = Field(..., min_length=8, description="Password for the account")

    class Config:
        schema_extra = {
            "example": {
                "username": "john_doe",
                "first_name": "John",
                "last_name": "Doe",
                "email": "john@example.com",
                "password": "strongpassword123"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class BookBase(BaseModel):
    title: str
    author: Optional[str]
    category: Optional[str]
    ISBN: Optional[str] = Field(None, max_length=20)
    published_year: Optional[int]
    total_copies: int
    available_copies: int

    class Config:
        orm_mode = True

class BookCreate(BookBase):
    title: str  # Title is required

class BookUpdate(BaseModel):
    title: Optional[str]
    author: Optional[str]
    category: Optional[str]
    ISBN: Optional[str]
    published_year: Optional[int]
    total_copies: Optional[int]
    available_copies: Optional[int]

class BookResponse(BookBase):
    book_id: int
    created_at: datetime

    @validator('created_at', pre=True)
    def format_datetime(cls, v):
        if isinstance(v, datetime):
            return v.strftime("%Y-%m-%d %H:%M:%S")
        return v

    class Config:
        orm_mode = True

# Transaction Schemas
class TransactionBase(BaseModel):
    book_id: int
    transaction_type: TransactionType
    due_date: Optional[date]

class TransactionResponse(TransactionBase):
    transaction_id: int
    user_id: int
    status: TransactionStatus
    transaction_date: datetime
    return_date: Optional[date]
    book: BookResponse
    user: UserResponse

    class Config:
        orm_mode = True

# Statistics Schema
class LibraryStatistics(BaseModel):
    total_books: int
    available_books: int
    active_borrowers: int
    overdue_books: int

# Search Schema
class BookSearchResults(BaseModel):
    results: List[BookResponse]
    total: int
    page: int
    pages: int

# Transaction History Schema
class UserTransactionHistory(BaseModel):
    current_borrowings: List[TransactionResponse]
    past_borrowings: List[TransactionResponse]
    total_borrowed: int
    current_overdue: int

    class Config:
        orm_mode = True

# Overdue Books Schema
class OverdueBookRecord(BaseModel):
    transaction: TransactionResponse
    days_overdue: int
    fine_amount: float  # If you implement a fine system

    class Config:
        orm_mode = True

class OverdueBooksResponse(BaseModel):
    overdue_records: List[OverdueBookRecord]
    total_overdue: int
    total_fines: float

# Book Management Schema
class BookManagementResponse(BaseModel):
    management_id: int
    librarian_id: int
    book_id: int
    action: BookManagementAction
    action_date: datetime
    librarian: UserResponse
    book: BookResponse

    class Config:
        orm_mode = True

# User Response
class UserResponse(UserBase):
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True
