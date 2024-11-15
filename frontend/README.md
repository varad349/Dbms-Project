# Library Management System

## Overview
The Library Management System is a web application that allows librarians to manage their library's book collection, member records, and various library operations such as book issuing and returns.

## Features

1. **Login/Sign-up**: Users can authenticate themselves as librarians and access the system.
2. **Home Page**: The home page serves as the main dashboard, providing an overview of the library's operations.
3. **Manage Members**:
   - Displays a list of all library members.
   - Allows librarians to create, read, update, and delete member records.
4. **Manage Books**:
   - Displays a list of all books in the library's collection.
   - Allows librarians to create, read, update, and delete book records.
5. **Issue Books**:
   - Provides a modal interface on the home page to issue books to members.
   - Displays the list of available books and members.
6. **Handle Returns**:
   - Provides a modal interface on the home page to handle book returns.
   - Displays the list of books currently issued.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, Material-UI, Axios
- **Backend**: FastAPI

## Getting Started

1. Clone the repository: `git clone https://github.com/varad349/Dbms-Project.git`
2. Install dependencies: `cd library-management-system && npm install`
3. Start the development server: `npm start`
4. Open the application in your browser: `http://localhost:3000`
