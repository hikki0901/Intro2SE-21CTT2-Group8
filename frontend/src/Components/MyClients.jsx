import React, { useState, useEffect, useRef } from 'react';
import SlideBar from "./SlideBar";
import "../CSS/myClients.css"
import UserCard from './UserCard';
import search from '../image/search.png'
import profile_pic from '../image/profile_pic.png'

const usersData = [
    { id: 1, name: 'User 1', progress:'75%' },
    { id: 2, name: 'User 2', progress:'55%' },
    { id: 3, name: 'User 3', progress:'45%' },
    { id: 4, name: 'User 4', progress:'15%' },
    // Add more users as needed
  ];

function MyClients(){

    const [users, setUsers] = useState(usersData);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleUserClick = (user) => {
      setSelectedUser(user);
    };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function createUserCard(userItem){
        return(
            <UserCard
                key={userItem.id}
                userType='user'
                name={userItem.name}
                image_link={profile_pic}
                progress={userItem.progress}
                onClick={() => handleUserClick(userItem)}
            />
        );
    }

    return(
        <div class="row">
        <div class="col-2">
            <SlideBar userType="dietitian" class="col-3" />
        </div>
        <div class="col-10">
            <div className='my-clients'>
                <div className="row">
                    <div class="col-6">
                        <div className='heading'>
                            <h2>Your users</h2>
                        </div>
                        <div className='search'>
                            <img src={search}></img>
                            <input id='search-input' type="search" placeholder="Search" value={searchTerm} onChange={handleSearchChange} /> 
                        </div>
                        <div className='user-list-container'>
                            {filteredUsers.map((createUserCard))}                            
                        </div>      
                    </div>
                    <div class="col-6">
                        {selectedUser && 
                        <div className='client-info-container'>
                            <div className='client-info'>
                                <img src={profile_pic}></img>
                                <div className='client-info-content'>
                                    <p>Premium</p>
                                    <h2>{selectedUser.name}</h2>
                                </div>
                            </div>
                            <div className='client-details'>
                                <div className='client-detail-section'>
                                    <p>Date of birth:</p>
                                    <p>01/01/2000</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>Gender:</p>
                                    <p>Female</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>Height:</p>
                                    <p>200cm</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>Weight:</p>
                                    <p>100kg</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>BMI:</p>
                                    <p>25</p>
                                </div>
                            </div>
                            <div className='button-list'>
                                <button>Plan</button>
                                <button>Diary</button>
                                <button>Analytics</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>                
            </div>
        </div>
        <div class="verticalLine1" />
    </div>
    );
}

export default MyClients