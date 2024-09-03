import { io } from 'socket.io-client'

const socket = io('ws://heap.crazyfay.com:8203/ws')

export default socket
