
import {  Link, Routes, Route ,BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import React, { useState } from 'react'

 import SignupForm,{SignUpFormValues} from './Components/signup';
 import SigninForm,{SignInFormValues} from './Components/signin';
 

const App = () => {
  const [users, setUsers] = useState<SignUpFormValues[]>([]);

  const handleSignup = (formData: SignUpFormValues) => {
    setUsers([...users, formData]);
  };

  const handleSignin = (formData: SignInFormValues) => {
    console.log('User Signed In:', formData);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignupForm handleSignup={handleSignup} />} />
          <Route path="/signin" element={<SigninForm handleSignin={handleSignin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;