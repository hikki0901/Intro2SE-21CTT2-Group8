import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../CSS/settings.css"
import profile_pic from '../image/profile_pic.png'
import add_button from '../image/add_button.png'

const Settings = () => {

  const [currentPic, setCurrentPic] = useState(profile_pic);

  const navigate = useNavigate();

  const handleEdit = (event) => {
    setCurrentPic(URL.createObjectURL(event.target.files[0]));
  };

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    height: '',
    weight: '',
    DOB: '',
    gender: '',
    phone: '',
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [DOB, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [BMI, setBMI] = useState('');

  const getInfo = async (event) => {
    try {
        var email = window.localStorage.getItem("email");
        const response = await axios.post("http://localhost:4000/auth/info", {
            email,
        });

        const formattedDOB = response.data.DOB ? new Date(response.data.DOB).toISOString().split('T')[0] : '';
        if (!response.data.height || !response.data.weight) {
            setBMI("");
        } else {
            const tmpBMI = response.data.weight/((response.data.height/100) * (response.data.height/100))
            setBMI(tmpBMI.toFixed(1));
        }
        setInitialValues({
            ...response.data,
            DOB: formattedDOB,
        });

        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setDob(formattedDOB);
        setPhone(response.data.phone);
        setEmail(email);
        setHeight(response.data.height);
        setWeight(response.data.weight);
        setGender(response.data.gender);
        
    } catch (err) {
        console.error("Error during login request:", err);
        alert("Error")
    }
  };

  useEffect(() => {
    // Call the getInfo function when the component is mounted
    getInfo();
  }, []); 

  const handleCancel = () => {
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setDob(initialValues.DOB);
    setPhone(initialValues.phone);
    setEmail(initialValues.email);
    if (!initialValues.height) {
        setHeight("");
    } else { setHeight(initialValues.height) };

    if (!initialValues.weight) {
        setWeight("");
    } else { setWeight(initialValues.weight) };

    if (!initialValues.gender) {
        setGender("");
    } else { setGender(initialValues.gender) };

    setPassword("");
    setConfirmPassword("");
  };

  const onSubmit = async (event) => {
    event.preventDefault();

      if (!firstName) {
        alert ("Please enter your first name");
        return;
      } else if (!lastName) {
        alert ("Please enter your last name");
        return;
      } else if (!DOB) {
        alert ("Please enter your birthday");
        return;
      } else if (!phone) {
        alert ("Please enter your phone number");
        return;
      }

      try {
        const response = await axios.post("http://localhost:4000/auth/settings", {
            firstName, lastName, height, weight, DOB, gender, phone, email, password, confirmPassword,
        });

        if (response.data.success) {
          alert(response.data.message);
          navigate("/home");
        } else {
          alert(response.data.message);
        }
        
      } catch (err) {
        alert(err);
        console.error("Error during register request:", err);
      }
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
                        <input type="date" value={DOB} onChange={e => setDob(e.target.value)} />
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
                        <input type="number" value = {BMI} readOnly
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
                        <input type="email" value={email} readOnly
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
                    <input type="submit" value="Save" onClick={onSubmit} />
                </div>
        </div>
    </div>
  )
}

export default Settings