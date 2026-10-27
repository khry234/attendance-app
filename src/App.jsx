import { useMemo, useState } from 'react';

const roomsSeed = [
  {
    id: 'room-101',
    name: 'Room 101',
    color: '#5865F2',
    students: [
      { id: 1, name: 'Ava Thompson', status: 'Present' },
      { id: 2, name: 'Leo Martinez', status: 'Late' },
      { id: 3, name: 'Mila Brown', status: 'Absent' },
      { id: 4, name: 'Noah Davis', status: 'Present' },
      { id: 5, name: 'Zoe Lee', status: 'Present' },
      { id: 6, name: 'Ethan Clark', status: 'Absent' },
    ],
  },
  {
    id: 'room-102',
    name: 'Room 102',
    color: '#3BA55D',
    students: [
      { id: 7, name: 'Harper Scott', status: 'Present' },
      { id: 8, name: 'Lucas Hall', status: 'Present' },
      { id: 9, name: 'Ella Young', status: 'Late' },
      { id: 10, name: 'Jack Adams', status: 'Absent' },
      { id: 11, name: 'Grace Wilson', status: 'Present' },
      { id: 12, name: 'Daniel King', status: 'Present' },
    ],
  },
  {
    id: 'room-103',
    name: 'Room 103',
    color: '#F59E0B',
    students: [
      { id: 13, name: 'Lily Perez', status: 'Present' },
      { id: 14, name: 'Owen Harris', status: 'Present' },
      { id: 15, name: 'Chloe White', status: 'Late' },
      { id: 16, name: 'Nathan Allen', status: 'Present' },
      { id: 17, name: 'Sofia Evans', status: 'Absent' },
      { id: 18, name: 'James Baker', status: 'Present' },
    ],
  },
];

const navItems = ['Home', 'Dashboard', 'Class attendance', 'Class schedule', 'Calendar', 'Reminder'];
const footerItems = ['Attendance streak', 'Archive', 'Trash', 'Help center', 'Settings', 'Language'];
const statusOrder = ['Present', 'Late', 'Absent'];
const statusColors = {
  Present: '#22c55e',
  Late: '#f59e0b',
  Absent: '#ef4444',
};

function App() {
  const [rooms, setRooms] = useState(roomsSeed);
  const [selectedRoomId, setSelectedRoomId] = useState('room-101');
  const [activeNav, setActiveNav] = useState('Home');

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? rooms[0];

  const stats = useMemo(() => {
    const total = selectedRoom.students.length;
    const present = selectedRoom.students.filter((student) => student.status === 'Present').length;
    const late = selectedRoom.students.filter((student) => student.status === 'Late').length;
    const absent = selectedRoom.students.filter((student) => student.status === 'Absent').length;

    return { total, present, late, absent };
  }, [selectedRoom]);

  const handleStatusChange = (studentId, status) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id !== selectedRoomId) return room;

        return {
          ...room,
          students: room.students.map((student) =>
            student.id === studentId ? { ...student, status } : student
          ),
        };
      })
    );
  };

  return (
    <div className="discord-app">
      <div className="server-rail">
        <div className="server-badge active">A</div>
        <div className="server-badge">L</div>
        <div className="server-badge">S</div>
        <div className="server-badge add">+</div>
      </div>

      <aside className="sidebar-panel">
        <div className="sidebar-top">
          <button className="login-btn">Login</button>
          <div className="search-box">
            <span>Search</span>
            <span className="search-key">⌕</span>
          </div>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activeNav === item ? 'selected' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mini-section">
          <div className="section-label">Attendance</div>
          <div className="streak-card">
            <span className="streak-badge">🔥</span>
            <div>
              <strong>Attendance streak</strong>
              <small>12 days</small>
            </div>
          </div>
        </div>

        <div className="footer-menu">
          {footerItems.map((item) => (
            <button key={item} className="footer-item">
              {item}
            </button>
          ))}
        </div>
      </aside>

      <main className="main-panel">
        <header className="main-header">
          <div>
            <p className="eyebrow">Student portal</p>
            <h1>{activeNav === 'Home' ? 'Home' : activeNav}</h1>
          </div>

          <div className="header-actions">
            <button className="ghost-btn">Today</button>
            <button className="primary-btn">Save</button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="metric-card">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="metric-card success">
            <span>Present</span>
            <strong>{stats.present}</strong>
          </div>
          <div className="metric-card warn">
            <span>Late</span>
            <strong>{stats.late}</strong>
          </div>
          <div className="metric-card danger">
            <span>Absent</span>
            <strong>{stats.absent}</strong>
          </div>
        </section>

        <section className="room-tracker">
          <div className="tracker-head">
            <div>
              <p className="eyebrow">Rooms</p>
              <h2>Class attendance</h2>
            </div>
            <button className="new-room-btn">+ New room</button>
          </div>

          <div className="room-list">
            {rooms.map((room) => {
              const presentCount = room.students.filter((s) => s.status === 'Present').length;
              const active = room.id === selectedRoomId;

              return (
                <button
                  key={room.id}
                  className={`room-item ${active ? 'active' : ''}`}
                  onClick={() => setSelectedRoomId(room.id)}
                >
                  <span className="room-color" style={{ background: room.color }} />
                  <div>
                    <strong>{room.name}</strong>
                    <small>{presentCount}/{room.students.length} present</small>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="table-card">
          <div className="table-head">
            <div>
              <p className="eyebrow">Selected room</p>
              <h3>{selectedRoom.name}</h3>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedRoom.students.map((student) => (
                <tr key={student.id}>
                  <td className="student-name">{student.name}</td>
                  <td>
                    <span
                      className="status-pill"
                      style={{
                        background: `${statusColors[student.status]}20`,
                        color: statusColors[student.status],
                      }}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={student.status}
                      onChange={(event) => handleStatusChange(student.id, event.target.value)}
                    >
                      {statusOrder.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
