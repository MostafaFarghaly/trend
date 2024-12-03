import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import joi from 'joi';

export default function Register() {
    let [errorList, setErrorList] = useState([]);
    let [error, setError] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: '',
    });

    const navigate = useNavigate(); 

    function getUserData(eventInfo) {
        let myUser = { ...user };
        myUser[eventInfo.target.name] = eventInfo.target.value;
        setUser(myUser);
    }


    async function sendRegisterDataToApi() {
        const { data } = await axios.post('http://localhost:3000/signup', user);

        if (data.message === "User registered successfully!") {
            navigate('/login'); 
        } else {
            setIsLoading(false);
            setError(data.message); 
        }
    }
    
    function submitRegisterForm(e) {
        e.preventDefault();
        let validation = validateRegisterForm();
        if (validation.error) {
            setIsLoading(false);
            setErrorList(validation.error.details);
        } else {
            setIsLoading(true);
            sendRegisterDataToApi();
        }
    }

    function validateRegisterForm() {
        let scheme = joi.object({
            first_name: joi.string().min(3).max(30).required(),
            last_name: joi.string().min(3).max(30).required(),
            age: joi.number().min(1).max(120).required(),
            email: joi.string().email({ tlds: { allow: false } }).required(),
            password: joi.string().min(6).required()
        });
        return scheme.validate(user, { abortEarly: false });
    }

    return (
        <>
            {errorList && Array.isArray(errorList) && errorList.length > 0 && errorList.map((err, index) => {
                if (err.context.label === 'password') {
                    return <div key={index} className="alert alert-danger my-2">Password Invalid</div>;
                } else {
                    return <div key={index} className="alert alert-danger my-2">{err.message}</div>;
                }
            })}

            {error && <div className='alert alert-danger'>{error}</div>}

            <form onSubmit={submitRegisterForm}>
                <label htmlFor='first_name'>Firstname :</label>
                <input onChange={getUserData} className=' form-control my-input my-2' type='text' id='first_name' name='first_name' />
                
                <label htmlFor='last_name'>Lastname :</label>
                <input onChange={getUserData} className=' form-control my-input my-2' type='text' id='last_name' name='last_name' />
                
                <label htmlFor='age'>Age :</label>
                <input onChange={getUserData} className=' form-control my-input my-2' type='number' id='age' name='age' />
                
                <label htmlFor='email'>Email :</label>
                <input onChange={getUserData} className=' form-control my-input my-2' type='email' id='email' name='email' />
                
                <label htmlFor='password'>Password :</label>
                <input onChange={getUserData} className=' form-control my-input my-2' type='password' id='password' name='password' />
                
                <button className='btn btn-info' type="submit" disabled={isLoading}>
                    {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
                </button>
            </form>
        </>
    );
}
