import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from './context/AuthContext'

// Components 
import NavBarComp from "./components/NavBarComp"
import DashboardComp from "./components/DashboardComp"

// Pages
import LandingPage from "./pages/LandingPage"
import LogInPage from "./pages/LogInPage"
import RegisterPage from "./pages/RegisterPage"

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to='/login'/>
}

function App() {
  return (
    <BrowserRouter>
      <NavBarComp/>
      <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LogInPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardComp/>
            </ProtectedRoute>
          } />

          {/* Catch all - redirect unknown routes to landing page */}
          <Route path="*" element={<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
