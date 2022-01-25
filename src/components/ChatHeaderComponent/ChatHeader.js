import React from 'react';
import "./ChatHeader.css";
import SearchIcon from '@mui/icons-material/Search';

function ChatHeader({ channelId, channelName }) {
  return(
    <div className='chatHeader'>
        <div className="chatHeader_title">
            <h3>Channel: {channelName}</h3>
        </div>
        <div className="chatHeader_search">
            <input placeholder='Search' />
            <SearchIcon />
        </div>
    </div>
  );
}

export default ChatHeader;
