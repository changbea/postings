import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Checklist from '@mui/icons-material/Checklist'
import ChecklistRtl from '@mui/icons-material/ChecklistRtl'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badges from './Badges'
import './Navigations.css'

function Navigations({ counter, isLoggedIn, value, setValue, sideNavigation, setSideNavigation, counting, setCounting }) {
    return (
        <div>
            {isLoggedIn &&
                <BottomNavigation
                    className={sideNavigation}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>빌리기</Link>} icon={<ChevronRight />}/>
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>빌리기 목록</Link>} icon={<Checklist />}/>
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>내 상태</Link>} icon={<Badges counter={counter} counting={counting}/>}/>
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>빌려주기</Link>} icon={<ChevronLeft/>}/>
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>빌려주기 목록</Link>} icon={<ChecklistRtl />}/>
                    {/* <div className='font-link'>list</div> */}
                </BottomNavigation>
            }
            {!isLoggedIn && 
                <BottomNavigation
                    className={sideNavigation}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                >
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>빌리기 목록</Link>} icon={<Checklist />}/>
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>로그인</Link>} icon={<BeachAccess />}/>
                    <BottomNavigationAction label={<Link className='btns' to='/postings/'>빌려주기 목록</Link>} icon={<ChecklistRtl />}/>
                </BottomNavigation>
            }
        </div>
    )
}

export default Navigations
