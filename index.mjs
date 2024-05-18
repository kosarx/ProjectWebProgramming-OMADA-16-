import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    console.log('Loading .env file');
    dotenv.config();
}

import { application } from './app.mjs';

const port = process.env.PORT || '3000';

const server = application.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
       console.log('Http server closed.');
    });
 });
 