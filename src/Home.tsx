import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import Menu from './Menu'
import Notice from './Notice'
import Auth from './Auth'
import Add from './Add'
import Navigations from './Navigations'
import Avatars from './Avatars'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import Navigation from './Navigation'

function Home({ isLoggedIn, userObj, value, newAccount, setNewAccount, side, setSide, sideNavigation, setSideNavigation, setValue, check, setCheck, counter, setCounter}) {
    const [num, setNum] = useState(null)
    // const noticeBorrowOnClick = (boolean) => setNoticeBorrow(boolean)
    // useEffect(() => {
    //     onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
    //         const newArray = snapshot.docs.map((document) => ({
    //             id: document.id,
    //             ...document.data(),
    //         }));
    //         setMessages(newArray)
    //     })
    // })
    const checking = () => {
        setCheck(!check)
    }
    
    useEffect(() => {
        onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
            if (isLoggedIn) {
                const number = snapshot.data().points
                setNum(number)
            }
        })
    }, [])
    
    return (
        <div>
            <Navigation isLoggedIn={isLoggedIn} userObj={userObj} value={value} setValue={setValue} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} check={check} setCheck={setCheck}/>
        <div className={side}>
            <div onClick={checking}>
                {userObj &&
                    <Avatars altName={userObj.displayName}/>
                }
                {!userObj &&
                    <Avatars />
                }
            </div>
            {isLoggedIn && 
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-center'>좋은 날씨네요 {userObj.displayName} 님</div>
                {isLoggedIn && <div className='d-flex justify-content-center'>내 포인트: {num}</div>}
                {value === 0 && 
                    <Add isLoggedIn={isLoggedIn} userObj={userObj} valuing={value}/>
                }
                {value === 1 &&
                    <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={value} setValue={setValue}/>
                }
                {value === 2 && <Menu userObj={userObj}/>}
                {value === 3 && 
                    <Add isLoggedIn={isLoggedIn} userObj={userObj} valuing={value}/>
                }
                {value === 4 &&
                    <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={value} setValue={setValue}/>
                }
            </div>
            }
            {!isLoggedIn &&
                <div>
                    {value === 0 &&
                        <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue}/>
                    }
                    {value === 1 &&
                        <Auth newAccount={newAccount} setNewAccount={setNewAccount} userObj={userObj} valuing={value}/>
                    }
                    {value === 2 &&
                        <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={4} setValue={setValue}/>
                    }
                </div>
            }
        </div>
        <Navigations counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} check={check} setCheck={setCheck}/>
                </div>

    )
}

export default Home