import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
// import supporting from './supporting';
// import confirm from './confirm';
// import confirming from './confirming';
import Dialogs from './Dialogs';
// import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import Button from '@mui/material/Button';

function Btn({ msgObj, isOwner, userObj, isLoggedIn, num, points, setValue, counter, setCounter }) {
  // const [num, setNum] = useState(null)
  // const [value, setValue] = useState(null)
  const [move, setMove] = useState(false)
  
  const onDeleteClick = () => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    deleteDoc(data)
  }

  const onClick = (action) => {
    const data = doc(dbservice, `num/${msgObj.id}`)
    if (action === 'delete') {
      // const data = doc(dbservice, `num/${msgObj.id}`)
      deleteDoc(data)
      const [msgObj, ...newCounter] = counter
      setCounter([
        ...newCounter
      ])
    } else if (action === 'confirm return') {
      // const data = doc(dbservice, `num/${msgObj.id}`)
      updateDoc(data, {round: 5});
      const point = doc(dbservice, `members/${msgObj.creatorId}`)
      const connectedPoint = doc(dbservice, `members/${msgObj.connectedId}`)

      if (msgObj.text.choose == 1) {
        updateDoc(point, {points: num-msgObj.point});
        updateDoc(connectedPoint, {points: points+msgObj.point});
      } else {
        updateDoc(point, {points: num+msgObj.point});
        updateDoc(connectedPoint, {points: points-msgObj.point});
      }
    } else if (action === 'confirm') {
      // const data = doc(dbservice, `num/${msgObj.id}`)
      updateDoc(data, {round: 3});
    } else if (action === 'returning') {
      // const data = doc(dbservice, `num/${msgObj.id}`)
      updateDoc(data, {round: 4});
    } else if (action === 'supporting') {
      if (isLoggedIn) { 
        // const data = doc(dbservice, `num/${msgObj.id}`)
        updateDoc(data, {round: 2, connectedId: userObj.uid, connectedName: userObj.displayName});
      } else {
        setMove(true)
      }
    } else if (action === 'stop supporting') {
      if (isLoggedIn) { 
        // const data = doc(dbservice, `num/${msgObj.id}`)
        updateDoc(data, {round: 1, connectedId: null, connectedName: null});
      }
    }
  }
  const handleClose = () => {
    setMove(false);
  };

  // const support = () => {
  //   if (isLoggedIn) { 
  //     const data = doc(dbservice, `num/${msgObj.id}`)
  //     updateDoc(data, {round: 2, connectedId: userObj.uid, connectedName: userObj.displayName});
  //   } else {
  //     setMove(true)
  //   }
  // }

  return (
    <div>
      {isOwner &&
        <div className='d-flex justify-content-center'>
          {msgObj.round === 1 && <Button variant='outlined' onClick={() => onClick('delete')}>지우기</Button>}
          {msgObj.round === 2 &&
            <Button variant='outlined' onClick={() => {  
              return (
                onClick('confirm')
              )
            }}>승낙 메시지 확인</Button>
          }
          {msgObj.round === 3 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <Button variant='outlined' onClick={() => {
                return (
                  onClick('returning')
                )
                }}>반납하기</Button>
              }
              {msgObj.text.choose == 2 && <Button variant='outlined'>{msgObj.connectedName} 님이 빌리는 중</Button>}
            </div>
          }
          {msgObj.round === 4 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <Button variant='outlined'>주인에게 확인 중</Button>}
              {msgObj.text.choose == 2 && <Button variant='outlined' onClick={() => onClick('confirm return')}>반납 완료 확인</Button>}
            </div>
          }
        </div>
      }
      {!isOwner &&
        <div className='d-flex justify-content-center'>
          {msgObj.round === 1 &&
            <div className='d-flex justify-content-center'>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('supporting')
                )
              }}>승낙하기</Button>
              <Dialogs move={move} handleClose={handleClose} setValue={setValue}/>
            </div>
          }
          {msgObj.round === 2 &&
            <div className='d-flex flex-column justify-content-center'>
              <Button variant='outlined' onClick={() => {
                // return (
                //   onClick('stop supporting')
                // )
                // supporting({userObj, msgObj, isLoggedIn})
              }}>승낙 메시지 전송 완료</Button>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('stop supporting')
                )
              }}>완료</Button>
            </div>
          }
          {msgObj.round === 3 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <Button variant='outlined'>{msgObj.displayName} 님이 빌리는 중</Button>}
              {msgObj.text.choose == 2 && <Button variant='outlined' onClick={() => {
                return (
                  onClick('returning')
                )
                // confirming({userObj, msgObj})
                }}>반납하기</Button>
              }
            </div>
          }
          {msgObj.round === 4 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <Button variant='outlined' className='d-flex justify-content-center btn btn-outline-primary' onClick={() => onClick('confirm return')}>반납 완료 확인</Button>}
              {msgObj.text.choose == 2 && <Button variant='outlined' className='d-flex justify-content-center btn btn-outline-primary'>주인에게 확인 중</Button>}
            </div>
          }
        </div>  
      }
    </div>
  )
}

export default Btn
