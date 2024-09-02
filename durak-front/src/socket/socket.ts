import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL: string = 'http://localhost:5001';

export const socket = io(URL, {
    autoConnect: false
});