import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './RegisterPage.css'

function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', username: '', fullName: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ name: form.fullName, username: form.username })
    navigate('/dashboard')
  }

  return (
    <Container className="register-page d-flex flex-column justify-content-center align-items-center">
      <div className="register-branding text-center mb-4">
        <div className="register-logo">TaskMe</div>
        <p className="register-slogan">Organization. Fast. Simple.</p>
      </div>
      <Card bg="dark" text="white" className="register-card">
        <Card.Body className="p-4">
          <h3 className="mb-1 fw-bold">Create an account</h3>
          <p className="text-secondary mb-4" style={{ fontSize: '14px' }}>Start managing your tasks with TaskMe</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                className="bg-secondary border-0 text-white"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                className="bg-secondary border-0 text-white"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                className="bg-secondary border-0 text-white"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="bg-secondary border-0 text-white"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Create Account
            </Button>
          </Form>

          <p className="text-center text-secondary mb-0" style={{ fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#6ea8fe' }}>Log in</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default RegisterPage
