import React from 'react'
import '../CSS/profile.css'

const Profile = ({src, name, role}) => {
  return (
    <div className='profile'>
        <div className='profile__container'>
            <div className='profile__image'>
                <img src={src} alt='name' />
            </div>
            <div className='profile__content'>
                <h1>{name}</h1>
                <p>{role}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile