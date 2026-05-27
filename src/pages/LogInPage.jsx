import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import './LogInPage.css'

const DUMMY_USER = { username: 'ayana', password: 'password123', name: 'Ayana' }

function LogInPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      login({ name: DUMMY_USER.name, username: DUMMY_USER.username })
      navigate('/dashboard')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <Container className="login-page d-flex flex-column justify-content-center align-items-center">
      <div className="login-branding text-center mb-4">
        <div className="login-logo">TaskMe</div>
        <p className="login-slogan">Less chaos. More done.</p>
      </div>
      <Card bg="dark" text="white" className="login-card">
        <Card.Body className="p-4">
          <h3 className="mb-1 fw-bold">Welcome back</h3>
          <p className="text-secondary mb-4 login-subtitle">Sign in to your TaskMe account</p>

          {error && <Alert variant="danger" className="py-2">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-secondary border-0 text-white"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary border-0 text-white"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Log In
            </Button>
          </Form>

          <p className="text-center text-secondary mb-0 login-footer">
            Don't have an account?{' '}
            <Link to="/register" className="login-link">Sign up</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LogInPage
