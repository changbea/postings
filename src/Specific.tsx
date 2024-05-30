import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import Btn from './Btn';
// import { auth, onSocialClick, dbservice, storage } from './serverbase'
// import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
// import supporting from './supporting';
// import confirm from './confirm';
// import confirming from './confirming';
// import Dialogs from './Dialogs';

function Specific() {
  const {state} = useLocation()
  const navigate = useNavigate()
  // console.log(state)
  useEffect(() => {
    if (!state.isLoggedIn) {
      navigate('/posting/')
    }
  })

  const onClick = () => {
    navigate(-1)
  }
  return (
    <div>
      {state.msgObj.round === 1 && 
        <div className='d-flex justify-content-center'>빌리기</div>
      }
      {state.msgObj.round === 2 && 
        <div className='d-flex justify-content-center'>빌려주기</div>
      }
      <div className='d-flex justify-content-center'>요청 유저 이름: {state.msgObj.displayName}</div>
      <div className='d-flex justify-content-center'>포인트: {state.msgObj.point}</div>
      <div className='d-flex justify-content-center'>열람실의 위치: {state.msgObj.text.counting}</div>
      <div className='d-flex justify-content-center'>좌석의 위치: {state.msgObj.text.counter}</div>
      <div className='d-flex justify-content-center'>이 때부터: {state.msgObj.text.clock.year}.{state.msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clock.hour}:{state.msgObj.text.clock.minute}</div>
      <div className='d-flex justify-content-center'>이 때까지: {state.msgObj.text.clock.year}.{state.msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clocker.hour}:{state.msgObj.text.clocker.minute}</div>
      <div className='d-flex justify-content-center'>승낙 유저 이름: {state.msgObj.connectedName}</div>
      <div className='d-flex justify-content-center'>진행 단계: {state.msgObj.round}</div>
      <Btn msgObj={state.msgObj} isOwner={state.isOwner} userObj={state.userObj} num={state.num} value={state.value} />
      <div className='d-flex justify-content-center'>
        <button className='btn btn-outline-primary' onClick={onClick}>confirm</button>
      </div>
    </div>
  )
}

export default Specific
