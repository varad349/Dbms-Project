import {Box, Button, Drawer, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography} from "@mui/material";
import colorConfigs from "../configs/colorConfigs";
import Footer from "../components/Footer";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import CreateEditViewMember, {Member, MemberMode} from "../components/CreateEditViewMember";
import DialogBox, {DialogBoxMode} from "../components/DialogBox";
import Toast, {ToastData} from "../components/Toast";
import {getMembersByQuery} from "../api/member/getMembersByQuery";
import {createNewMember} from "../api/member/createNewMember";
import {editExistingMember} from "../api/member/editExistingMember";
import {deleteExistingMember} from "../api/member/deleteExistingMember";

const ManageMembers = () => {
    const [rows, setRows] = useState<Member[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedMember, setSelectedMember] = useState<Member>({id: null, name: "", address: "", contact: ""});
    const [openNewMember, setOpenNewMember] = useState<boolean>(false);
    const [openEditMember, setOpenEditMember] = useState<boolean>(false);
    const [openViewMember, setOpenViewMember] = useState<boolean>(false);
    const [openDeleteMemberBox, setOpenDeleteMemberBox] = useState<boolean>(false);
    const [toastConfig, setToastConfig] = useState<ToastData>({ open: false, message: "", type: "success" });

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'UUID',
            type: 'string',
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
            field: 'name',
            headerName: 'Name',
            type: 'string',
            minWidth: 120,
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
            field: 'address',
            headerName: 'Address',
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
            field: 'contact',
            headerName: 'Contact',
            type: 'string',
            minWidth: 110,
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
                        <Tooltip title={"view member"}>
                            <IconButton
                                onClick={() => {
                                    setSelectedMember((prevState: Member) => {return {...prevState,
                                        "id": params.row.id,
                                        "name": params.row.name,
                                        "address": params.row.address,
                                        "contact": params.row.contact
                                    }});
                                    setOpenViewMember(true);
                                }}
                            >
                                <VisibilityIcon
                                    color={"inherit"}
                                    sx={{color: "white"}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"edit member"}>
                            <IconButton
                            onClick={() => {
                                setSelectedMember((prevState: Member) => {return {...prevState,
                                    "id": params.row.id,
                                    "name": params.row.name,
                                    "address": params.row.address,
                                    "contact": params.row.contact
                                }});
                                setOpenEditMember(true);
                            }}
                            >
                                <EditIcon
                                    color={"inherit"}
                                    sx={{color: "white"}}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"delete member"}>
                            <IconButton
                                onClick={() => {
                                    setSelectedMember((prevState: Member) => {return {...prevState,
                                        "id": params.row.id,
                                        "name": params.row.name,
                                        "address": params.row.address,
                                        "contact": params.row.contact
                                    }});
                                    setOpenDeleteMemberBox(true);
                                }}
                            >
                                <DeleteIcon
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

    const handleToastOnclose = (state: boolean) => {setToastConfig((prevState: ToastData) => { return { ...prevState, "open": state } })};

    const handleGetMembersByQuery = async (query: string) => {
        try {
            const response = await getMembersByQuery(query);
            setRows(response.data);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to load member details", type: "error"});
            }
        }
    }

    const handleCreate = async (member: Member) => {
        try {
            await createNewMember(member);
            setOpenNewMember(false);
            setToastConfig({open: true, message: "Member details created successfully", type: "success"});
            await handleGetMembersByQuery(searchQuery);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to create member details", type: "error"});
            }
        }
    }

    const handleUpdate = async (member: Member) => {
        try {
            // @ts-ignore
            await editExistingMember(member.id, member);
            setOpenEditMember(false);
            setToastConfig({open: true, message: "Edited member details updated successfully", type: "success"});
            await handleGetMembersByQuery(searchQuery);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to edit existing member details", type: "error"});
            }
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteExistingMember(id);
            setToastConfig({open: true, message: "Member deleted successfully", type: "success"});
            setOpenDeleteMemberBox(false);
            await handleGetMembersByQuery(searchQuery);
        } catch (err: any) {
            if (err instanceof Error) {
                setToastConfig({open: true, message: err.message, type: "error"});
            } else {
                setToastConfig({open: true, message: "Fail to delete member", type: "error"});
            }
        }
    }

    useEffect(() => {
        handleGetMembersByQuery(searchQuery).then(r => {});
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
                            <PeopleAltOutlinedIcon
                                sx={{color: "white"}}
                            />
                            <Typography
                                color={"white"}
                                pl={1}
                                fontWeight={"bold"}
                                variant={"h5"}
                            >
                                Manage Members
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
                                    label="Search members"
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
                                        setSelectedMember({
                                            id: null,
                                            name: "",
                                            address: "",
                                            contact: ""
                                        });
                                        setOpenNewMember(true);
                                    }}
                                >
                                    Add Member
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
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    page: 0,
                                                    pageSize: 5,
                                                },
                                            },
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
                open={openNewMember}
                anchor={"right"}
                onClose={() => setOpenNewMember(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <CreateEditViewMember
                        member={selectedMember}
                        mode={MemberMode.CREATE}
                        action={{
                            setIsDrawerOpen: setOpenNewMember,
                            onConfirm: handleCreate
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openViewMember}
                anchor={"right"}
                onClose={() => setOpenViewMember(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <CreateEditViewMember
                        member={selectedMember}
                        mode={MemberMode.VIEW}
                        action={{
                            setIsDrawerOpen: setOpenViewMember,
                            onConfirm: () => {}
                        }}
                    />
                </Box>
            </Drawer>
            <Drawer
                open={openEditMember}
                anchor={"right"}
                onClose={() => setOpenEditMember(false)}
            >
                <Box
                    maxWidth={"400px"}
                    role={"presentation"}
                    height={"100vh"}
                    bgcolor={colorConfigs.mainBg}
                >
                    <CreateEditViewMember
                        member={selectedMember}
                        mode={MemberMode.EDIT}
                        action={{
                            setIsDrawerOpen: setOpenEditMember,
                            onConfirm: handleUpdate
                        }}
                    />
                </Box>
            </Drawer>
            <DialogBox
                mode={DialogBoxMode.DELETE_MEMBER}
                data={{
                    open: openDeleteMemberBox,
                    dialogTitle: "Delete Member",
                    dialogContext: "Member UUID :",
                    txtId: "member-uuid",
                    txtLabel: "UUID",
                    txtType: "text",
                    errorMessages: ["Member UUID is required", "Enter valid member UUID"],
                    id: selectedMember.id,
                    actionBtnName: "Delete"
                }}
                action={{
                    onClose: setOpenDeleteMemberBox,
                    onConfirm: handleDelete
                }}
            />
            <Toast
                data={toastConfig}
                action={{
                    onClose: handleToastOnclose
                }}
            />
        </>
    );
}

export default ManageMembers;