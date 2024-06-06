import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from './Message'
import Mode from './Mode'
import Avatar from '@mui/material/Avatar';
import { blue, blueGrey, deepPurple } from '@mui/material/colors';

function Avatars({ altName }) {
    
  return (
    <div>
        {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
        <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
        <Avatar sx={{ bgcolor: blue[500] }} alt={altName} src="/static/images/avatar/3.jpg" />
    </div>  
  )
}

export default Avatars
