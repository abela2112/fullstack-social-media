import { Box, Typography } from "@mui/material"

const UserImage = ({ image, size = "60px" }) => {
    return (<Box width={size} height={size}>

        <img
            style={{ objectFit: "cover", borderRadius: "50%" }}
            height={size}
            width={size}
            alt="user"
            src={`http://localhost:4000/assets/${image}`}

        />

    </Box>)
}
export default UserImage;