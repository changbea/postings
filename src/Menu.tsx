import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from './Message'
import Mode from './Mode'
import Avatar from '@mui/material/Avatar';
import { blue, blueGrey, deepPurple } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'

function Menu({ isLoggedIn, userObj, counter, setCounter, counting, setCounting }) {
    const [choose, setChoose] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => {
            return ({
                id: document.id,
                ...document.data(),
            })
        });
        setMessages(newArray)
    })
    }, [])
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === 'light'){
        document.body.className = ""
    } else {
        document.body.className = "dark-theme"
    }

    const onCounting = (msg) => {
        setCounter([
            ...counter,
            msg.id
        ])
        // setCounting(counter.length)
    }
    
  const onClick = () => {
    setChoose(true)
  }
  console.log(counter)
  return (
    <div className='d-flex justify-content-center flex-column pb-5'>
        <div className='d-flex justify-content-center btn-group btn-group-toggle'>
            <button className='btn btn-outline-primary active'>내 상태</button>
        </div>
        <div>
            <div className='d-flex'>
                {/* <div className='d-flex flex-column border border-primary rounded w-50'>
                    <div className='d-flex justify-content-center'>빌리기/빌려주기 상태</div>
                    <div className='d-flex justify-content-center flex-wrap'>
                        {messages.map((msg) => {
                            if(msg.text.clock.gmt < Date.now()) {
                                if(msg.creatorId === userObj.uid) {
                                    if(msg.round !== 5) {
                                        setCounting(counter.length)
                                        if (counter.indexOf(msg.id) === -1) {
                                            onCounting(msg)
                                        }
                                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter}/>)
                                    }
                                }
                            }
                        })}
                    </div>
                </div> */}
                <Card className='d-flex flex-column border border-primary rounded w-50'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            빌리기/빌려주기 상태
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {messages.map((msg) => {
                                if(msg.text.clock.gmt < Date.now()) {
                                    if(msg.creatorId === userObj.uid) {
                                        if(msg.round !== 5) {
                                            if (counter.indexOf(msg.id) === -1) {
                                                onCounting(msg)
                                            }
                                            setCounting(counter.length)
                                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} counting={counting} setCounting={setCounting} />)
                                        }
                                    }
                                }
                            })}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className='d-flex flex-column border border-primary rounded w-50'>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            요청/승낙 상태
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {messages.map((msg) => {
                                if(msg.text.clock.gmt < Date.now()) {
                                    if(msg.connectedId === userObj.uid) {
                                        if (msg.round !== 5) {
                                            setCounting(counter.length)
                                            if (counter.indexOf(msg.id) === -1) {
                                                onCounting(msg)
                                            }
                                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} counting={counting} setCounting={setCounting} />)
                                        }
                                    }
                                }
                            })}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
        {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
      <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>  
  )
}

export default Menu
