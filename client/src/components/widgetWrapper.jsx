import styled from "@emotion/styled"

import { Box } from "@mui/material"

const WidgetWrapper = styled(Box)(({ theme }) => (
    {
        padding: "1.5rem 1.5rem 0.75rem 1.5rem",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.75rem",
        margin: "0.5rem 0.5rem 0.5rem 0.5rem"
    }
))
export default WidgetWrapper;