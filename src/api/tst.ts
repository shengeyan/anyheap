import socket from '@/api/index'

export const tst = () => {
    console.log('触发')
    socket.on('tst', (socket) => {
        socket.emit('resp', 'resquest')
    })
}

socket.on('resp', (data) => {
  console.log('Received response:', data);
});
