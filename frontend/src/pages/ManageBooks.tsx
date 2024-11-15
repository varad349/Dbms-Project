import {Box, Button, Drawer, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import colorConfigs from "../configs/colorConfigs";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Footer from "../components/Footer";
import {useEffect, useState} from "react";
import CreateEditViewBook, {Book, BookMode} from "../components/CreateEditViewBook";
import SearchIcon from "@mui/icons-material/Search";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import {Member} from "../components/CreateEditViewMember";
import Toast, {ToastData} from "../components/Toast";
import {getBooksByQuery} from "../api/book/getBooksByQuery";
import {createNewBook} from "../api/book/createNewBook";
import {editExistingBook} from "../api/book/editExistingBook";

const ManageBooks = () => {
    const [rows, setRows] = useState<Member[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedBook, setSelectedBook] = useState<Book>({isbn: "", title: "", author: "", copies: 0});
    const [openNewBook, setOpenNewBook] = useState<boolean>(false);
    const [openEditBook, setOpenEditBook] = useState<boolean>(false);
    const [openViewBook, setOpenViewBook] = useState<boolean>(false);
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });

    const columns: GridColDef[] = [
        {
            field: 'isbn',
            headerName: 'ISBN',
            type: 'string',
            minWidth: 150,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            headerAlign: 'left',
            align: 'left',
            sortable: true,
            disableColumnMenu: true,
            flex: 1
        },
        {
            field: 'title',
            headerName: 'Title',
            type: 'string',
            minWidth: 300,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            headerAlign: 'left',
            align: 'left',
            sortable: true,
            disableColumnMenu: true,
            flex: 1
        },
        {
            field: 'author',
            headerName: 'Author',
            type: 'string',
            minWidth: 200,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            headerAlign: 'left',
            align: 'left',
            sortable: true,
            disableColumnMenu: true,
            flex: 1
        },
        {
            field: 'copies',
            headerName: 'Copies',
            type: 'number',
            minWidth: 100,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            headerAlign: 'left',
            align: 'left',
            sortable: true,
            disableColumnMenu: true,
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: "actions",
            sortable: false,
            disableColumnMenu: true,
            minWidth: 150,
            renderHeader: (params) => {
                return <strong>{params.colDef.headerName}</strong>
            },
            headerAlign: 'center',
            align: 'center',
            flex: 1,
            renderCell: (params: any) => {
                return (
                    <>
                        <Tooltip title={"view book"}>
                            <IconButton
                                onClick={() => {
                                    setSelectedBook((prevState: Book) => {return {...prevState,
                                        "isbn": params.row.isbn,
                                        "title": params.row.title,
                                        "author": params.row.author,
                                        "copies": params.row.copies
                                    }});
                                    setOpenViewBook(true);
                                }}
                            >
                                <VisibilityIcon
                                    color={"inherit"}
                                    sx={{color: "white"}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"edit book"}>
                            <IconButton
                                onClick={() => {
                                    setSelectedBook((prevState: Book) => {return {...prevState,
                                        "isbn": params.row.isbn,
                                        "title": params.row.title,
                                        "author": params.row.author,
                                        "copies": params.row.copies
                                    }});
                                    setOpenEditBook(true);
                                }}
                            >
                                <EditIcon
                                    color={"inherit"}
                                    sx={{color: "white"}}
                                />
                            </IconButton>
                        </Tooltip>
                    </>
                );
            }
        },
    ];

    const handleGetBooksByQuery = async (query: string) => {
        try {
            const response = await getBooksByQuery(query);
            setRows(response.data);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to load book details", type: "error"});
            }
        }
    }

    const handleCreate = async (book: Book) => {
        try {
            await createNewBook(book);
            setOpenNewBook(false);
            setToastConfig({open: true, message: "Book details created successfully", type: "success"});
            await handleGetBooksByQuery(searchQuery);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to create book details", type: "error"});
            }
        }
    }

    const handleUpdate = async (book: Book) => {
        try {
            await editExistingBook(book.isbn, book);
            setOpenEditBook(false);
            setToastConfig({open: true, message: "Edited book details updated successfully", type: "success"});
            await handleGetBooksByQuery(searchQuery);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to edit existing book details", type: "error"});
            }
        }
    }

    const handleToastOnclose = (state: boolean) => {setToastConfig((prevState: ToastData) => { return { ...prevState, "open": state } })};

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setOpenEditBook(true);
    };

    const handleView = (book: Book) => {
        setSelectedBook(book);
        setOpenViewBook(true);
    };

    useEffect(() => {
        handleGetBooksByQuery(searchQuery).then(r => {})
    }, [searchQuery])

    return (
        <>
            <Box
                position={"fixed"}
                top={12}
                right={5}
            >
                <Link to={"/"}>
                    <IconButton>
                        <CancelIcon
                            sx={{color: "white"}}
                        />
                    </IconButton>
                </Link>
            </Box>
            <Box
                bgcolor={colorConfigs.mainBg}
                minHeight={"100vh"}
            >
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                >
                    <Grid maxWidth={"2000px"} container pt={2} pl={3} pr={3}>
                        <Grid
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            item
                            xs={12}>
                            <AutoStoriesOutlinedIcon
                                sx={{color: "white"}}
                            />
                            <Typography
                                color={"white"}
                                pl={1}
                                fontWeight={"bold"}
                                variant={"h5"}
                            >
                                Manage Books
                            </Typography>
                        </Grid>
                        <Grid item xs={12} pt={5}>
                            <Box
                                display={"flex"}
                                gap={2}
                                flexWrap={"wrap"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <TextField
                                    id="search-field"
                                    label="Search books"
                                    type="text"
                                    variant="standard"
                                    sx={{
                                        marginRight: "30px"
                                    }}
                                    value={searchQuery}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon sx={{color: "white"}}/>
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        // Remove characters \, {, }, [, ], |, ^, `, %, &, #, +, _
                                        const filteredValue = value.replace(/[\\{}[\]|^`%&#_+]/g, "");
                                        setSearchQuery(filteredValue);
                                    }}
                                />
                                <Button
                                    sx={{
                                        height: "35px",
                                        fontWeight: "bold"
                                    }}
                                    variant={"contained"}
                                    onClick={() => {
                                        setSelectedBook({
                                            isbn: "",
                                            title: "",
                                            author: "",
                                            copies: 0
                                        });
                                        setOpenNewBook(true);
                                    }}
                                >
                                    Add Book
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} pt={5} pb={7}>
                            <Box
                                border={"2px solid white"}
                                borderRadius={"6px"}
                            >
                                <Box
                                    p={1}
                                    className={"lms-grid"}
                                    style={{
                                        height: 400,
                                        width: "100%",
                                        backgroundColor: "white"
                                    }}
                                >
                                    <DataGrid
        rows={[
          { isbn: "978-3-16-148410-0", title: "React for Beginners", author: "John Doe", copies: 10 },
          { isbn: "978-1-23-456789-0", title: "Advanced React", author: "Jane Smith", copies: 5 },
          { isbn: "978-0-12-345678-9", title: "Learning TypeScript", author: "James Brown", copies: 8 },
          { isbn: "978-3-21-654987-0", title: "JavaScript Essentials", author: "Emily White", copies: 3 },
          { isbn: "978-0-11-223344-5", title: "Mastering Web Development", author: "Michael Green", copies: 15 }
        ]}
        columns={[
          { field: "isbn", headerName: "ISBN", width: 200 },
          { field: "title", headerName: "Title", width: 250 },
          { field: "author", headerName: "Author", width: 200 },
          { field: "copies", headerName: "Copies", width: 100 },
          {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
              <>
                <Button onClick={() => handleEdit(params.row)}>Edit</Button>
                <Button onClick={() => handleView(params.row)}>View</Button>
              </>
            ),
          }
        ]}
        getRowId={(row) => row.isbn}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
      />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Footer/>
            <Drawer
                open={openNewBook}
                anchor={"right"}
                onClose={() => setOpenNewBook(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <CreateEditViewBook
                        book={selectedBook}
                        mode={BookMode.CREATE}
                        action={{
                            setIsDrawerOpen: setOpenNewBook,
                            onConfirm: handleCreate
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openViewBook}
                anchor={"right"}
                onClose={() => setOpenViewBook(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <CreateEditViewBook
                        book={selectedBook}
                        mode={BookMode.VIEW}
                        action={{
                            setIsDrawerOpen: setOpenViewBook,
                            onConfirm: () => {}
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openEditBook}
                anchor={"right"}
                onClose={() => setOpenEditBook(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <CreateEditViewBook
                        book={selectedBook}
                        mode={BookMode.EDIT}
                        action={{
                            setIsDrawerOpen: setOpenEditBook,
                            onConfirm: handleUpdate
                        }}
                    />
                </Box>
            </Drawer>
            <Toast
                data={toastConfig}
                action={{
                    onClose: handleToastOnclose
                }}
            />
        </>
    );
}

export default ManageBooks;