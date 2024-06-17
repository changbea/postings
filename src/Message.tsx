import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Btn from './Btn';
import Avatars from './Avatars';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Message({ msgObj, isOwner, userObj, isLoggedIn, counter, setCounter, setValue, counting, setCounting }) {
  const [num, setNum] = useState(null)
  const [points, setPoints] = useState(null)

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${msgObj.creatorId}`)), (snapshot) => {
        const number = snapshot.data().points
        setNum(number)
      }
    )
  }, [])
  useEffect(() => {
    if (msgObj.connectedId !== null) {
      onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
        const element = snapshot.data().points
        setPoints(element)
      })
    }
  })
  // console.log(msgObj.text.clock.gmt < Date.now())
  return (
    <div>
      {msgObj.text.clock.gmt < Date.now() && 
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardActionArea>
          <Link 
            to='/postings/specific' 
            className='border border-primary btn rounded'
            state = {{
              msgObj: msgObj,
              isOwner: isOwner,
              isLoggedIn: isLoggedIn,
              num: num,
              value: points,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {msgObj.text.choose == 1 &&
                  <div className='d-flex justify-content-center'>빌리기</div>
                }
                {msgObj.text.choose == 2 &&
                  <div className='d-flex justify-content-center'>빌려주기</div>
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div className='d-flex justify-content-center'>
                  <Avatars altName={msgObj.displayName} />
                    <FastRewindIcon />
                  <Avatars />
                  <Avatars altName={msgObj.displayName} />
                    <FastRewindIcon />
                  <Avatars altName='?' />
                </div>
                <div className='d-flex justify-content-center'>{msgObj.text.counting} {msgObj.text.counter}</div>
                <div className='d-flex justify-content-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute}</div>
                <div className='d-flex justify-content-center'>~</div>
                <div className='d-flex justify-content-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute}</div>
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
          <Btn msgObj={msgObj} isOwner={isOwner} userObj={userObj} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} counting={counting} setCounting={setCounting}/>
        </CardActions>
      </Card>}
    </div>
  )
}

export default Message
