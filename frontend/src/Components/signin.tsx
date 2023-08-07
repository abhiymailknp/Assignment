import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SigninFormProps {
  handleSignin: (formData: SignInFormValues) => void;
}

const SigninForm: React.FC<SigninFormProps> = ({ handleSignin }) => {
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
    handleSignin(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SigninForm;
