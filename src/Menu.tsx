import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from './Message'
import Mode from './Mode'
import Avatar from '@mui/material/Avatar';
import { blue, blueGrey, deepPurple } from '@mui/material/colors';

function Menu({ isLoggedIn, userObj, counter, setCounter }) {
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
    }
    // messages.map((msg) => {
    //     if(msg.creatorId === userObj.uid) {
    //         if(msg.round !== 5) {
    //             if (counter.indexOf(msg.id) === -1) {
    //                 setCounter([
    //                     ...counter,
    //                     msg.id
    //                 ])
    //                 console.log(counter)
    //             }
    //         }
    //     }
    // })
    // messages.map((msg) => {
    //     if(msg.connectedId === userObj.uid) {
    //         if (msg.round !== 5) {
    //             if (counter.indexOf(msg.id) === -1) {
    //                 setCounter([
    //                     ...counter,
    //                     msg.id
    //                 ])
    //             }
    //         }
    //     }
    // })
  const onClick = () => {
    setChoose(true)
  }
  console.log(counter)
  return (
    <div className='d-flex justify-content-center flex-column pb-5'>
        <div className='d-flex justify-content-center btn-group btn-group-toggle'>
            <button className='btn btn-outline-primary active' onClick={() => onClick()}>내 상태</button>
        </div>
        <div>
            <div className='d-flex p-5'>
                <div className='d-flex flex-column border border-primary rounded w-50'>
                    <div className='d-flex justify-content-center'>빌리기/빌려주기 상태</div>
                    <div className='d-flex justify-content-center flex-wrap'>
                        {messages.map((msg) => {
                            if(msg.creatorId === userObj.uid) {
                                if(msg.round !== 5) {
                                    if (counter.indexOf(msg.id) === -1) {
                                        onCounting(msg)
                                        // setCounter([
                                        //     ...counter,
                                        //     msg.id
                                        // ])
                                        // console.log(counter)
                                    }
                                    return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter}/>)
                                }
                            }
                        })}
                    </div>
                </div>
                <div className='d-flex flex-column border border-primary rounded w-50'>
                    <div className='d-flex justify-content-center'>요청/승낙 상태</div>
                        <div className='d-flex justify-content-center flex-wrap'>
                            {messages.map((msg) => {
                                if(msg.connectedId === userObj.uid) {
                                    if (msg.round !== 5) {
                                        if (counter.indexOf(msg.id) === -1) {
                                            onCounting(msg)
                                            // setCounter([
                                            //     ...counter,
                                            //     msg.id
                                            // ])
                                            // console.log(counter)
                                        }
                                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter}/>)
                                    }
                                }
                            })}
                        </div>
                </div>
            </div>
        </div>
        {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
      <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
    </div>  
  )
}

export default Menu
