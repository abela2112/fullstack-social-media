import * as yup from "yup";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import axios from "axios";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import FlexBetween from "components/flexBetween";
import { Edit } from "@mui/icons-material";
import { setLogin } from "state";

const registerSchema = yup.object({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.string().required('required'),
    password: yup.string().required('required')
})
const loginSchema = yup.object({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
});

const intialValueRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: '',
}
const intialValueLogin = {
    email: '',
    password: '',
}

const Form = () => {
    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()
    const isLogin = pageType === 'login';
    const isRegister = pageType === 'register'
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const register = async (values, onSubmitProps) => {
        try {
            const data = new FormData()
            for (let value in values) {
                data.append(value, values[value])
            }
            data.append("picture", values.picture.name);
            const registerResponse = await axios.post('auth/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const isRegistered = await registerResponse.data
            onSubmitProps.resetForm()
            if (isRegistered) {
                setPageType('login')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const login = async (values, onSubmitProps) => {
        try {
            const loginResponse = await axios.post('auth/login', {
                email: values.email,
                password: values.password

            })

            const isLoggedIn = await loginResponse.data
            onSubmitProps.resetForm()
            console.log(loginResponse.data);
            if (isLoggedIn) {
                dispatch(setLogin({
                    user: isLoggedIn.user,
                    token: isLoggedIn.token,
                }))

                navigate('/home')

            }
        } catch (error) {
            console.error(error)
        }

    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);

    };
    return (
        <Formik onSubmit={handleFormSubmit}
            initialValues={isLogin ? intialValueLogin : intialValueRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                    <Box display={'grid'}
                        gap={'30px'}
                        gridTemplateColumns={'repeat(4, minmax(0,1fr))'}
                        sx={{
                            '& >div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                        }}>
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: 'span 2' }} />

                                <TextField
                                    label="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: 'span 2' }} />

                                <TextField
                                    label="Location"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: 'span 4' }} />

                                <TextField
                                    label="Ocupation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: 'span 4' }} />
                                <Box gridColumn={'span 4'}
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius={'5px'}
                                    padding={'1rem'}
                                >
                                    <Dropzone acceptedFiles=".jpg,.jpeg,.png"
                                        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}>
                                        {({ getRootProps, getInputProps }) => (
                                            <Box border={`1px dashed ${palette.primary.main}`}
                                                padding={'1rem'}
                                                {...getRootProps()}
                                                sx={{ '&:hover': { cursor: 'pointer' } }}>
                                                <input {...getInputProps()} />
                                                {!values.picture ? (<p>Add Picture Here</p>) : (<FlexBetween><Typography>{values.picture.name}</Typography>
                                                    <Edit /></FlexBetween>)}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: 'span 4' }} />
                        <TextField

                            label="Password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: 'span 4' }} />
                        {/* button */}
                        <Box width={'500px'}>
                            <Button fullWidth type="submit" variant="contained"
                                sx={{
                                    m: '2rem 0', p: '1rem',
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt
                                }}
                            >{isLogin ? 'Log in' : 'Register'}</Button>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? 'register' : 'login')
                                    resetForm()
                                }}
                                sx={{
                                    textDecoration: 'underline', fontSize: '1rem', color: palette.primary.main,
                                    '&:hover': {
                                        color: palette.primary.light,
                                        cursor: 'pointer'
                                    }

                                }}
                            >{isLogin ? "Don't have an accout register here" : "login here"}</Typography>
                        </Box>


                    </Box>
                </form>)}
        </Formik>
    )
}

export default Form;