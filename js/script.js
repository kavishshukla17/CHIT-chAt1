const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const naam = prompt("Enter you name to join");
socket.emit('new-user-joined', naam);

socket.on('user-joined', naam =>{
    append(`${naam} joined the chat`, 'left')
})

socket.on('recieve', data =>{
    append(`${data.naam}:${data.message}`,'left')
})

socket.on('left', naam =>{
    append(`${naam} left the chat`,'left')
})