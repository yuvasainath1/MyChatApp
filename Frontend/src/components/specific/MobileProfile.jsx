import { Stack,
         IconButton,
         Badge,
         Tooltip,
         Avatar,
         Typography,
         Button
         } from '@mui/material'
import React from 'react'
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
  } from "@mui/icons-material";
import { resetNotificationCount } from "../../redux/reducers/chat";
import { useDispatch, useSelector } from "react-redux";
import {transformImage} from '../../lib/features'
import toast from "react-hot-toast";
import { server } from '../../constants/config';
import axios from "axios";
import { userNotExists } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
import {
    setIsMobile,
    setIsMobileProfile,
    setIsNewGroup,
    setIsNotification,
    setIsProfile,
    setIsSearch,
  } from "../../redux/reducers/misc";


const MobileProfile = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { notificationCount } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    const openSearch = () => dispatch(setIsSearch(true));
    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));
      };
    const navigateToGroup = () => navigate("/groups");
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
      };
      const logoutHandler = async () => {
        try {
          const { data } = await axios.get(`${server}/api/v1/user/logout`, {
            withCredentials: true,
          });
          dispatch(userNotExists());
          toast.success(data.message);
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };
    const showProfile = ()=>{
        dispatch(setIsProfile(true));
     }
  return (
    <Stack  
    width={"100%"} 
    overflow= {'auto'} 
    direction={"column"}  
    height={"100%"}  >
              <Typography variant='h5' marginBottom={2}>SwiftChat</Typography>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
              <IconBtn
                title={"Profile"}
                icon={<Avatar
                  src={transformImage(user?.avatar?.url)}
                />}
                onClick={showProfile}
              />
    </Stack>
  )
}


const IconBtn = ({ title, icon, onClick, value }) => {
    return (
    <Button onClick={onClick}
    sx={{ 
        color: '#ffffff', 
    }}
     >
      
        <IconButton color="inherit" size="small" >
          {value ? (
            <Badge badgeContent={value} color="error">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
        {title}
      
    </Button>
    );
  };

export default MobileProfile
