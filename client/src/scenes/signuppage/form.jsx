import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import toast, { Toaster } from 'react-hot-toast';
const registerSchema = yup.object({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('invalid email').required('required'),
    // location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    // picture: yup.string().required('required'),
    password: yup.string().required('required')
})

const intialValueRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    occupation: '',
   
}


const Form = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { palette } = useTheme()

    const isNonMobile = useMediaQuery('(min-width:600px)')
    const register = async (values, onSubmitProps) => {
        console.log(values)
        setIsLoading(true)
        try {
            // const data = new FormData()
            // for (let value in values) {
            //     data.append(value, values[value])
            // }
            // data.append("picture", values.picture.name);
            const registerResponse = await axios.post('auth/register', values, {
                headers: { 'Content-Type': 'application/json' }
            })
            setIsLoading(false)
            const isRegistered = await registerResponse.data
            onSubmitProps.resetForm()
            if (isRegistered) {
                navigate('/')
            }
        } catch (error) {
            toast.error(error?.response?.data?.error|| "An error occured")
            console.error(error)
            setIsLoading(false)
        }
    }

    
    const handleFormSubmit = async (values, onSubmitProps) =>(
          await register(values, onSubmitProps));
    return (
        <>
        <Formik onSubmit={handleFormSubmit}
            initialValues={intialValueRegister}
            validationSchema={registerSchema}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                    <Box display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                        gap={'30px'}
                        // gridTemplateColumns={'repeat(4, minmax(0,1fr))'}
                        sx={{
                        //     '& >div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                         }}>
                        
                            
                                <TextField
                                    label="First Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ width: '100%' }} />

                                <TextField
                                    label="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ width: '100%'}} />

                                {/* <TextField
                                    label="Location"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: 'span 4' }} /> */}

                                <TextField
                                    label="Ocupation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ width: '100%' }} />
                                {/* <Box gridColumn={'span 4'}
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius={'5px'}
                                    padding={'1rem'}
                                >
                                    {/* <Dropzone acceptedFiles=".jpg,.jpeg,.png"
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
                                    </Dropzone> */}
                                {/* </Box> */}
                            
                       

                        <TextField
                            label="Email Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ width: '100%' }} />
                        <TextField

                            label="Password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ width: '100%' }} />
                        {/* button */}
                            <Box width={isNonMobile ? '440px' : "100%"}
                            sx={{display: 'flex', flexDirection: 'column',alignItems: 'center' }}
                            >
                            <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
                                Already have an account
                                <Link to="/" style={{ textDecoration: 'none', marginLeft: '5px' }}>
                              <Typography sx={{
                                  textDecoration: 'underline', fontSize: '1rem', color: palette.primary.main,
                                  transition: 'color .3s ease-in-out',
                                  '&:hover': {
                                      color: palette.primary.light,
                                      cursor: 'pointer'
                                  }

                              }}>Login here</Typography>
                            </Link>
                                </Typography>
                            
                                <Button disabled={isLoading} fullWidth type="submit" variant="contained"
                                sx={{
                                    m: '2rem 0', p: '1rem',
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt
                                }}
                                >{isLoading ? ('Loading...') : ('Register')}</Button>
                            
                        </Box>


                    </Box>

                </form>)}
        </Formik>
            <Toaster containerStyle={{
                position: 'fixed',
            }} />
        </>
    )
}

export default Form;