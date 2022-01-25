import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from '../SidebarChannelComponent/SidebarChannel';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import db, { auth } from '../../serviceProvider/firebase';
import { signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

function Sidebar() {
    const user = useSelector(selectUser);
    const logOut = () =>{
        signOut(auth);
    };

    const addChannel = () =>{
        const channelName = prompt("Enter a new channel name");
        if(channelName){
            addDoc(collection(db, "channels"), {
                channelName: channelName
            })
        }
    }

    const channelsDB = collection(db, 'channels');
    const [channels, setChannels] = useState([]);

    useEffect(() =>{
        onSnapshot(channelsDB, (snapshot) =>
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data(),
                }))
            )
        );
    }, [channelsDB]);

  return(
    <div className="sidebar">
        <div className='sidebar_top'>
            <h3>Ezoic Chat</h3>
            <ExpandMoreIcon />
        </div>
        <div className="sidebar_channels">
            <div className="sidebar_channelsHeader">
                <div className="sidebar_header">
                    <h4>Channels</h4>
                </div>
                <AddIcon onClick={addChannel} className="sidebar_addChannel" />
            </div>
            <div className="sidebar_channelsList">
                {channels.map(({ id, channel }) => (
                    <SidebarChannel
                        key={id}
                        id={id}
                        channelName={channel.channelName}
                    />
                ))}
            </div>
        </div>
        <div className="sidebar_profile">
            <Avatar src={user.photo}/>
            <div className="sidebar_profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0,5)}</p>
            </div>
            <div className="sidebar_logout">
                <LogoutIcon onClick={logOut} />
            </div>
        </div>
    </div>
  );
}

export default Sidebar;
