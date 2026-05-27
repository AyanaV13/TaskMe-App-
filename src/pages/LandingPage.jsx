import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LandingPage.css'
import folder from '../assets/images/folder.png'
import flash from '../assets/images/flash.png'
import secure from '../assets/images/encrypted.png'

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <div className='hero'>
        <p className='headline'>Task Management - Less chaos. More done.</p>
        <p className='subheadline'>Organization. Fast. Simple.</p>
        <Button
          variant='primary'
          className='get-started'
          onClick={() => navigate('/register')}
        >Get started now</Button>
      </div>
      <div className="preview-wrapper">
        <div className="preview-container">
          <div className="preview-inner">
            <div className="preview-greeting">
              <div className="preview-greeting-title">Good morning, Ayana 👋</div>
              <div className="preview-greeting-sub">Here's an overview of your tasks today.</div>
            </div>
            <div className="preview-stats">
              {[{ label: 'Total', value: 5, color: '#6ea8fe' }, { label: 'To Do', value: 3, color: '#adb5bd' }, { label: 'In Progress', value: 1, color: '#ffc107' }, { label: 'Done', value: 1, color: '#2ecc71' }].map(({ label, value, color }) => (
                <div key={label} className="preview-stat-card">
                  <div className="preview-stat-value" style={{ color }}>{value}</div>
                  <div className="preview-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="preview-controls">
              <div className="preview-add-btn">+ Add Task</div>
              <div className="preview-search">Search tasks...</div>
            </div>
            <div className="preview-table">
              <div className="preview-table-header">
                <span>Title</span><span>Priority</span><span>Due</span><span>Status</span>
              </div>
              {[
                { title: 'Design UI', dot: '#e74c3c', priority: 'High', due: 'May 8', status: 'To Do' },
                { title: 'Build API', dot: '#f39c12', priority: 'Medium', due: 'May 10', status: 'In Progress' },
                { title: 'Deploy', dot: '#2ecc71', priority: 'Low', due: 'May 12', status: 'Done' },
                { title: 'Write tests', dot: '#f39c12', priority: 'Medium', due: 'May 15', status: 'To Do' },
                { title: 'Code review', dot: '#2ecc71', priority: 'Low', due: 'May 16', status: 'To Do' },
              ].map((task) => (
                <div key={task.title} className="preview-table-row">
                  <span className="preview-task-title">{task.title}</span>
                  <span className="preview-priority-cell">
                    <span className="preview-priority-dot" style={{ background: task.dot }} />
                    <span className="preview-priority-badge">{task.priority}</span>
                  </span>
                  <span className="preview-due">{task.due}</span>
                  <span className="preview-status-badge">{task.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='stats d-flex'>
        <Container>
          <Row className="text-center">
            <Col className='d-flex tasks'>
              <h3 className="number">10K+</h3>
              <p>Tasks Completed</p>
            </Col>
            <Col className='d-flex users'>
              <h3 className="number">500+</h3>
              <p>Users</p>
            </Col>
            <Col className='d-flex satisfaction'>
              <h3 className="number">99%</h3>
              <p>Satisfaction</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="features d-flex">
        <Card className="organized" bg='dark' text='light'>
          <Card.Body className='card-body'>
            <Card.Title className="card-title">
              <img src={folder} height='30' /> Organized
            </Card.Title>
            <Card.Text className="card-text">
              Add tasks with priority and dates
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="fast" bg='dark' text='light'>
          <Card.Body>
            <Card.Title className="card-title">
              <img src={flash} height='30' /> Fast
            </Card.Title>
            <Card.Text className="card-text">
              Built for speed and simplicity
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="secure" bg='dark' text='light'>
          <Card.Body>
            <Card.Title className="card-title">
              <img src={secure} height='30' /> Secure
            </Card.Title>
            <Card.Text className="card-text">
              Your data stays private always
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="cta text-center">
        <h2 className="ready">Ready to get organized?</h2>
        <p className="join">Join hundreds of people who use TaskMe every day.</p>
        <Button variant="primary" size="lg" onClick={() => navigate('/register')}>
          Sign Up Free
        </Button>
      </div>
      <div className="footer">
        <p className="info">© 2026 TaskMe. Built by Ayana Vivens</p>
      </div>
    </>
  )
}

export default LandingPage
