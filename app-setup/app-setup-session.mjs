import session from 'express-session';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let appSession;

const sessionName = process.env.SESSION_NAME;
const sessionSecret = process.env.SESSION_SECRET;
const sessionLifetime = Number(process.env.SESSION_LIFETIME);

let sessionConf = {
  name: sessionName,
  secret: sessionSecret,
  cookie: { maxAge: sessionLifetime },
  resave: false,
  saveUninitialized: false,
};

appSession = session(sessionConf);


export default appSession;
