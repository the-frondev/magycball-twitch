const ballResponses = [
  "Sí",
  "No",
  "Tal vez",
  "No lo sé",
  "Inténtalo más tarde",
  "No lo entiendo",
  "No lo creo",
  "Siiiiii",
  "Claro que sí",
  "Clamaramente"
];

let cooldown = false;

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
    debug: true
  },
  channels: ["uxanarangel"]
});

client.connect();

client.on('connected', () => {
  console.log('Conección exitosa a Twitch');
});

client.on('message', (channel, user, message, self) => {
  if (self) return;
  if (cooldown === false && message.toLowerCase().split(' ')[0] === '!ball') {
    if (message.split(' ').length < 2) return;
    cooldown = true;
    const response = ballResponses[Math.floor(Math.random() * ballResponses.length)];
    const answer = document.querySelector('#answer');
    const name = document.querySelector('#name');
    const question = document.querySelector('#question');
    const ball = document.querySelector('.ball');
    answer.textContent = response;
    name.textContent = user.username;
    name.style.color = user.color;
    name.style.maxHeight = name.scrollHeight + 'px';
    question.textContent = message.replace('!ball', '');
    question.style.maxHeight = question.scrollHeight + 'px';
    ball.classList.add('response');
    setTimeout(() => {
      ball.classList.remove('response');
      answer.textContent = '';
      name.textContent = '';
      question.textContent = '';
      cooldown = false;
    }, 9000);
  }
})
