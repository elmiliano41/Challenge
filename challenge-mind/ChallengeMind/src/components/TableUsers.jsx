import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import useChallenge from "../hooks/useChallenge";
import "../Styles/TableUsers.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
});

function TableUsers() {
    const navigate = useNavigate();
    const { deleteUser, users, setUser, getUserData, getUsers, user } = useChallenge();
    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("600px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete);
        }
        setShowConfirmation(false);
        setUserToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setUserToDelete(null);
    };

    useEffect(() => {
        getUsers();
    }, []);


    const columns = [
        {
            label: "Name",
            name: "name",
            options: { filterOptions: { fullWidth: true } },
        },
        { label: "Email", name: "email" },
        { label: "Team", name: "teamId" },
        {
            label: "Edit",
            name: "userId",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <EditIcon style={{ cursor: 'pointer' }}
                            onClick={() => {
                                getUserData(value);
                            }}
                        />
                    );
                },
            },
        },
        {
            label: "Delete",
            name: "userId",
            options: {
                filter: true,
                customBodyRender: (user, tableMeta, updateValue) => {
                    return (
                        <DeleteIcon style={{ cursor: 'pointer' }}
                            onClick={async () => {
                                setShowConfirmation(true)
                                handleDeleteUser(user);
                            }}
                        />
                    );
                },
            },
        },
    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
            console.log(action);
        },
        selectableRows: 'none',
    };

    return (
        <><br />
            <br />

            <div className="users-form">
                <h1 className="users-title"></h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setUser('');
                        navigate('/dashboard/Users/EditAddUser');
                    }}
                    style={{ marginBottom: '10px' }}
                >
                    Add User
                </Button>
                {typeof users.length === 'undefined' ? (
                    <h1> No found users </h1>
                ) : (
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={'Users list'}
                                data={users}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>
                )}
            </div>
            {/* Confirmation dialog */}
            <Dialog
                open={showConfirmation}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete user?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default TableUsers;