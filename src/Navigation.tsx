import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import './Navigation.css'
import Mode from './Mode'
import Avatars from './Avatars'

const onLogOutClick = () => auth.signOut();
function Navigation({ isLoggedIn, userObj, setUserObj, setValue, side, setSide, setSideNavigation, check, setCheck }) {
  const checkbox = (event) => {
    setCheck(false)
    // document.getElementById('nav-control').checked = false
    // document.getElementsByClassName('navigation')[0].style.left = '-100%'
  }
  // const handleClick = (event) => {
  //   if(document.getElementsByClassName('navigation')[0].style.left === '-100%') {
  //     document.getElementsByClassName('navigation')[0].style.left = ''
  //   } else if (document.getElementsByClassName('navigation')[0].style.left === '0') {
  //     document.getElementById('nav-control').checked = false
  //     document.getElementsByClassName('navigation')[0].style.left = '-100%'
  //   }
  // };
  let offsetX
  let offsetSide
  const add = (event, action) => {
    offsetX = event.clientX-event.target.getBoundingClientRect().left
    offsetSide = event.clientX-event.target.getBoundingClientRect().right
    {action === 'pointer' && 
      event.target.addEventListener('pointermove', move)
    }
    {action === 'touch' &&
      event.target.addEventListener('touchmove', move)
    }
    console.log(offsetX)
  }
  const remove = (event, action) => {
    {action === 'pointer' &&
      event.target.removeEventListener('pointermove', move)
    } 
    {action === 'touch' && 
      event.target.removeEventListener('touchmove', move)
    }
    if (event.pageX-offsetX < 0) {
      event.target.style.left = '-100%'
    }
    checkbox(event)
  }
  const move = (event) => {
    const el = event.target
    if (event.pageX-offsetX < 0) {
      el.style.left = `${event.pageX-offsetX}px`
      document.getElementsByClassName('naving')[0].style.left=`${event.pageX-offsetSide}px`
      document.getElementsByClassName('naving')[1].style.left=`${event.pageX-offsetSide}px`
    }
    alert('moving')
  }
  
  // const checking = () => {
  //   setCheck(!check)
  // }
  // const navControl = () => {
  // if (check) {
  //     return (
  //       'navControlCheck'
  //     )
  //   } else {
  //     return (
  //       'navControl'
  //     )
  //   }
  // }
  // const navigation = () => {
  //   if (check) {
  //     return ('navigationCheck')
  //   } else {
  //     return ('navigation')
  //   }
  // }
  const logOut = (event) => {
    onLogOutClick()
    checkbox(event)
    setValue(1)
    setUserObj(null)
  }

  let navigation
  if (check) {
    // navControl = 'navControlChecked'
    navigation = 'navigationChecked'
    setSide('naving d-flex flex-column')
    setSideNavigation('naving border border-primary rounded-top position-fixed bottom-0 end-0')
  } else {
    // navControl = 'navControl'
    navigation = 'navigation'
    setSide('d-flex flex-column')
    setSideNavigation('border border-primary rounded-top position-fixed bottom-0 start-0 end-0')
  }

  return(
    <ClickAwayListener onClickAway={(event) => checkbox(event)}>
      <div>
        {isLoggedIn && 
        <nav 
          className={navigation}
          onTouchStart={(event) => add(event, 'touch')}
          onTouchEnd={(event) => remove(event, 'touch')}
          onPointerDown={(event) => add(event, 'pointer')} 
          onPointerUp={(event) => remove(event, 'pointer')}
        >
          <h5 className='nav-padding'>
            <Mode/>
          </h5>
          <h1 className='nav-padding'>
            <Link to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
          </h1>
          <h1>
            <Link to='/postings/profile' onClick={(event) => checkbox(event)}>{userObj.displayName}의 프로필</Link>
          </h1>
          <h1>
            <Link to='/postings/ranking' onClick={(event) => checkbox(event)}>유저 랭킹</Link>
          </h1>
          <h1>
            <Link to="/postings/" onClick={(event) => {
              logOut(event)
            }}>로그아웃</Link>
          </h1>
        </nav>
        }
        {!isLoggedIn &&
          <nav 
            className={navigation} 
            onTouchStart={(event) => add(event, 'touch')}
            onTouchEnd={(event) => remove(event, 'touch')}
            onPointerDown={(event) => add(event, 'pointer')} 
            onPointerUp={(event) => remove(event, 'pointer')}
          >
            <h5 className='nav-padding'>
              <Mode/>
            </h5>
            <h1 className='nav-padding'>
              <Link to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
            </h1>
            <h1>
              <Link to='/postings/' onClick={(event) => {
                checkbox(event)
                setValue(1)
              }}>로그인/회원가입</Link>
            </h1>
            <h1>
              <Link to="/postings/contact" onClick={(event) => checkbox(event)}>신고하기</Link>
            </h1>
          </nav>
        }
        </div>
      </ClickAwayListener>
    )
}

export default Navigation