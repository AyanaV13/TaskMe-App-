import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBarComp.css'
import menuIcon from '../assets/images/menu.png'

function NavBarComp() {

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary nav-bar-style" data-bs-theme="dark" bg='dark'>
      <Container>
        <img
          src={menuIcon}
          width="25"
          height="25"
          className="d-inline-block align-top mx-2"
        />{' '}
        <Navbar.Brand href="#home">TaskMe</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#dashboard" className='navbar-option'>Dashboard</Nav.Link>
            <NavDropdown title="Daily Tasks" className='navbar-option' id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Monday</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Tuesday
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Wednesday</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Thursday
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">
                Friday
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6">
                Saturday
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">
                Sunday
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
            <Nav.Link href="#profile">Log In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComp