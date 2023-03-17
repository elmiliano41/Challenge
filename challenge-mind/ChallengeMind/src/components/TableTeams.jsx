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

function TableTeams() {
    const navigate = useNavigate();
    const { deleteTeam, teams, setTeam,getTeam, getTeams } = useChallenge();
    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    const handleDeleteTeam = (team) => {
        setTeamToDelete(team);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        if (teamToDelete) {
            deleteTeam(teamToDelete);
        }
        setShowConfirmation(false);
        setTeamToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setTeamToDelete(null);
    };

    useEffect(() => {
        getTeams();
    }, []);

    const columns = [
        {
            label: "Name",
            name: "name",
            options: { filterOptions: { fullWidth: true } },
        },
        { label: "Account Assigned", name: "accountId" },
        {
            label: "Edit",
            name: "teamId",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <EditIcon style={{ cursor: 'pointer' }}
                            onClick={() => {
                                getTeam(value);
                            }}
                        />
                    );
                },
            },
        },
        {
            label: "Delete",
            name: "teamId",
            options: {
                filter: true,
                customBodyRender: (team, tableMeta, updateValue) => {
                    return (
                        <DeleteIcon style={{ cursor: 'pointer' }}
                            onClick={async () => {
                                setShowConfirmation(true)
                                handleDeleteTeam(team);
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
                <h1 className="teams-title"></h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTeam('');
                        navigate('/dashboard/Teams/EditAddTeams');
                    }}
                    style={{ marginBottom: '10px' }}
                >
                    Add Team
                </Button>
                {typeof teams.length === 'undefined' ? (
                    <h1> No found teams </h1>
                ) : (
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                                title={'Teams list'}
                                data={teams}
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
                    {"Delete team?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this team?
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

export default TableTeams;