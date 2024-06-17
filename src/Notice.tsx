import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import Message from './Message'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function Notice({ isLoggedIn, userObj, valuing, setValue, counter, setCounter }) {
  const [choose, setChoose] = useState(0);
  const [messages, setMessages] = useState([]);

  const onClick = (num) => {
    if (choose === num) {
        setChoose(0)
    } else {
        setChoose(num)
    }
  }

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setMessages(newArray)
    })
  }, [])

  return (  
    <div>
        <div>
            {valuing === 1 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => onClick(1)}>빌리기 게시판</button>
                </div>
            }
            {valuing === 4 &&
                <div className='d-flex justify-content-center btn-group btn-group-toggle'>
                    <button className='btn btn-outline-primary active' onClick={() => onClick(2)}>빌려주기 게시판</button>  
                </div>
            }
        </div>
        <div className='d-flex justify-content-center flex-wrap'>
            {valuing === 1 && messages.map((msg) => {
                if (msg.text.choose === 1 && msg.round === 1) {
                    return(
                        <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter} />
                    )
                }
            })}
            {valuing === 4 && messages.map((msg) => {
                if (msg.text.choose === 2 && msg.round === 1) {
                    return(
                        <Message key={msg.id} msgObj={msg} isOwner={msg.creatorId === userObj.uid} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter} />
                    )
                }
            })}
        </div>
    </div>
  )
}

export default Notice
