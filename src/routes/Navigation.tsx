import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
 

import { Navbar } from '../components/Navbar/Navbar.component'

import { ProtectedRoute } from '../components/ProtectedRoute'
import { Auth } from '../pages/Auth/Auth.page'
import { UserRoutes } from './UserRoutes'
import { Footer } from '../components/Footer.component'
import { Home } from '../pages/Home/Home.page'

export const Navigation = () => {
  return (
    <BrowserRouter>
        <div className="main-layout">
            <Navbar />

            <Routes>
                <Route path='about' element={<h1>About page</h1>} />
                <Route path='home' element={<Home />} />
                <Route element={<ProtectedRoute />}>
                  <Route path='user/*' element={<UserRoutes />} />
                </Route>
                <Route path='auth' element={<Auth />} />

                <Route path='/*' element={<Navigate to="home" replace />} />
            </Routes>
        </div>
        <Footer />
    </BrowserRouter>
  )
}
