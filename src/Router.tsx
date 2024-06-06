import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import 'firebase/firestore'
import Home from './Home'
import Auth from './Auth'
import Profile from './Profile'
import Ranking from './Ranking'
import Specific from './Specific'
import Navigation from './Navigation'
import Navigations from './Navigations'

function Router({ isLoggedIn, userObj, setUserObj, newAccount, setNewAccount }) {
    const [counter, setCounter] = useState([]);
    const [value, setValue] = useState(2);
    const [side, setSide] = useState('d-flex flex-column');
    const [sideNavigation, setSideNavigation] = useState('border border-primary rounded-top position-fixed bottom-0 start-0 end-0');
    const [check, setCheck] = useState(false)

    console.log(check)
    return (
        <BrowserRouter>
            {/* <Navigation isLoggedIn={isLoggedIn} userObj={userObj} value={value} setValue={setValue} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} check={check} setCheck={setCheck}/> */}
            <Routes>
                {
                    isLoggedIn ? (
                        <Route>
                            <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />}/>
                            {/* <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount}/>}/> */}
                            <Route path='/postings/profile' Component={() => <Profile isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                            <Route path='/postings/ranking' Component={() => <Ranking isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                            <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                        </Route>
                    ) : (
                        <Route>
                            <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{uid: null}} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />}/>
                            <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                            {/* <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{uid: null}} value={1} newAccount={newAccount} setNewAccount={setNewAccount}/>}/> */}
                        </Route>
                    )
                }
            </Routes>
            {/* <Navigations counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} check={check} setCheck={setCheck}/> */}
            {/* <div className='naving'>
            </div> */}
        </BrowserRouter>
    )
}

export default Router