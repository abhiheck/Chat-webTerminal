const socket = io('http://localhost:8000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container");
var audio = new Audio('notification.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    audio.play();
    if (position == 'right') {

        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: $(message)`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})
const name1 = prompt("Enter Your Name to Join");

socket.emit('new-user-joined', name1);

socket.on('user-joined', data => {
    append(`${name1} joined the chat`, 'right');
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left')
})
