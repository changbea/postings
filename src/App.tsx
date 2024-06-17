import { useEffect, useState, useContext, createContext } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Router from './Router'
import Lotties from './Lotties'
import { auth } from './serverbase'

function App() {
  const [count, setCount] = useState<number>(0)
  const [init, setInit] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)
  const [newAccount, setNewAccount] = useState({account: false, round: 0})
  const userContext = createContext()
  const user = [
    <userContext.Provider value="Reed">
      <User />
    </userContext.Provider>
  ]
  function User() {
    return (
      <userContext.Consumer>
        {value => <h1>{value}</h1>} 
        {/* prints: Reed */}
      </userContext.Consumer>
    )
  }
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
          {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} newAccount={newAccount} setNewAccount={setNewAccount}/> : <Lotties/>}
    </>
  )
}

export default App
