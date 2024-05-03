import { useState } from 'react'
import './App.css'
import Login from './Login'
import Nav from './Nav'

function App() {
  const [user, setUser] = useState(null)

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <h1>A i r t</h1>
      {user ? (
        <Nav username={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}


export default App;
