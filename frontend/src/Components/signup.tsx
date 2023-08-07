import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber : string;
  password: string;
}

export interface SignupFormProps {
  handleSignup: (formData: SignUpFormValues) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup }) => {
  const [formData, setFormData] = useState<SignUpFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber : '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignup(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
