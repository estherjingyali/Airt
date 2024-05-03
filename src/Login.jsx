import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (!isValid(username)) {
            setErrorMessage('This username is invalid. Please try another one.');
            setUsername('');
            return;
        }

        if (username.toLowerCase() === 'dog') {
            setErrorMessage('This username is invalid. Please try another one.');
            setUsername('');
            return;
        } else {
            onLogin(username);
            setUsername('');
            setErrorMessage('');
        }
    };

    const isValid = (username) => {
        return /^[A-Za-z0-9]{4,20}$/.test(username);
    };

    return (
        <div className="login-container">
            <h2>AI-generated Art Gallery</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <label>
                    <span>username  </span>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    disabled={!username.trim()}
                    className="login-button"
                >
                    sign in
                </button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
    
};

export default Login;