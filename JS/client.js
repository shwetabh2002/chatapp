const socket = io('http://localhost:8000');

const messageContainer = document.querySelector('.container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');

let username = prompt('What is your name?');
socket.emit('new-user', username);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
