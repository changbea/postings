import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import supporting from './supporting';
import confirm from './confirm';
import confirming from './confirming';
import Dialogs from './Dialogs';
// import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'

function Btn({ msgObj, isOwner, userObj, isLoggedIn, num, value, counter, setCounter }) {
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
        updateDoc(connectedPoint, {points: value+msgObj.point});
      } else {
        updateDoc(point, {points: num+msgObj.point});
        updateDoc(connectedPoint, {points: value-msgObj.point});
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
          {msgObj.round === 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => onClick('delete')}>지우기</button>}
          {msgObj.round === 2 &&
            <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => {  
              return (
                onClick('confirm')
              )
              // confirm({userObj, msgObj})
            }}>승낙 메시지 확인</button>
          }
          {msgObj.round === 3 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => {
                return (
                  onClick('returning')
                )
                // confirming({userObj, msgObj})
                }}>반납하기</button>
              }
              {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary'>{msgObj.connectedName} 님이 빌리는 중</button>}
            </div>
          }
          {msgObj.round === 4 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary'>주인에게 확인 중</button>}
              {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => onClick('confirm return')}>반납 완료 확인</button>}
            </div>
          }
        </div>
      }
      {!isOwner &&
        <div className='d-flex justify-content-center'>
          {msgObj.round === 1 &&
            <div className='d-flex justify-content-center'>
              <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => {
                return (
                  onClick('supporting')
                )
                // support(userObj, msgObj, isLoggedIn)
              }}>승낙하기</button>
              <Dialogs move={move} handleClose={handleClose}/>
            </div>
          }
          {msgObj.round === 2 &&
            <div className='d-flex flex-column justify-content-center'>
              <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => {
                // return (
                //   onClick('stop supporting')
                // )
                // supporting({userObj, msgObj, isLoggedIn})
              }}>승낙 메시지 전송 완료</button>
              <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => {
                return (
                  onClick('stop supporting')
                )
                // supporting({userObj, msgObj, isLoggedIn})
              }}>완료</button>
            </div>
          }
          {msgObj.round === 3 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary'>{msgObj.displayName} 님이 빌리는 중</button>}
              {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => {
                return (
                  onClick('returning')
                )
                // confirming({userObj, msgObj})
                }}>반납하기</button>
              }
            </div>
          }
          {msgObj.round === 4 &&
            <div className='d-flex justify-content-center'>
              {msgObj.text.choose == 1 && <button className='d-flex justify-content-center btn btn-outline-primary' onClick={() => onClick('confirm return')}>반납 완료 확인</button>}
              {msgObj.text.choose == 2 && <button className='d-flex justify-content-center btn btn-outline-primary'>주인에게 확인 중</button>}
            </div>
          }
        </div>  
      }
    </div>
  )
}

export default Btn
