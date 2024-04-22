import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { UserType, CategoryType } from './types'
import AlertMessage from './components/AlertMessage'
import Navigation from './components/Navigation'
import Home from './views/Home'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Questions from './views/Questions';
import EditQuestion from './views/EditQuestion';
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState<string|undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserType|null>(null);
  const [category, setCategory] = useState<CategoryType|undefined>(undefined);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
      setIsLoggedIn(true);
    }else {
      setIsLoggedIn(false);
    }
  }, []);
  const logUserIn = () => {
    setIsLoggedIn(true);
}
const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
  setMessage(newMessage);
  setCategory(newCategory);
}
const logUserOut = () => {
  setIsLoggedIn(false);
  setCurrentUser(null);
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExp');
  flashMessage('You have successfully logged out', 'success');
}
  return (
    <>
     <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            <Container>
            {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={currentUser} flashMessage={flashMessage}/> } />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage}/> } />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/> } />
                    <Route path='/questions' element={<Questions currentUser={currentUser} flashMessage={flashMessage} handleClick={logUserOut}/> } />
                    <Route path='/edit/:questionId' element={<EditQuestion flashMessage={flashMessage} currentUser={currentUser} />} /> <Route path='/edit/:postId' element={<EditQuestion flashMessage={flashMessage} currentUser={currentUser} />} />
                </Routes>
            </Container>
    </>
  )
}

export default App
