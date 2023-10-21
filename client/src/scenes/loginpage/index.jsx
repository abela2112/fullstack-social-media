import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material"
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)')
    return (
        <Box>
            <Box
                padding={'.6rem 6%'}
                width={'100%'}
                textAlign={'center'}
                backgroundColor={alt}
            >
                <Typography fontSize={'clamp(1rem,2rem,2.25rem)'}
                    fontWeight={'bold'}
                    color={'primary'}

                    sx={
                        {
                            '&:hover': {
                                color: primaryLight,
                                cursor: 'pointer'
                            }
                        }
                    }
                >SocioMedia</Typography>
            </Box>
            <Box width={isNonMobileScreen ? '50%' : '93%'}
                p={'2rem'}
                m={'2rem auto'}
                borderRadius={'1.5rem'}
                backgroundColor={alt}>
                <Typography fontWeight={500}
                    variant="h5"
                    sx={{ mb: '1.5rem' }}

                >welcome to sociomedia</Typography>

                <Form />
            </Box>
        </Box>
    )
}
export default LoginPage