import * as yup from "yup";

import { Formik } from "formik";
import axios from "axios";
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

import { setLogin, setSocketClient } from "state";
import toast, { Toaster } from 'react-hot-toast';
import { socket } from "socketio";

const loginSchema = yup.object({
    email: yup.string().email('invalid email').required('required'),
    password: yup.string().required('required'),
});


const intialValueLogin = {
    email: '',
    password: '',
}

const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const login = async (values, onSubmitProps) => {
        setIsLoading(true)
        try {
            const loginResponse = await axios.post('auth/login', {
                email: values.email,
                password: values.password

            })
            setIsLoading(false)
            const isLoggedIn = await loginResponse.data
            window.localStorage.setItem('userId', isLoggedIn.user._id)

            onSubmitProps.resetForm()

            if (isLoggedIn) {
                dispatch(setLogin({
                    user: isLoggedIn.user,
                    token: isLoggedIn.token,
                }))

                navigate('/home')

            }

        } catch (error) {
            console.error(error)
            setIsLoading(false)
            toast.error(error?.response?.data?.error || "Something went wrong!")
        }

    }
    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);

    };
    return (
        <>
        <Formik onSubmit={handleFormSubmit}
                initialValues={intialValueLogin}
                validationSchema={loginSchema}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                        <Box display={'flex'}
                            flexDirection={'column'}
                            width={isNonMobile ? '440px' : "100%"} margin={'auto'}
                            alignContent={'center'}
                        gap={'30px'}
                        gridTemplateColumns={'repeat(4, minmax(0,1fr))'}
                        sx={{
                            '& >div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                        }}>
                            {/* {isRegister && (
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
                        )} */}

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
                            <Box width={isNonMobile ? '440px' : "100%"}
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
                                    Don&apos;t have an account
                                    <Link to="/register" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                                        <Typography sx={{
                                            textDecoration: 'underline', fontSize: '1rem', color: palette.primary.main,
                                            transition: 'color .3s ease-in-out',
                                            '&:hover': {
                                                color: palette.primary.light,
                                                cursor: 'pointer'
                                            }

                                        }}>Register here</Typography>
                                    </Link>
                                </Typography>

                                <Button disabled={isLoading} fullWidth type="submit" variant="contained"
                                sx={{
                                    m: '2rem 0', p: '1rem',
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt
                                }}
                                >{isLoading ? ('Loading...') : ('Login')}</Button>

                        </Box>


                    </Box>

                </form>)}
        </Formik>
            <Toaster containerStyle={{
                position: 'relative',
            }} />
        </>
    )
}

export default Form;