import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Divider, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import toast, { Toaster } from 'react-hot-toast';
import Dropzone from "react-dropzone";
import FlexBetween from "components/flexBetween";
import { Edit } from "@mui/icons-material";
import { updateUser } from "state";
import { useDispatch } from "react-redux";
const validationSchema = yup.object({
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    email: yup.string().email("Invalid email").required("Email is required"),
    occupation: yup.string().required("Occupation is required"),
    location: yup.string().required("Location is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .notRequired(), // Allow empty strings (not required by default)

      // Allow empty strings (not required by default)
    confirmPassword:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    // Not required if password is empty
    picture: yup.string().notRequired(),
    twitterLink: yup.string().notRequired(),
    linkedInLink: yup.string().notRequired()
    
  });
  
const Form = ({user}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const { palette } = useTheme()
    const medium = palette.neutral.medium;
    
    
    const isNonMobile = useMediaQuery('(min-width:600px)')
    const updateProfile = async (values, onSubmitProps) => {
        setIsLoading(true)
        try {
            const data = new FormData()
            for (let value in values) {
                data.append(value, values[value])
            }
            data.append("picture", values?.picture?.name);
            const updateProfileResponse = await axios.patch(`/users/updateProfile/${user._id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setIsLoading(false)
             const isUpdated = await updateProfileResponse.data
            console.log("update profile", isUpdated)
            dispatch(updateUser(isUpdated))
            onSubmitProps.resetForm()
            if (isUpdated) {
                toast.success("Profile updated successfully")
                navigate(`/profile/${user?._id}`)
            }
        } catch (error) {
            toast.error(error?.response?.data?.error|| "An error occured")
            console.error(error)
            setIsLoading(false)
        }
    }

    
    const handleFormSubmit = async (values, onSubmitProps) =>{
        console.log("edit form",values)
        if ( values.password !== values.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
          await updateProfile(values, onSubmitProps);}
    if(!user) return null; 
    const { firstName,lastName,email,occupation,picture,location,linkedInLink,
        twitterLink}=user
    const intialValue = {
        firstName,
        lastName,
        email,
        password: '',
        occupation,
        confirmPassword: '',
        picture:picture||"",
        location:location||"",
        twitterLink:twitterLink|| '',
        linkedInLink: linkedInLink||''
       
    }
    return (
        <>
        <Typography variant={'h4'} fontWeight={'bold'} marginBottom={'1.5rem'}>Edit Profile</Typography>
        <Formik onSubmit={handleFormSubmit}
            initialValues={intialValue}
            validationSchema={validationSchema}>
            {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm, touched, errors }) => (
                <form onSubmit={handleSubmit}>
                    <Box display={'flex'}
                    flexDirection={'column'}
                    alignItems={'start'}
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
                                    disabled
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ width: '100%' }} />

                                <TextField
                                    label="Last Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ width: '100%'}} />

                                    <TextField
                                    label="Location"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ width: '100%'}} /> 

                            <TextField
                                    label="Ocupation"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ width: '100%' }} />
                                <Box width={'100%'}
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
                                                {!values.picture ? (<p>Add Picture Here</p>) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture?.name ||values.picture}</Typography>
                                                    <Edit />
                                                    </FlexBetween>)}
                                            </Box>
                                        )}
                                    </Dropzone> 
                                 </Box>
                            
                        <TextField
                            label="Email Address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ width: '100%' }} />
                           
                        {/* <Divider variant="middle"/> */}
                        <Typography color={medium} fontWeight={'500'}>Social Profile</Typography>
                        <TextField
                            label="Twitter Link"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.Twitter}
                            name="twitterLink"
                            error={Boolean(touched.twitterLink) && Boolean(errors.twitterLink)}
                            helperText={touched.twitterLink && errors.twitterLink}
                            sx={{ width: '100%' }} />

<TextField
                            label="LinkedIn Link"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.LinkedIn}
                            name="linkedInLink"
                            error={Boolean(touched.linkedInLink) && Boolean(errors.linkedInLink)}
                            helperText={touched.linkedInLink && errors.linkedInLink}
                            sx={{ width: '100%' }} />
                        <Typography color={medium} fontWeight={'500'} >Change Password</Typography>
                        <TextField
                            label="New Password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ width: '100%' }} />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            name="confirmPassword"
                            error={
                                Boolean(touched.confirmPassword) &&
                                Boolean(errors.confirmPassword)
                            }
                            helperText={
                                touched.confirmPassword && errors.confirmPassword
                            }
                            sx={{ width: '100%' }} />
                        {/* button */}
                            <Box width={ "100%"}
                            sx={{display: 'flex', flexDirection: 'column',alignItems: 'end', pr:"1rem" }}
                            >
                                <Button disabled={isLoading} fullWidth type="submit" variant="contained"
                                sx={{
                                    m: '.5rem 0', p: '1rem',
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt
                                }}
                                >{isLoading ? ('Loading...') : ('Update')}</Button>
                            
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