import express from 'express';
import cookieParser from 'cookie-parser';
import * as uuid from 'uuid';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

//sessions
const sessions = {};

function addSession(username) {
  const sid = uuid.v4();
  sessions[sid] = {
    username,
  };
  return sid;
};

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

//users
const users = {};

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]{4,20}$/);
  return isValid;
}

function getUserData(username) {
  return users[username];
}

function addUserData(username, userData) {
  users[username] = userData;
}


//api/session
app.get('/api/user', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';

    if (username) {
        const userData = getUserData(username);
        res.json(userData);
    } else {
        res.status(401).json({ error: 'not-authenticated' });
    }
});


app.post('/api/session', (req, res) => {
    const { username } = req.body;
  
    if(!isValid(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
  
    const sid = addSession(username);
    const existingUserData = getUserData(username);
  
    if(!existingUserData) {
      addUserData(username);
    }
    res.cookie('sid', sid);
    res.json(getUserData(username));
  });


app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
  
    if(username) {
      deleteSession(sid);
    }
    res.json({ success: true });
  });


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));