import {Box, Grid, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import colorConfigs from "../configs/colorConfigs";
import SwipeUpOutlinedIcon from '@mui/icons-material/SwipeUpOutlined';
import Footer from "../components/Footer";

const HandleReturns = () => {
    return (
        <>
            <Box
                position={"fixed"}
                top={12}
                right={5}
            >
                <Link to={"/"}>
                    <IconButton>
                        <CancelIcon
                            sx={{color: "darkred"}}
                        />
                    </IconButton>
                </Link>
            </Box>
            <Box
                bgcolor={colorConfigs.mainBg}
                minHeight={"100vh"}
            >
                <Grid container pt={2}>
                    <Grid
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        item
                        xs={12}>
                        <SwipeUpOutlinedIcon
                            sx={{color: "white"}}
                        />
                        <Typography
                            color={"white"}
                            fontWeight={"bold"}
                            pl={1}
                            variant={"h5"}
                        >
                            Handle Returns
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Footer/>
        </>

    )
}

export default HandleReturns;