import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navigation from './components/Navigation'
import Home from './views/Home'
import SignUp from './views/SignUp'
function App() {
  

  return (
    <>
     <Navigation />
            <Container>
              
                <Routes>
                    <Route path='/' element={<Home /> } />
                    <Route path='/signup' element={<SignUp /> } />
                </Routes>
            </Container>
    </>
  )
}

export default App
