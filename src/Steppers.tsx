import { useState, useEffect } from 'react'
// import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const authSteps = [
    '계정 입력',
    '프로필 입력',
  ];
const borrowSteps = [
    '빌리기 등록',
    '승낙 진행 중',
    '공유 상태',
    '반납 진행 중',
    '반납 완료'
]
const lendSteps = [
    '빌려주기 등록',
    '승낙 진행 중',
    '공유 상태',
    '반납 진행 중',
    '반납 완료'
]

function Steppers({ msgObj }) {
    return (
        <div>
            <Stepper activeStep={msgObj.round-1} alternativeLabel>
                {msgObj.text.choose === 1 && borrowSteps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
                {msgObj.text.choose === 2 && lendSteps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default Steppers
