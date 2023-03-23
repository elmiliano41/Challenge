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
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth';

const theme = createTheme();

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
});


export default function EditAccountComp() {

    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { account, submitAccount, getUsers, users } = useChallenge();

    const validationSchema = yup.object({
        name: yup.string().required('Account name is required'),
        clientName: yup.string().required('Client name  is required'),
        userId: yup.string().required('Choose an manager'),
    });    

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUserSelect = (selectedUserId) => {
        formik.setFieldValue("userId", selectedUserId);
        formik.setFieldValue("operationsManager", selectedUserId);
        handleClose();
    };
    

    const columns = [
        {
            label: "Name",
            name: "name",
            options: { filterOptions: { fullWidth: true } },
        },
        {
            label: "Select",
            name: "userId",
            options: {
                filter: true,
                customBodyRender: (user, tableMeta, updateValue) => {
                    return (
                        <CheckIcon style={{ cursor: 'pointer' }}
                            onClick={async () =>
                                handleUserSelect(user)
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
        getUsers();
    }, []);


    const formik = useFormik({
        initialValues: {
            accountId: '',
            name: '',
            clientName:'',
            operationsManager: '',
        },
        validationSchema,
        onSubmit: (values) => {
            submitAccount(values);
        },
    });

    useEffect(() => {
        if (formik.values.userId) {
            const userSelected = users.find((user) => user.userId === formik.values.userId);
            setSelectedUser(userSelected);
            console.log(selectedUser,userSelected)
        } else {
            setSelectedUser({});
        }
    }, [formik.values.userId, users]);

    
    useEffect(() => {
        formik.setValues({
            accountId: account.accountId || 0,
            name: account.name || '',
            clientName: account.clientName || '',
            operationsManager: account.operationsManager || selectedUser,
        });
    }, [account, selectedUser]);    
    
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
                        Account
                    </Typography>
                    <form noValidate onSubmit={formik.handleSubmit} style={{ marginTop: theme.spacing(3) }}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            data-testid="name"
                            onChange={formik.handleChange}
                            value={formik.values.name || ''}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="clientName"
                            data-testid="clientName"
                            label="Client Name"
                            onChange={formik.handleChange}
                            value={formik.values.clientName}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="operationsManager"
                            data-testid="operationsManager"
                            onChange={formik.handleChange}
                            disabled
                            value={selectedUser ? selectedUser.name : ''}
                            error={formik.touched.userId && Boolean(formik.errors.userId)}
                            helperText={formik.touched.userId && formik.errors.userId}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <Button
                            onClick={handleOpen}
                            fullWidth
                            variant="outlined"
                            style={{
                                marginTop: theme.spacing(2),
                                marginBottom: theme.spacing(1),
                            }}
                        >
                            Choose user
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
                                    Select user
                                </Typography>
                                <div id="modal-description">
                                    <div className="users-form">
                                        <h1 className="users-title"></h1>
                                        {typeof users.length === 'undefined' ? (
                                            <h1> No found users </h1>
                                        ) : (
                                            <CacheProvider value={muiCache}>
                                                <ThemeProvider theme={createTheme()}>
                                                    <MUIDataTable
                                                        title={'Accounts list'}
                                                        data={users}
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
