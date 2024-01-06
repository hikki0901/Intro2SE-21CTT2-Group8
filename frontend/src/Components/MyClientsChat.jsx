import React, { useState, useEffect, useRef } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/myChat.css"
import "../CSS/myClientsChat.css"
import profile_pic from '../image/profile_pic.png'
import video_call from '../image/VideoCall.svg'
import file_upload from '../image/FileUpload.svg'
import sent from '../image/Sent.svg'

const usersData = [
  { id: 1, name: 'Client 1'},
  { id: 2, name: 'Client 2'},
  // Add more users as needed
];

function MyClientsChat() {
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (currentMessage) {
        setMessages([...messages, { type: 'sent', text: currentMessage }]);
        setCurrentMessage('');
    }
  };

  const handleFileUpload = () => {
    if (currentMessage) {
        setMessages([...messages, { type: 'received', text: currentMessage }]);
        setCurrentMessage('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div class="row">
        <div class="col-2">
            <SlideBar userType="dietitian" class="col-3" />
        </div>
        <div class="col-10">
            <div className='my-clients-chat'>
                <div className='user-list'>
                {users.map((user) => (
                    <div className="user-info" key={user.id} onClick={() => handleUserClick(user)}>
                    <img src={profile_pic}></img> 
                    <p>{user.name}</p>
                    </div>
                ))}
                </div>
                {selectedUser && (
                    <div className='chat-container'>
                        <div className='message-container'>
                            <div className='message-header'>
                                <p>Last seen 17h ago</p>
                            </div>
                            <div className='message-list'>
                                <div className='message-received'>
                                    <p>I use the file button to send this</p>
                                </div>
                                <div className='message-sent'>
                                    <p>It's the sent button for me</p>
                                </div>
                                {messages.map((message, index) => (
                                <div className={message.type === 'received' ? 'message-received' : 'message-sent'} key={index}>
                                    <p>{message.text}</p>
                                </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className='message-input'>
                                <input type='image' src={file_upload} id='file-upload' onClick={handleFileUpload}></input>
                                <input type='text' placeholder='Write your message here' id='typing' value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}></input>
                                <input type='image' src={sent} id='sent' onClick={handleSend}></input>
                            </div>
                        </div>
                        <div className='info-container'>
                            <img src={profile_pic}></img>
                            <h2>My Dietitian</h2>
                            <input type='image' src={video_call}></input>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default MyClientsChat;
