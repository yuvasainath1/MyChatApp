import React from "react";
import { Avatar, Dialog, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { useDispatch, useSelector } from "react-redux";
import {setIsProfile} from '../../redux/reducers/misc'

const Profile = ({ user }) => {
  const dispatch=useDispatch();
  const { isProfile } = useSelector((state) => state.misc);
  const handleClose=()=>{
      dispatch(setIsProfile(false));
  }
  return ( 
    <Dialog onClose={handleClose}   open={isProfile} >
      <Stack 
      style={{background:"rgba(0,0,0,0.5)"}}  
      spacing={"2rem"} 
      padding={"2rem"} 
      direction={"column"} 
      alignItems={"center"}
      sx={{
        width: {
          xs: '15rem',  
          sm: '30rem',  
          md: '30rem',  
        }
      }}
      >
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: {
            xs:100,
            md:150,
            sm:150,
          },
          height:  {
            xs:100,
            md:150,
            sm:150,
          },
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard
        heading={"Username"}
        text={user?.username}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment(user?.createdAt).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
     
   
    </Dialog>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"black"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
