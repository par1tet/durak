import { io } from 'socket.io-client';
import { SERVER_URL } from '../utils/api/serverUrl';

const URL: string = SERVER_URL('');

export const socket = io(URL, {
    autoConnect: false
});