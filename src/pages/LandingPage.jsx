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
        <p className='subheadline'>Simple. Fast. Yours.</p>
        <Button 
          variant='primary' 
          className='get-started'
          onClick={() => navigate('/register')}
        >Get started now</Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px', background: 'linear-gradient(180deg, #0d1b2e 0%, #0a1220 100%)' }}>
        <div style={{ width: '860px', height: '340px', overflow: 'hidden', borderRadius: '12px', border: '1px solid #2a3a55', boxShadow: '0 8px 40px rgba(0,0,0,0.6)', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ transform: 'scale(0.62)', transformOrigin: 'top left', width: '1387px', background: '#1a1717', padding: '28px 32px', fontFamily: 'sans-serif' }}>
            {/* Greeting */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: 'white' }}>Good morning, Ayana 👋</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Here's an overview of your tasks today.</div>
            </div>
            {/* Stat cards */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              {[{ label: 'Total', value: 5, color: '#6ea8fe' }, { label: 'To Do', value: 3, color: '#adb5bd' }, { label: 'In Progress', value: 1, color: '#ffc107' }, { label: 'Done', value: 1, color: '#2ecc71' }].map(({ label, value, color }) => (
                <div key={label} style={{ flex: 1, background: '#212121', border: '1px solid #333', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color }}>{value}</div>
                  <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ background: '#0d6efd', color: 'white', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: 600 }}>+ Add Task</div>
              <div style={{ background: '#2a2a2a', border: '1px solid #444', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', color: '#666', width: '180px' }}>Search tasks...</div>
            </div>
            {/* Table */}
            <div style={{ background: '#212121', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1.5fr', padding: '10px 16px', borderBottom: '1px solid #333', fontSize: '13px', fontWeight: 600, color: '#ccc' }}>
                <span>Title</span><span>Priority</span><span>Due</span><span>Status</span>
              </div>
              {[
                { title: 'Design UI', dot: '#e74c3c', priority: 'High', due: 'May 8', status: 'To Do' },
                { title: 'Build API', dot: '#f39c12', priority: 'Medium', due: 'May 10', status: 'In Progress' },
                { title: 'Deploy', dot: '#2ecc71', priority: 'Low', due: 'May 12', status: 'Done' },
                { title: 'Write tests', dot: '#f39c12', priority: 'Medium', due: 'May 15', status: 'To Do' },
                { title: 'Code review', dot: '#2ecc71', priority: 'Low', due: 'May 16', status: 'To Do' },
              ].map((task) => (
                <div key={task.title} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1.5fr', padding: '10px 16px', borderBottom: '1px solid #2a2a2a', fontSize: '13px', alignItems: 'center' }}>
                  <span style={{ color: '#6ea8fe' }}>{task.title}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: task.dot, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ background: '#2a2a2a', border: '1px solid #444', borderRadius: '4px', padding: '3px 10px', color: '#ccc' }}>{task.priority}</span>
                  </span>
                  <span style={{ color: '#888' }}>{task.due}</span>
                  <span style={{ background: '#2a2a2a', border: '1px solid #444', borderRadius: '4px', padding: '3px 10px', color: '#ccc', display: 'inline-block' }}>{task.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div 
        className='stats d-flex'
      >
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
        <Card 
          className="organized" 
          bg='dark' 
          text='light' 
          style={{ width: '19rem' }}
        >
          <Card.Body className='card-body'>
            <Card.Title className="card-title">
              <img 
                src={folder} 
                height='30'
              /> Organized</Card.Title>
            <Card.Text className="card-text">
              Add tasks with priority and dates
            </Card.Text>
          </Card.Body>
        </Card>
        <Card 
          className="fast" 
          bg='dark' 
          text='light'
          style={{ width: '18rem' }}
        >
          <Card.Body>
            <Card.Title className="card-title">
              <img 
                src={flash} 
                height='30'
              /> Fast</Card.Title>
            <Card.Text className="card-text">
              Built for speed and simplicity
            </Card.Text>
          </Card.Body>
        </Card>
        <Card 
          className="secure" 
          bg='dark' 
          text='light'
          style={{ width: '18rem' }}
        >
          <Card.Body>
            <Card.Title className="card-title">
              <img 
                  src={secure} 
                  height='30'
                /> Secure</Card.Title>
            <Card.Text className="card-text">
              Your data stays private always
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="cta text-center">
        <h2 className="ready">Ready to get organized?</h2>
        <p className="join">Join hundreds of people who use TaskMe every day.</p>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={() => navigate('/register')}
        > Sign Up Free
        </Button>
      </div>
      <div className="footer">
        <p className="info">© 2026 TaskMe. Built by Ayana Vivens</p>
      </div>
    </>
  )
}

export default LandingPage