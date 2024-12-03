
//     async function sendLoginDataToApi() {
//         let{data} = await axios.post(`http://localhost:3000/login`,user);
//         if(data.massage === "Login successful!") {
//             setIsLoding(false);
//             localStorage.setItem('userToken' , data.token);
//             saveUserData();
//             navigate('/home');
//         } else {
//             setIsLoding(false);
//             setError(data.massage);
//         }
//     }

import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import joi from 'joi';

export default function Login({saveUserData}) {

    let [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();
    let [error, setError] = useState('');
    let [isLoading, setIsLoading ] = useState(false);
    let [user, setUser] = useState({
        email: '',
        password: '',
    });
    function  getUserData(eventInfo){
        let userData = {...user};
        userData[eventInfo.target.name] = eventInfo.target.value;
        setUser(userData);
    }
    async function sendLoginDataToApi() {
        const { data } = await axios.post('http://localhost:3000/login', user);
        if (data.message === "Login successful!") {
            setIsLoading(false);
            localStorage.setItem('userToken' , data.token);
            saveUserData();
            navigate('/home'); 
        } else {
            setIsLoading(false);
            setError(data.message); 
        }
    }
    function submitLoginForm(e){
        e.preventDefault();
        let validation = validateLoginForm();
        if(validation.error){
            setIsLoading(false);
            setErrorList(validation.error.details);
        } else {
            sendLoginDataToApi();
        }
    }
    function validateLoginForm() {
        let scheme = joi.object({
            email: joi.string().email({ tlds: { allow: false } }).required(),
            password: joi.string().min(6).required()
        });
        return scheme.validate(user,{abortEarly:false});
    }
    return <>
    {errorList && Array.isArray(errorList) && errorList.length > 0 && errorList.map((err, index) => {
        if (err.context.label === 'password') {
            return <div key={index} className="alert alert-danger my-2">Password Invalid</div>;
        } else {
            return <div key={index} className="alert alert-danger my-2">{err.message}</div>;
        }
    })}

    {error && <div className='alert alert-danger'>{error}</div>}

    <form onSubmit={submitLoginForm}>
        <label htmlFor='email'>Email :</label>
        <input onChange={getUserData} className=' form-control my-input my-2' type='email' id='email' name='email' />
        
        <label htmlFor='password'>Password :</label>
        <input onChange={getUserData} className=' form-control my-input my-2' type='password' id='password' name='password' />
        
        <button className='btn btn-info' type="submit" disabled={isLoading}>
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
        </button>
    </form>
</>
}
