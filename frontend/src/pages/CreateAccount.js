import React, { useState,  } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreateAccount() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState(
        {
            username : "",
            email : "",
            password: ""
        }
    )

    const handleChange = (e) =>{
        setFormData(
           { ...formData,
            [e.target.name] : e.target.value}
        )
    }




    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
              const response = await axios.post('http://127.0.0.1:8000/store/create-user/', formData);
              console.log('DONE creating account. Please try again.');
            } catch (error) {
              console.log('Error creating account. Please try again.');
            }
          };

    
  return (
    <div>


    <form onSubmit={handleSubmit} >
        
        <input type="text" name='username' onChange={handleChange} placeholder='Username' />
        <br />
        <input type="email" name='email' onChange={handleChange} placeholder='Email' />

        <br />
        <input type="password" name='password' onChange={handleChange} placeholder='password'/>

        <input type="submit" value="Submit" />
       
        </form>      




    </div>
  )
}

export default CreateAccount