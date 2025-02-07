const serverUrl = 'http://localhost:5050/chat'; // 使用正确的服务器URL

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
document.getElementById('chat-input').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

window.addEventListener('load', function() {
    addMessage("您好，我是你的个人助手小薇，有什么可以帮您的吗？", 'bot');
});

function sendMessage() {
    const userInput = document.getElementById('chat-input').value;
    if (userInput) {
        addMessage(userInput, 'user');
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput, uid: 1, session_id: 1, is_room: "True" })
        })
        .then(response => response.text())
        .then(response => {
            addMessage(response, 'bot');
        })
        .catch(error => console.error('Error:', error));
    }
    document.getElementById('chat-input').value = '';
    document.getElementById('chat-input').style.height = 'auto'; // 重置高度
}

function addMessage(text, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', `${sender}-container`);
    
    if (sender === 'bot') {
        const botIcon = document.createElement('img');
        botIcon.src = 'img/xw.png'; // 请替换为你实际使用的机器人图标路径
        botIcon.alt = 'Bot';
        botIcon.width = 20; // 调整图标大小
        botIcon.height = 20; // 调整图标大小
        botIcon.style.flexShrink = 0; // 确保图标不缩小
        messageContainer.appendChild(botIcon);
    }

    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    messageElement.classList.add('message', sender);
    messageContainer.appendChild(messageElement);

    document.getElementById('chat-box').appendChild(messageContainer);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}
