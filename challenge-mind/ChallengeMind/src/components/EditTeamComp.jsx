import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import '../Styles/ProfileStyles.css'
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import CheckIcon from '@mui/icons-material/Check';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import useChallenge from '../hooks/useChallenge';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth';

const theme = createTheme();

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
});


export default function EditTeamComp() {

    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({});

    const navigate = useNavigate();
    const { getTeam, team, submitTeam , getAccounts, accounts} = useChallenge();
    const { auth } = useAuth();
    const validationSchema = yup.object({
        name: yup.string().required('Team name is required'),
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAccountSelect = (selectedAccountId) => {
        formik.setFieldValue("accountId", selectedAccountId);
        handleClose();
    };

    const columns = [
        {
            label: "Name",
            name: "name",
            options: { filterOptions: { fullWidth: true } },
        },
        { label: "Manager", name: "userId" },
        {
            label: "Select",
            name: "accountId",
            options: {
                filter: true,
                customBodyRender: (account, tableMeta, updateValue) => {
                    return (
                        <CheckIcon style={{ cursor: 'pointer' }}
                            onClick={async () =>
                                handleAccountSelect(account)
                            }
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

    useEffect(() => {
        getAccounts();
    }, []);


    const formik = useFormik({
        initialValues: {
            teamId: '',
            name: '',
            accountId: '',
        },
        validationSchema,
        onSubmit: (values) => {
            submitTeam(values);
        },
    });

    useEffect(() => {
        if (formik.values.accountId) {
            const accountSelected = accounts.find((account) => account.accountId === formik.values.accountId);
            setSelectedAccount(accountSelected);
        } else {
            setSelectedAccount({});
        }
    }, [formik.values.accountId, accounts]);
    

    useEffect(() => {
        formik.setValues({
            teamId: team.teamId || 0,
            name: team.name || '',
            accountId: team.accountId || 1 || selectedAccount,
        });
    }, [team]);
    

    return (
        <><br /><br /><ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div
                    className='container'
                    style={{
                        marginTop: theme.spacing(8),
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Team
                    </Typography>
                    <form noValidate onSubmit={formik.handleSubmit} style={{ marginTop: theme.spacing(3) }}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            onChange={formik.handleChange}
                            value={formik.values.name || ''}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="accountId"
                            onChange={formik.handleChange}
                            disabled
                            value={selectedAccount ? selectedAccount.name: ''}
                            error={formik.touched.teamId && Boolean(formik.errors.teamId)}
                            helperText={formik.touched.teamId && formik.errors.teamId}
                            style={{ marginBottom: theme.spacing(2) }}/>
                        <Button
                            onClick={handleOpen}
                            fullWidth
                            variant="outlined"
                            style={{
                                marginTop: theme.spacing(2),
                                marginBottom: theme.spacing(1),
                            }}
                        >
                            Choose account
                        </Button>
                        <Button type="submit" fullWidth variant="contained" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
                            Save Changes
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '80%',
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography id="modal-title" variant="h6" component="h2">
                                    Select account
                                </Typography>
                                <div id="modal-description">
                                    <div className="users-form">
                                        <h1 className="accounts-title"></h1>
                                        {typeof accounts.length === 'undefined' ? (
                                            <h1> No found accounts </h1>
                                        ) : (
                                            <CacheProvider value={muiCache}>
                                                <ThemeProvider theme={createTheme()}>
                                                    <MUIDataTable
                                                        title={'Teams list'}
                                                        data={accounts}
                                                        columns={columns}
                                                        options={options}
                                                    />
                                                </ThemeProvider>
                                            </CacheProvider>
                                        )}
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </form>
                </div>
            </Container>
        </ThemeProvider></>
    );
}
