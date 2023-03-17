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

export default function EditUserComp() {
    const navigate = useNavigate();
    const { getUser, user, submitUser } = useChallenge();
    const { auth } = useAuth();
    const validationSchema = yup.object({
        cv: yup.string().url('Invalid URL'),
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
            isAdmin: false,
            teamId: '',
        },
        validationSchema,
        onSubmit: (values) => {
            submitUser(values);
        },
    });

    useEffect(() => {
        formik.setValues({
            userId: user.userId || 0,
            name: user.name || '',
            email: user.email || '',
            password: user.password || '',
            englishLevelId: user.englishLevelId || '',
            technicalKnowledge: user.technicalKnowledge || '',
            cv: user.cv || '',
            isAdmin: user.isAdmin || false,
            teamId: user.teamId || 1,
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
                            style={{ marginBottom: theme.spacing(2) }} />
                        <TextField
                            fullWidth
                            id="email"
                            onChange={formik.handleChange}
                            label="Email Address"
                            value={formik.values.email || ''}
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
                            {formik.touched.englishLevelId && formik.errors.englishLevelId ? (
                                <FormHelperText error>{formik.errors.englishLevelId}</FormHelperText>
                            ) : null}
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
                        ) : (() => { })}
                        <Button fullWidth variant="contained" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
                            Choose Team
                        </Button>
                        <Button type="submit" fullWidth variant="contained" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
                            Save Changes
                        </Button>
                    </form>
                </div>
            </Container>
        </ThemeProvider></>
    );
}
