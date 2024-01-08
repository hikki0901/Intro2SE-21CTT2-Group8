import React, { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import SlideBar from "./SlideBar";
import "../CSS/myClients.css"
import UserCard from './UserCard';
import search from '../image/search.png'
import profile_pic from '../image/profile_pic.png';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const usersData = [];

function MyClients(){

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(usersData);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [client, SetClient] = useState([]);
  
    const handleUserClick = (user) => {
      setSelectedUser(user);
    };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNavigate = (path, dataToSend) => {
        navigate(path, { state: { data: dataToSend } });
    };

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

    function addProfiles(client) {
        usersData.length = 0;
        // Iterate through names and degrees to create and add profiles
        for (let i = 0; i < client.length; i++) {
          let newClient = {
            
            id: client[i].id, // Generate a new ID (you can adjust this logic)
            name: client[i].firstName + " " + client[i].lastName,
            progress: client[i].target + "%",
            email: client[i].email,
            DOB: (new Date(client[i].DOB)).getDate() + '/' + ((new Date(client[i].DOB)).getMonth()+1) + '/' + (new Date(client[i].DOB)).getFullYear(),
            gender: client[i].gender ? client[i].gender.charAt(0).toUpperCase() + client[i].gender.slice(1) : '',
            height: client[i].height ? client[i].height + 'cm' : '',
            weight: client[i].weight ? client[i].weight + 'kg' : '',
            BMI: (Number(client[i].weight)/((Number(client[i].height)/100) * (Number(client[i].height)/100))).toFixed(2)
          };
      
          usersData.push(newClient);
        }
    
    }

    useEffect(() => {
        var email = window.localStorage.getItem("email");
        const fetchClient = async () => {
        try {
            const response = await axios.post("http://localhost:4000/dietitian/viewclient", {
            email, });
            SetClient(response.data.progress);
            
        } catch (error) {
            console.error("Error fetching premium membership:", error);
            // Handle the error as needed
        } finally {
            setLoading(false);
        }
        };
        
        fetchClient();
        
    }, []);

    useEffect(() => {
        addProfiles( client );
    }, [client]);
    if (loading) {
        // Render loading state or placeholder
        return (
            <div class="home-style row">
              <div class="col-2">
                <SlideBar  userType="dietitian" class="col-3" />
              </div>
              <div class ="loading col-10">
                <ClipLoader
                color= "#36d7b7"
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"/>
              </div>
          </div>
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
                                    {/* <p>01/01/2000</p> */}
                                    <p>{selectedUser.DOB}</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>Gender:</p>
                                    <p>{selectedUser.gender}</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>Height:</p>
                                    <p>{selectedUser.height}</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>Weight:</p>
                                    <p>{selectedUser.weight}</p>
                                </div>
                                <div className='client-detail-section'>
                                    <p>BMI:</p>
                                    <p>{selectedUser.BMI}</p>
                                </div>
                            </div>
                            <div className='button-list'>
                                <button onClick={() => handleNavigate(`/dietitian/meal-plan/${selectedUser.id}`, selectedUser.email)}>Plan</button>
                                <button onClick={() => handleNavigate(`/dietitian/diet-diary/${selectedUser.id}`, selectedUser.email)}>Diary</button>
                                <button onClick={() => handleNavigate(`/dietitian/analytics/${selectedUser.id}`, selectedUser.email)}>Analytics</button>
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