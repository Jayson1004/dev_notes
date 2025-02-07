import { serverHost } from './share.js';

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
    toggleSendButton();
});

window.addEventListener('load', function() {
    loadMessages();
    const chatBox = document.getElementById('chat-box');
    if (!chatBox.innerHTML) {
        addMessage("您好，我是你的个人助手小薇，有什么可以帮您的吗？", 'bot');
    }
    toggleSendButton();
});

function sendMessage() {
    const userInput = document.getElementById('chat-input').value;
    if (userInput.trim() !== '') {
        addMessage(userInput, 'user');
        fetch(`${serverHost}/chat`, {
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
    toggleSendButton();
}

function addMessage(content, sender, isAudio = false) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', `${sender}-container`);

    if (sender === 'bot') {
        const botIcon = document.createElement('img');
        botIcon.src = 'img/xw.png'; // Replace with your actual bot icon path
        botIcon.alt = 'Bot';
        botIcon.width = 25; // Adjust icon size
        botIcon.height = 25; // Adjust icon size
        botIcon.style.flexShrink = 0; // Ensure icon does not shrink
        messageContainer.appendChild(botIcon);
    }

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    if (isAudio) {
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = content;
        messageElement.appendChild(audioElement);
    } else {
        messageElement.textContent = content;
    }

    messageContainer.appendChild(messageElement);
    document.getElementById('chat-box').appendChild(messageContainer);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    saveMessages();
}

function toggleSendButton() {
    const userInput = document.getElementById('chat-input').value;
    const sendButton = document.getElementById('send-button');
    if (userInput.trim() !== '') {
        sendButton.classList.add('active');
    } else {
        sendButton.classList.remove('active');
    }
}

function saveMessages() {
    const chatBox = document.getElementById('chat-box');
    localStorage.setItem('chatMessages', chatBox.innerHTML);
}

function loadMessages() {
    const chatBox = document.getElementById('chat-box');
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        chatBox.innerHTML = savedMessages;
    }
}

//点击 Toggle Speech Recognition 开始录音，再次点击停止录音，将录音内容展示在聊天框中，支持点击语音进行播放，同时发送到后台服务器进行处理，后台服务器处理接口为http://3.104.117.251:5050/asr，请求方式为POST，请求参数为音频文件，返回结果为服务器生成的语音，需要将服务器生成的语音内容显示在对话框中，支持点击语音进行播放。
let isRecording = false;
let mediaRecorder;
let recordedChunks = [];

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then(function(stream) {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = function(e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };

    document.getElementById('toggle-recognition').addEventListener('click', function() {
        if (isRecording) {
            mediaRecorder.stop();
            isRecording = false;
            this.textContent = 'Voice Input';
        } else {
            mediaRecorder.start();
            isRecording = true;
            this.textContent = 'Stop Recording';
        }
    });

    mediaRecorder.onstop = function() {
        let audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        addMessage(audioUrl, 'user', true);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'user_recording.wav');
        sendAudioToServer(formData);
        recordedChunks = []; // Clear the recorded chunks
    };
});

function sendAudioToServer(audioData) {
    fetch(`${serverHost}/audioChat`, {
        method: 'POST',
        body: audioData
    })
    .then(response => response.blob())
    .then(response => {
        const audioUrl = URL.createObjectURL(response);
        addMessage(audioUrl, 'bot', true);
    })
    .catch(error => console.error('Error:', error));
}
