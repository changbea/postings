import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import Checklist from '@mui/icons-material/Checklist'
import ChecklistRtl from '@mui/icons-material/ChecklistRtl'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badge from '@mui/material/Badge';

function Badges({ counter, counting }) {
    console.log(counting)
    let count
    if (counting === 0) {
        count = counter.length
    } else {
        count = counting
    }
    return (
        <Badge badgeContent={count} color="primary">
            <BeachAccess/>
        </Badge>
    )
}

export default Badges
