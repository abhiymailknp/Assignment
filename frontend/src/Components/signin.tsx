import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'

export interface SignInFormValues {
  email: string;
  password: string;
}



const SigninForm: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormValues>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data = JSON.stringify(formData);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3001/signin',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="w-75 p-4 border rounded bg-light">
      <h2 className="mb-4">Sign In</h2>
      <div className='mb-3'>
      <label className='form-label'>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} className='form-control'/>
      </label>
      </div>
      <div className='mb-3'>
      <label className='form-label'>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} className='form-control'/>
      </label>
      </div>
      
      <div className="d-flex">
      <button type="submit" className="btn btn-primary">Sign In</button>
      </div>
    </form>
    </div>
  );
};

export default SigninForm;
