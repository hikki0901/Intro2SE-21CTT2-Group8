import React, { useState } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/myChat.css"
import profile_pic from '../image/profile_pic.png'
import video_call from '../image/VideoCall.svg'
import file_upload from '../image/FileUpload.svg'
import sent from '../image/Sent.svg'

function Support(){
    return(
        <div class="row">
        <div class="col-2">
            <SlideBar class="col-3" />
        </div>
        <div class="col-10">
            <div className='chat-container'>
                <div className='message-container'>
                   <div className='message-header'>
                        <p>Last seen 17h ago</p>
                   </div>
                   <div className='message-list'>
                        <div className='message-received'>
                            <p>How are you doing?</p>
                        </div>
                        <div className='message-sent'>
                            <p>Everything's been great so far</p>
                        </div>
                        <div className='message-sent'>
                            <p>I keep practicing everyday</p>
                        </div>
                   </div>
                   <div className='message-input'>
                        <input type='image' src={file_upload} id='file-upload'></input>
                        <input type='text' placeholder='Write your message here' id='typing'></input>
                        <input type='image' src={sent} id='sent'></input>
                   </div>
                </div>
                <div className='info-container'>
                    <h2>Support Team</h2>
                </div>
            </div>
        </div>       
    </div>
    );
}

export default Support