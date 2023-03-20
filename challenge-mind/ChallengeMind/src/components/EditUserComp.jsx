import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../Styles/ProfileStyles.css';
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
import { FormControlLabel } from '@mui/material';


const muiCache = createCache({
    key: "mui-datatables",
    prepend: true,
});

const theme = createTheme();

export default function EditUserComp() {
    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState({});

    const navigate = useNavigate();
    const { getUser, user, submitUser,getTeams, teams } = useChallenge();
    const { auth } = useAuth();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleTeamSelect = (selectedTeamId) => {
        formik.setFieldValue("teamId", selectedTeamId);
        handleClose();
    };

    const columns = [
        {
            label: "Name",
            name: "name",
            options: { filterOptions: { fullWidth: true } },
        },
        { label: "Account Assigned", name: "accountId" },
        {
            label: "Select",
            name: "teamId",
            options: {
                filter: true,
                customBodyRender: (team, tableMeta, updateValue) => {
                    return (
                        <CheckIcon style={{ cursor: 'pointer' }}
                            onClick={async () =>
                                handleTeamSelect(team)
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
        getTeams();
    }, []);

    const validationSchema = yup.object({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        englishLevelId: yup.string().required('English Level is required'),
        technicalKnowledge: yup.string().required('Technical Knowledge is required'),
        cv: yup.string().url('Invalid URL'),
        teamId: yup.string().required('Team is required'),
    });
    
    const formik = useFormik({
        initialValues: {
            userId: '',
            name: '',
            email: '',
            password: '',
            englishLevelId: '',
            technicalKnowledge: '',
            cv: '',
            isSU:false,
            isAdmin: false,
            teamId: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form values: ', values); 
            submitUser(values);
        },
    });

    useEffect(() => {
        if (formik.values.teamId) {
            const teamSelected = teams.find((team) => team.teamId === formik.values.teamId);
            setSelectedTeam(teamSelected);
        } else {
            setSelectedTeam({});
        }
    }, [formik.values.teamId, teams]);

    useEffect(() => {
        formik.setValues({
            userId: user.userId || 0,
            name: user.name || '',
            email: user.email || '',
            password: user.password || '',
            englishLevelId: user.englishLevelId || '',
            technicalKnowledge: user.technicalKnowledge || '',
            isSU: user.isSU||false,
            cv: user.cv || '',
            isAdmin: user.isAdmin || false,
            teamId: user.teamId || 1 || selectedTeam,
        });
    }, [user]);

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
                        User Profile
                    </Typography>
                    <form noValidate onSubmit={formik.handleSubmit} style={{ marginTop: theme.spacing(3) }}>
                        <TextField
                            fullWidth
                            id="name"
                            label="Name"
                            onChange={formik.handleChange}
                            value={formik.values.name || ''}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="email"
                            onChange={formik.handleChange}
                            label="Email Address"
                            value={formik.values.email || ''}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <FormControl fullWidth variant="outlined" style={{ marginBottom: theme.spacing(2) }}>
                            <InputLabel id="englishLevel-label">English Level</InputLabel>
                            <Select
                                labelId="englishLevel-label"
                                id="englishLevelId"
                                name="englishLevelId"
                                value={formik.values.englishLevelId}
                                onChange={formik.handleChange}
                                error={formik.touched.englishLevelId && Boolean(formik.errors.englishLevelId)}
                                label="English Level"
                            >
                                <MenuItem value={1}>A1</MenuItem>
                                <MenuItem value={2}>A2</MenuItem>
                                <MenuItem value={3}>B1</MenuItem>
                                <MenuItem value={4}>B2</MenuItem>
                                <MenuItem value={5}>C1</MenuItem>
                                <MenuItem value={6}>C2</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            id="technicalKnowledge"
                            label="Technical Knowledge"
                            name="technicalKnowledge"
                            multiline
                            rows={4}
                            value={formik.values.technicalKnowledge}
                            onChange={formik.handleChange}
                            error={formik.touched.technicalKnowledge && Boolean(formik.errors.technicalKnowledge)}
                            helperText={formik.touched.technicalKnowledge && formik.errors.technicalKnowledge}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="cv"
                            label="CV Link (Google Doc)"
                            name="cv"
                            value={formik.values.cv}
                            onChange={formik.handleChange}
                            error={formik.touched.cv && Boolean(formik.errors.cv)}
                            helperText={formik.touched.cv && formik.errors.cv}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            style={{ marginBottom: theme.spacing(2) }}
                        />
                        <TextField
                            fullWidth
                            id="teamId"
                            name="teamId"
                            disabled
                            value={selectedTeam ? selectedTeam.name : ''}
                            onChange={formik.handleChange}
                            error={formik.touched.teamId && Boolean(formik.errors.teamId)}
                            helperText={formik.touched.teamId && formik.errors.teamId}
                            style={{ marginBottom: theme.spacing(2) }}
                        />
                        {auth.isSU == true ? (
                            <FormControl fullWidth style={{ marginBottom: theme.spacing(2), textAlign: 'center' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formik.values.isAdmin}
                                            onChange={formik.handleChange}
                                            name="isAdmin"
                                            color="primary"
                                        />
                                    }
                                    label="Is Admin"
                                />
                            </FormControl>
                        ) : <div></div>}
                        <Button
                            onClick={handleOpen}
                            fullWidth
                            variant="outlined"
                            style={{
                                marginTop: theme.spacing(2),
                                marginBottom: theme.spacing(1),
                            }}
                        >
                            Choose team
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
                                    Select a team
                                </Typography>
                                <div id="modal-description">
                                    <div className="users-form">
                                        <h1 className="teams-title"></h1>
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
                                </div>
                            </Box>
                        </Modal>
                    </form>
                </div>
            </Container>
        </ThemeProvider></>
    );
}