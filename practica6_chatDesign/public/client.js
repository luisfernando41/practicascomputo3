const socket = io();

const userList = document.querySelector(".usersList");
const inputField = document.querySelector(".inputMessage");
const messageForm = document.querySelector(".formChat");
const history = document.querySelector(".messagehistory");
const typingUser = document.querySelector(".typingUser");

let userName = "";

const newConn = (user) => {
    userName = user || `user${Math.floor(Math.random() * 30000)}`;
    socket.emit('newUser', userName);
    adduserList(userName);
}

const adduserList = (userName) => {
    if(!!document.querySelector(`.${userName}-data`)){return;}
    const dataUser = `
        <li class="clearfix">
            <div class="about ${userName}-data">
                <div class="name">${userName}</div>
                <div class="status">
                    <i class="fa fa-circle online"></i>Online
                </div>
            </div>
        </li>
    `;
    userList.innerHTML+=dataUser;
}

newConn();

const addnewMessage = ({ user, message }) => {
    const time = new Date();
    const formatDate = time.toLocaleString("en-US", {hour: "numeric", minute: "numeric"});

    const receivedMessage=`
        <ul class="m-b-0">
            <li class="clearfix">
                <div class="message-data">
                    <span class="message-data-time">${user} ${formatDate}</span>
                </div>
                <div class="message other-message">${message}</div>
            </li>
        </ul>
    `;
    const myMessage=`
    <ul class="m-b-0">
        <li class="clearfix">
            <div class="message-data">
                <span class="message-data-time">${formatDate}</span>
            </div>
            <div class="message my-message float-right">${message}</div>
        </li>
    </ul>
    `;
    history.innerHTML+=user===userName ? myMessage : receivedMessage;
}

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!inputField.value){
        return;
    }
    socket.emit('chat', {
        message: inputField.value,
        nickname: userName
    });
    inputField.val = "";
});
inputField.addEventListener("keyup", () => {
    socket.emit('typing', {
        isTyping: inputField.value.length > 0,
        nickname: userName
    })
});

//socket 
socket.on('newUser', (data) => {
    data.map((user) => adduserList(user));
});
socket.on('userDisconnected', (data) => {
    document.querySelector(`.${userName}-data`).remove();
});
socket.on('chat', (data) => {
    addnewMessage({user: data.nickname, message: data.message});
});
socket.on('typing', (data) => {
    const { isTyping, nickname } = data;

    if(!isTyping){
        typingUser.innerHTML=""
        return
    }
    typingUser.innerHTML =`<p>${userName} is typing...</p>`
});