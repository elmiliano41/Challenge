import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../Styles/ProfileStyles.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useChallenge from '../hooks/useChallenge';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth';
import { FormControlLabel } from '@mui/material';

const theme = createTheme();

export default function EditTeamComp() {
    const navigate = useNavigate();
    const { getTeam, team, submitTeam } = useChallenge();
    const { auth } = useAuth();
    const validationSchema = yup.object({
        name: yup.string().required('Team name is required'),
    });

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
        formik.setValues({
            teamId: team.teamId || 0,
            name: team.name || '',
            accountId: team.accountId || 1,
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
                            label="Account selected"
                            disabled
                            value={formik.values.accountId || ''}
                            style={{ marginBottom: theme.spacing(2) }} />
                        <Button type="submit" fullWidth variant="contained" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
                            Save Changes
                        </Button>
                    </form>
                </div>
            </Container>
        </ThemeProvider></>
    );
}
