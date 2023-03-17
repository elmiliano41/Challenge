import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

function TableAccounts() {
    const navigate = useNavigate();
    const { deleteAccount,setAccount, accounts, getAccount, getAccounts } = useChallenge();
    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);

    const handleDeleteAccount = (account) => {
        setAccountToDelete(account);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (accountToDelete) {
            deleteAccount(accountToDelete);
        }
        setShowConfirmation(false);
        setAccountToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setAccountToDelete(null);
    };

    useEffect(() => {
        getAccounts();
    }, []);

    const columns = [
        {
            label: "Name",
            name: "name",
            options: { filterOptions: { fullWidth: true } },
        },
        { label: "Manager", name: "operationsManager" },
        { label: "Client", name: "clientName" },
        {
            label: "Edit",
            name: "accountId",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <EditIcon style={{ cursor: 'pointer' }}
                            onClick={() => {
                                getAccount(value);
                            }}
                        />
                    );
                },
            },
        },        
        {
            label: "Delete",
            name: "accountId",
            options: {
                filter: true,
                customBodyRender: (account, tableMeta, updateValue) => {
                    return (
                        <DeleteIcon style={{ cursor: 'pointer' }}
                            onClick={async () => {
                                setShowConfirmation(true)
                                handleDeleteAccount(account);
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
                <h1 className="accounts-title"></h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setAccount('');
                        navigate('/dashboard/Accounts/EditAddAccounts');
                    }}
                    style={{ marginBottom: '10px' }}
                >
                    Add Account
                </Button>
                {typeof accounts.length === 'undefined' ? (
                    <h1> No found accounts </h1>
                ) : (
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={'Accounts list'}
                                data={accounts}
                                columns={columns}
                                options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>
                )}
            </div>
            <Dialog
                open={showConfirmation}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this account?
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

export default TableAccounts;