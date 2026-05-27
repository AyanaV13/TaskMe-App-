import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import { useNavigate } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import './AccountPage.css'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function AccountPage() {
  const { user, logout } = useAuth()
  const { settings: savedSettings, saveSettings } = useSettings()
  const navigate = useNavigate()

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : '?'

  const [profile, setProfile] = useState({
    fullName: user?.name || '',
    email: 'ayana@email.com',
    username: user?.username || '',
  })

  const [settings, setSettings] = useState({
    theme: savedSettings.theme,
    language: savedSettings.language,
    timezone: savedSettings.timezone,
    notifications: true,
    emailUpdates: false,
  })

  const [reminders, setReminders] = useState({
    dailyReminder: true,
    reminderTime: '09:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  })

  const toggleDay = (day) => {
    setReminders(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day],
    }))
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      logout()
      navigate('/')
    }
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <h4 className="account-heading">My Account</h4>
        <Tab.Container defaultActiveKey="#profile">
          <Row>
            <Col sm={3}>
              <ListGroup className="account-nav">
                <ListGroup.Item action href="#profile">Profile</ListGroup.Item>
                <ListGroup.Item action href="#account-info">Account Information</ListGroup.Item>
                <ListGroup.Item action href="#settings">Settings</ListGroup.Item>
                <ListGroup.Item action href="#reminders">Reminders</ListGroup.Item>
                <ListGroup.Item action href="#danger" className="danger-tab-link">Danger Zone</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col sm={9}>
              <Tab.Content>

                {/* Profile */}
                <Tab.Pane eventKey="#profile">
                  <div className="tab-section">
                    <div className="avatar-wrapper">
                      <div className="avatar-circle">{initials}</div>
                      <Button variant="outline-secondary" size="sm" className="mt-2">Change Photo</Button>
                    </div>
                    <Form className="account-form">
                      <Form.Group className="account-field">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile.fullName}
                          onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                          className="account-input"
                        />
                      </Form.Group>
                      <Form.Group className="account-field">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={profile.email}
                          onChange={e => setProfile({ ...profile, email: e.target.value })}
                          className="account-input"
                        />
                      </Form.Group>
                      <Form.Group className="account-field">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          value={profile.username}
                          onChange={e => setProfile({ ...profile, username: e.target.value })}
                          className="account-input"
                        />
                      </Form.Group>
                      <Button variant="primary" className="mt-3">Save Changes</Button>
                    </Form>
                  </div>
                </Tab.Pane>

                {/* Account Information */}
                <Tab.Pane eventKey="#account-info">
                  <div className="tab-section">
                    <div className="info-grid">
                      <div className="info-row">
                        <span className="info-label">Member Since</span>
                        <span className="info-value">May 2026</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Account Type</span>
                        <span className="info-value"><Badge bg="secondary">Free</Badge></span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Tasks Created</span>
                        <span className="info-value">24</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Tasks Completed</span>
                        <span className="info-value">18</span>
                      </div>
                    </div>
                    <div className="upgrade-section">
                      <p className="upgrade-desc">Unlock unlimited tasks, reminders, and priority support.</p>
                      <Button variant="warning" className="upgrade-btn">Upgrade to Pro</Button>
                    </div>
                  </div>
                </Tab.Pane>

                {/* Settings */}
                <Tab.Pane eventKey="#settings">
                  <div className="tab-section">
                    <Form className="account-form">
                      <Form.Group className="account-field">
                        <Form.Label>Theme</Form.Label>
                        <Form.Select
                          value={settings.theme}
                          onChange={e => setSettings({ ...settings, theme: e.target.value })}
                          className="account-input"
                        >
                          <option>Dark</option>
                          <option>Light</option>
                          <option>System</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="account-field">
                        <Form.Label>Language</Form.Label>
                        <Form.Select
                          value={settings.language}
                          onChange={e => setSettings({ ...settings, language: e.target.value })}
                          className="account-input"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="account-field">
                        <Form.Label>Timezone</Form.Label>
                        <Form.Select
                          value={settings.timezone}
                          onChange={e => setSettings({ ...settings, timezone: e.target.value })}
                          className="account-input"
                        >
                          <option>CST</option>
                          <option>EST</option>
                          <option>PST</option>
                          <option>MST</option>
                          <option>UTC</option>
                        </Form.Select>
                      </Form.Group>
                      <div className="toggle-row">
                        <span>Notifications</span>
                        <Form.Check
                          type="switch"
                          checked={settings.notifications}
                          onChange={e => setSettings({ ...settings, notifications: e.target.checked })}
                        />
                      </div>
                      <div className="toggle-row">
                        <span>Email Updates</span>
                        <Form.Check
                          type="switch"
                          checked={settings.emailUpdates}
                          onChange={e => setSettings({ ...settings, emailUpdates: e.target.checked })}
                        />
                      </div>
                      <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => saveSettings({ theme: settings.theme, language: settings.language, timezone: settings.timezone })}
                      >Save Settings</Button>
                    </Form>
                  </div>
                </Tab.Pane>

                {/* Reminders */}
                <Tab.Pane eventKey="#reminders">
                  <div className="tab-section">
                    <Form className="account-form">
                      <div className="toggle-row">
                        <span>Daily Reminder</span>
                        <Form.Check
                          type="switch"
                          checked={reminders.dailyReminder}
                          onChange={e => setReminders({ ...reminders, dailyReminder: e.target.checked })}
                        />
                      </div>
                      <Form.Group className="account-field">
                        <Form.Label>Reminder Time</Form.Label>
                        <Form.Control
                          type="time"
                          value={reminders.reminderTime}
                          onChange={e => setReminders({ ...reminders, reminderTime: e.target.value })}
                          className="account-input time-input"
                        />
                      </Form.Group>
                      <Form.Group className="account-field">
                        <Form.Label>Reminder Days</Form.Label>
                        <div className="day-picker">
                          {DAYS.map(day => (
                            <button
                              key={day}
                              type="button"
                              className={`day-btn ${reminders.days.includes(day) ? 'day-btn--active' : ''}`}
                              onClick={() => toggleDay(day)}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </Form.Group>
                      <Button variant="primary" className="mt-3">Save Reminders</Button>
                    </Form>
                  </div>
                </Tab.Pane>

                {/* Danger Zone */}
                <Tab.Pane eventKey="#danger">
                  <div className="tab-section">
                    <div className="danger-zone">
                      <div className="danger-header">
                        <span className="danger-icon">⚠️</span>
                        <h6 className="danger-title">Danger Zone</h6>
                      </div>
                      <hr className="danger-divider" />
                      <p className="danger-desc">
                        Deleting your account is permanent. All your tasks and data will be removed and cannot be recovered.
                      </p>
                      <Button variant="danger" onClick={handleDeleteAccount}>Delete Account</Button>
                    </div>
                  </div>
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  )
}

export default AccountPage
