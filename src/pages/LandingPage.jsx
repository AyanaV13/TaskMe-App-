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
      <div style={{
        width: '100%',
        height: '300px',
        background: 'linear-gradient(180deg, #0d1b2e 0%, #0a1220 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff50'
      }}>
        Dashboard Preview Coming Soon
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