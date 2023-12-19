import React, { useState } from 'react';
import "../CSS/settings.css"
import profile_pic from '../image/profile_pic.png'
import add_button from '../image/add_button.png'

const Settings = () => {

  const [currentPic, setCurrentPic] = useState(profile_pic);

  const handleEdit = (event) => {
    setCurrentPic(URL.createObjectURL(event.target.files[0]));
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log(`Updated settings: ${firstName}, ${lastName}, ${dob}, ${phone}, ${email}, 
    ${height}, ${weight}, ${gender}, ${bmi}, ${password}`);
  };

  const handleCancel = () => {
    setFirstName('');
    setLastName('');
    setDob('');
    setPhone('');
    setEmail('');
    setHeight('');
    setWeight('');
    setGender('');
    setBmi('');
    setPassword('');
    setConfirmPassword('');
  };
  
  return (
    <div className='settings'>
        <div className='avatar'>
            <img src={currentPic}/>
            <label htmlFor="fileUpload">
                <img src={add_button} id='add'/>
            </label>
            <input type="file" id="fileUpload" accept="image/*" onChange={handleEdit}/>
        </div>
        <div className='heading'>
            <h1>Adjust your info</h1>
        </div>
        <div className='info'>
            <form onSubmit={handleSubmit}>
                <div className='control'>
                    <label className='name'>
                        First name:
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} 
                        placeholder='First name'/>
                    </label>
                    <label className='name'>
                        Last name:
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} 
                        placeholder='Last name'/>
                    </label>
                    <label className='body'>
                        Height (cm):
                        <input type="number" step={0.1} value={height} onChange={e => setHeight(e.target.value)} 
                        placeholder='Height'/>
                    </label>
                    <label className='body'>
                        Weight (kg):
                        <input type="number" step={0.1} value={weight} onChange={e => setWeight(e.target.value)} 
                        placeholder='Weight'/>
                    </label>                    
                    <label className='additional'>
                        Date of birth:
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
                    </label>
                    <label className='body'>
                        Gender:
                        <select value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </label>
                    <label className='body'>
                        BMI:
                        <input type="number" step={0.1} value={bmi} onChange={e => setBmi(e.target.value)} 
                        placeholder='BMI'/>
                    </label>
                    <label className='additional'>
                        Phone:
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} 
                        placeholder='Phone'/>
                    </label>
                    <label className='pass'>
                        New password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} 
                        placeholder='New password'/>
                    </label>
                    <label className='additional'>
                        Email:
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} 
                        placeholder='Email'/>
                    </label>
                    <label className='pass'>
                        Confirm new password:
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} 
                        placeholder='Confirm new password'/>
                    </label>
                </div>
                <div className='choice'>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <input type="submit" value="Save" />
                </div>
            </form>  
        </div>
    </div>
  )
}

export default Settings