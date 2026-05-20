import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import './NavBarComp.css'
import menuIcon from '../assets/images/menu.png'
import { Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function NavBarComp() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Navbar bg="dark" variant="dark" className="px-4">
      <img
        src={menuIcon}
        width="40"
        height="25"
        className="d-inline-block align-top mx-2"
      />{' '}
      <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>TaskMe</Navbar.Brand>

      {user && (
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
          <NavDropdown title="Daily Tasks">
            {DAYS.map((day) => (
              <NavDropdown.Item key={day}>{day}</NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      )}

      <Nav className="ms-auto gap-2">
        {user ? (
          <>
            <Button variant="outline-light">Account</Button>
            <Button variant="danger" onClick={handleLogout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button variant="outline-light" onClick={() => navigate('/login')}>Log In</Button>
            <Button variant="primary" onClick={() => navigate('/register')}>Sign Up</Button>
          </>
        )}
      </Nav>
    </Navbar>
  )
}

export default NavBarComp
