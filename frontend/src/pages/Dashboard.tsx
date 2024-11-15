import {Box, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Footer from "../components/Footer";
import colorConfigs from "../configs/colorConfigs";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SwipeUpOutlinedIcon from '@mui/icons-material/SwipeUpOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import React, {useState} from "react";
import IssueBooks, {IssueNote} from "../components/IssueBooks";
import {createNewIssueNote} from "../api/issue-note/createNewIssueNote";
import Toast, {ToastData} from "../components/Toast";
import Returns, {ReturnNote} from "../components/Returns";
import {createNewReturnNote} from "../api/return-note/createNewReturnNote";

const Dashboard = () => {
    const [openIssueBooks, setOpenIssueBooks] = useState<boolean>(false);
    const [openReturns, setOpenReturns] = useState<boolean>(false);
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });

    const handleCreateNewIssueNote = async (issueNote: IssueNote) => {
        try {
            await createNewIssueNote(issueNote);
            setToastConfig({open: true, message: "Issue note created successfully", type: "success"});
            setOpenIssueBooks(false);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to create new issue note", type: "error"});
            }
        }
    }

    const handleCreateNewReturnNote = async (returnNote: ReturnNote) => {
        try {
            await createNewReturnNote(returnNote);
            setToastConfig({open: true, message: "Return note created successfully", type: "success"});
            setOpenReturns(false);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to create new return note", type: "error"});
            }
        }
    }

    const handleToastOnclose = (state: boolean) => {setToastConfig((prevState: ToastData) => { return { ...prevState, "open": state } })};

    return (
        <>
            <Box
                bgcolor={colorConfigs.mainBg}
                minHeight={"100vh"}
                paddingBottom={"45px"}
            >
                {/* Login and Register Buttons Box */}
                <Grid item xs={12} sm={6} lg={3}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Box
                            bgcolor={'white'}
                            display={'flex'}
                            justifyContent={'center'}
                            flexWrap={'wrap'}
                            alignContent={'center'}
                            height={'80px'}
                            width={'250px'}
                            borderRadius={'8px'}
                            sx={{
                                transition: 'background-color 0.7s, color 0.7s',
                            }}
                            >
                            {/* Login and Register buttons */}
                            <div>
                                <Link to={'login'}>
                                <button
                                    style={{
                                    padding: '10px 20px',
                                    margin: '10px',
                                    backgroundColor: '#088F8F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    }}
                                >
                                    Login
                                </button>
                                </Link>
                                <Link to={'register'}>
                                <button
                                    style={{
                                    padding: '10px 20px',
                                    margin: '10px',
                                    backgroundColor: '#088F8F',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    }}
                                >
                                    Register
                                </button>
                                </Link>
                            </div>
                        </Box>
                    </Box>
                </Grid>
                <Grid container pt={2} pb={3} pl={1} pr={1}>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                textDecoration: "underline",
                                color: "white",
                                fontWeight: "bold"
                            }}
                            variant={"h5"}
                            textAlign={"center"}
                        >
                            Welcome to Library Management System
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography pb={(window.innerWidth <= 1200) ? 0 : 2} pt={2} pl={2} pr={2} color={"white"} textAlign={"center"} fontStyle={"italic"}>
                            A system that enables library administrator to manage members, manage books, manage issue
                            book details and handle returns
                        </Typography>
                    </Grid>
                </Grid>
                <Grid pl={11} pr={11} container rowSpacing={4}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: "#088F8F"
                                }}
                                to={"/manage-members"}
                            >
                                <Box
                                    id={"manage-members"}
                                    bgcolor={"white"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    flexWrap={"wrap"}
                                    alignContent={"space-around"}
                                    height={"160px"}
                                    width={"200px"}
                                    borderRadius={"8px"}
                                    sx={{
                                        transition: "background-color 0.7s, color 0.7s",
                                    }}
                                >
                                    <PeopleAltOutlinedIcon
                                        sx={{
                                            fontSize: "100px",
                                            width: "100%"
                                        }}
                                    />
                                    <Typography
                                        variant={"h6"}
                                    >
                                        Manage Members
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: "#088F8F"
                                }}
                                to={"/manage-books"}>
                                <Box
                                    id={"manage-books"}
                                    bgcolor={"white"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    flexWrap={"wrap"}
                                    alignContent={"space-around"}
                                    height={"160px"}
                                    width={"200px"}
                                    borderRadius={"8px"}
                                    sx={{
                                        transition: "background-color 0.7s, color 0.7s",
                                    }}
                                >
                                    <AutoStoriesOutlinedIcon
                                        sx={{
                                            fontSize: "100px",
                                            width: "100%"
                                        }}
                                    />
                                    <Typography
                                        variant={"h6"}
                                    >
                                        Manage Books
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: "#088F8F"
                                }}
                                onClick={() => {setOpenIssueBooks(true)}}
                                to={"#"}
                            >
                                <Box
                                    id={"issue-books"}
                                    bgcolor={"white"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    flexWrap={"wrap"}
                                    alignContent={"space-around"}
                                    height={"160px"}
                                    width={"200px"}
                                    borderRadius={"8px"}
                                    sx={{
                                        transition: "background-color 0.7s, color 0.7s",
                                    }}
                                >
                                    <ShoppingCartOutlinedIcon
                                        sx={{
                                            fontSize: "100px",
                                            width: "100%"
                                        }}
                                    />
                                    <Typography
                                        variant={"h6"}
                                    >
                                        Issue Books
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <Box
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: "#088F8F"
                                }}
                                onClick={() => {setOpenReturns(true)}}
                                to={"#"}>
                                <Box
                                    id={"handle-returns"}
                                    bgcolor={"white"}
                                    display={"flex"}
                                    justifyContent={"center"}
                                    flexWrap={"wrap"}
                                    alignContent={"space-around"}
                                    height={"160px"}
                                    width={"200px"}
                                    borderRadius={"8px"}
                                    sx={{
                                        transition: "background-color 0.7s, color 0.7s",
                                    }}
                                >
                                    <SwipeUpOutlinedIcon
                                        sx={{
                                            fontSize: "100px",
                                            width: "100%"
                                        }}
                                    />
                                    <Typography
                                        variant={"h6"}
                                    >
                                        Handle Returns
                                    </Typography>
                                </Box>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    pt={(window.innerWidth <= 1200) ? 2 : 7} pl={5} pr={5}
                    textAlign={"justify"}
                    color={"white"}
                >
                    <Typography fontWeight={"bold"}>
                        Highlighted features of the system,
                    </Typography>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Members are registered to the system by UUID, and no two members can have the same contact number."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Books are registered to the system by international standard book number (isbn)."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="When members take books from the library they will receive an issue note."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="The issue note contains all the take away book ISBNs along with the member UUID."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="All issue notes have unique issue id to uniquely identify them when the books are returned."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Issue note can only have maximum 3 distinct ISBNs."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="A member cannot take the same book from the system twice at the same time or at two different times (with another issue note)."
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CircleIcon sx={{fontSize: "10px", color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText
                                primary="A member can only take maximum of 3 different books from the system. If he/she needs another, he/she must return a book that he/she already got."
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Footer/>
            <Drawer
                open={openIssueBooks}
                anchor={"right"}
                onClose={() => setOpenIssueBooks(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <IssueBooks
                        isDrawerOpen={setOpenIssueBooks}
                        onConfirm={handleCreateNewIssueNote}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openReturns}
                anchor={"right"}
                onClose={() => setOpenReturns(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <Returns
                        isDrawerOpen={setOpenReturns}
                        onConfirm={handleCreateNewReturnNote}
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
    )
}

export default Dashboard;