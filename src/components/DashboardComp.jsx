import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useSettings } from '../context/SettingsContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import './DashboardComp.css'

const MOCK_TASKS = [
  { id: 1, title: 'Design UI', description: 'Create mockups and component layouts.', priority: 'High', due: '2025-05-08', status: 'To Do', notes: '' },
  { id: 2, title: 'Build API', description: 'Set up REST endpoints for tasks.', priority: 'Medium', due: '2025-05-10', status: 'In Progress', notes: '' },
  { id: 3, title: 'Deploy', description: 'Push to production via CI/CD pipeline.', priority: 'Low', due: '2025-05-12', status: 'Done', notes: '' },
  { id: 4, title: 'Write tests', description: 'Unit and integration test coverage.', priority: 'Medium', due: '2025-05-15', status: 'To Do', notes: '' },
  { id: 5, title: 'Code review', description: 'Review open PRs from teammates.', priority: 'Low', due: '2025-05-16', status: 'To Do', notes: '' },
]

const PRIORITY_COLORS = { High: '#e74c3c', Medium: '#f39c12', Low: '#2ecc71' }

const STATUS_VARIANTS = {
  'To Do': 'secondary',
  'In Progress': 'warning',
  'Done': 'success',
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function StatCard({ label, value, color }) {
  const { settings } = useSettings()
  const isDark = settings.theme !== 'Light'
  return (
    <Card bg={isDark ? 'dark' : undefined} text={isDark ? 'white' : undefined} className="stat-card" style={{ borderTopColor: color }}>
      <Card.Body className="text-center">
        <div className="stat-card-value" style={{ color }}>{value}</div>
        <div className="stat-card-label">{label}</div>
      </Card.Body>
    </Card>
  )
}

const EMPTY_FORM = { title: '', description: '', priority: 'Medium', due: '', status: 'To Do' }

function AddTaskModal({ show, onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM)

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({ ...form, id: Date.now(), notes: '' })
    setForm(EMPTY_FORM)
    onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton style={{ background: '#1e1e1e', border: 'none' }}>
        <Modal.Title style={{ color: 'white', fontSize: '16px' }}>New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#1e1e1e' }}>
        <Form onSubmit={handleSubmit} id="add-task-form">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label style={{ color: '#ccc', fontSize: '13px' }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={handleChange}
              style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white' }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label style={{ color: '#ccc', fontSize: '13px' }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What needs to be done?"
              value={form.description}
              onChange={handleChange}
              style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', resize: 'none' }}
            />
          </Form.Group>
          <Row className="g-2 mb-3">
            <Col>
              <Form.Label style={{ color: '#ccc', fontSize: '13px' }}>Priority</Form.Label>
              <Form.Select
                id="priority"
                value={form.priority}
                onChange={handleChange}
                style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white' }}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label style={{ color: '#ccc', fontSize: '13px' }}>Status</Form.Label>
              <Form.Select
                id="status"
                value={form.status}
                onChange={handleChange}
                style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white' }}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </Form.Select>
            </Col>
          </Row>
          <Form.Group controlId="due">
            <Form.Label style={{ color: '#ccc', fontSize: '13px' }}>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={form.due}
              onChange={handleChange}
              style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: '#1e1e1e', border: 'none' }}>
        <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
        <Button variant="primary" size="sm" type="submit" form="add-task-form">Add Task</Button>
      </Modal.Footer>
    </Modal>
  )
}

