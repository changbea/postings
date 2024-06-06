import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Navigation from './Navigation'
import Navigations from './Navigations'
import Avatars from './Avatars'

function Ranking({ isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter }) {
//   const [choose, setChoose] = useState(0);
  const [rank, setRank] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setRank(newArray)
    })
  }, [])

  return (
    <div className='d-flex flex-column'>
        <Navigation isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} setValue={setValue} side={side} setSide={setSide} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} check={check} setCheck={setCheck}/>
        <div className={side}>
            <div onClick={() => setCheck(!check)}>
            {userObj &&
                <Avatars altName={userObj.displayName}/>
            }
            {!userObj &&
                <Avatars />
            }
            </div>
            <div>
                유저 랭킹 / 유저 이름 / 포인트 
            </div>
            <ol className='list-group'>
                {rank.map((element) => {
                    return(
                        <li key={element.uid} className='list-group'>
                            <span className='list-group-item list-group-item-primary'>{rank.indexOf(element)+1}. {element.displayName} / {element.points}</span>
                        </li>
                    )
                })}
            </ol>
            <Navigations counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} sideNavigation={sideNavigation} setSideNavigation={setSideNavigation} check={check} setCheck={setCheck}/>
        </div>
    </div>  
  )
}

export default Ranking