function TaskDetailModal({ task, onClose, onUpdate }) {
  const [notes, setNotes] = useState(task?.notes ?? '')
  const [description, setDescription] = useState(task?.description ?? '')

  if (!task) return null

  const handleClose = () => {
    onUpdate(task.id, 'description', description)
    onUpdate(task.id, 'notes', notes)
    onClose()
  }

  return (
    <Modal show={!!task} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ background: '#1e1e1e', border: 'none' }}>
        <Modal.Title style={{ color: 'white', fontSize: '16px' }}>{task.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#1e1e1e' }}>
        <div className="d-flex gap-3 mb-3 flex-wrap">
          <div>
            <div style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', marginBottom: 4 }}>Priority</div>
            <div className="d-flex align-items-center gap-2">
              <span style={{
                display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                background: PRIORITY_COLORS[task.priority],
              }} />
              <Form.Select
                size="sm"
                value={task.priority}
                onChange={(e) => onUpdate(task.id, 'priority', e.target.value)}
                style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', width: 'auto' }}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Select>
            </div>
          </div>
          <div>
            <div style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', marginBottom: 4 }}>Status</div>
            <Form.Select
              size="sm"
              value={task.status}
              onChange={(e) => onUpdate(task.id, 'status', e.target.value)}
              style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', width: 'auto' }}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </Form.Select>
          </div>
          <div>
            <div style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', marginBottom: 4 }}>Due Date</div>
            <Form.Control
              type="date"
              size="sm"
              value={task.due}
              onChange={(e) => onUpdate(task.id, 'due', e.target.value)}
              style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', width: 'auto' }}
            />
          </div>
        </div>

        <div className="mb-3">
          <div style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', marginBottom: 6 }}>Description</div>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => onUpdate(task.id, 'description', description)}
            placeholder="Add a description..."
            style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', resize: 'none', fontSize: '14px' }}
          />
        </div>

        <div>
          <div style={{ color: '#888', fontSize: '11px', textTransform: 'uppercase', marginBottom: 6 }}>Notes</div>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Add notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => onUpdate(task.id, 'notes', notes)}
            style={{ background: '#2a2a2a', border: '1px solid #444', color: 'white', resize: 'none', fontSize: '14px' }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer style={{ background: '#1e1e1e', border: 'none' }}>
        <Button variant="primary" size="sm" onClick={handleClose}>Save & Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function isPastDue(due) {
  if (!due) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueDate = new Date(due + 'T00:00:00')
  return dueDate < today
}

function getDateForDayName(dayName) {
  const today = new Date()
  const targetIndex = DAY_NAMES.indexOf(dayName)
  const diff = targetIndex - today.getDay()
  const target = new Date(today)
  target.setDate(today.getDate() + diff)
  return target.toISOString().split('T')[0]
}

function DashboardComp() {
  const { user } = useAuth()
  const { settings } = useSettings()
  const isDark = settings.theme !== 'Light'
  const [searchParams, setSearchParams] = useSearchParams()
  const dayFilter = searchParams.get('day')
  const [search, setSearch] = useState('')
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskme_tasks')
      return saved ? JSON.parse(saved) : MOCK_TASKS
    } catch {
      return MOCK_TASKS
    }
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('taskme_tasks', JSON.stringify(tasks))
  }, [tasks])

  const updateTask = (id, field, value) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t))
    setSelectedTask((prev) => prev?.id === id ? { ...prev, [field]: value } : prev)
  }

  const addTask = (task) => setTasks((prev) => [...prev, task])
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id))

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || t.status === statusFilter
    const matchPriority = priorityFilter === 'All' || t.priority === priorityFilter
    const matchDay = !dayFilter || t.due === getDateForDayName(dayFilter)
    return matchSearch && matchStatus && matchPriority && matchDay
  })

  const total = tasks.length
  const toDo = tasks.filter((t) => t.status === 'To Do').length
  const inProg = tasks.filter((t) => t.status === 'In Progress').length
  const done = tasks.filter((t) => t.status === 'Done').length

  const formatDue = (due) => {
    if (!due) return '—'
    const d = new Date(due + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="dashboard-page">
    <Container className="dashboard-wrapper">
      {/* Greeting */}
      <div className="mb-4">
        <h4 className="dashboard-greeting-title">
          {getGreeting()}, {user?.name} 👋
        </h4>
        <p className="dashboard-greeting-sub">
          Here's an overview of your tasks today.
        </p>
      </div>

      {/* Day filter banner */}
      {dayFilter && (
        <div className="day-filter-banner mb-3">
          <span>Showing tasks for <strong>{dayFilter}</strong></span>
          <button className="day-filter-clear" onClick={() => setSearchParams({})}>✕ Clear</button>
        </div>
      )}

      {/* Stat cards */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}><StatCard label="Total" value={total} color="#6ea8fe" /></Col>
        <Col xs={6} md={3}><StatCard label="To Do" value={toDo} color="#adb5bd" /></Col>
        <Col xs={6} md={3}><StatCard label="In Progress" value={inProg} color="#ffc107" /></Col>
        <Col xs={6} md={3}><StatCard label="Done" value={done} color="#2ecc71" /></Col>
      </Row>

      {/* Task controls */}
      <div className="controls-row mb-3">
        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>+ Add Task</Button>
        <div className="filter-group">
          <Form.Select
            size="sm"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </Form.Select>
          <Form.Select
            size="sm"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Form.Select>
          <Form.Control
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            size="sm"
          />
        </div>
      </div>

      {/* Task table */}
      <Card bg={isDark ? 'dark' : undefined} className="task-table-card">
        <Table variant={isDark ? 'dark' : undefined} hover responsive className="mb-0 task-table" style={{ fontSize: '14px' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Due</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-secondary py-4">No tasks found.</td>
              </tr>
            ) : (
              filtered.map((task) => (
                <tr key={task.id}>
                  <td
                    style={{ cursor: 'pointer', color: '#6ea8fe' }}
                    onClick={() => setSelectedTask(task)}
                  >
                    <span className="d-flex align-items-center gap-2">
                      {task.title}
                      {task.status !== 'Done' && isPastDue(task.due) && (
                        <span className="past-due-pill">past due</span>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: PRIORITY_COLORS[task.priority],
                      }} />
                      <Form.Select
                        size="sm"
                        value={task.priority}
                        onChange={(e) => updateTask(task.id, 'priority', e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="table-select"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </Form.Select>
                    </div>
                  </td>
                  <td style={{ color: '#aaa' }}>{formatDue(task.due)}</td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={task.status}
                      onChange={(e) => updateTask(task.id, 'status', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="table-select"
                    >
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </Form.Select>
                  </td>
                  <td>
                    <button
                      className="delete-task-btn"
                      onClick={(e) => { e.stopPropagation(); deleteTask(task.id) }}
                      title="Delete task"
                    >✕</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        <div className="table-footer">
          <span>{filtered.length} of {tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
          <span>{done} completed · {inProg} in progress · {toDo} to do</span>
        </div>
      </Card>

      <AddTaskModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addTask}
      />
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={updateTask}
      />
    </Container>
    </div>
  )
}

export default DashboardComp
