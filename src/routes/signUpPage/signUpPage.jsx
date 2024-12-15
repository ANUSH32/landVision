import React from 'react';
import { SignUp, useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './signUpPage.css';

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-wrapper">
        <img src="/orbital.png" alt="" className="orbital" />
        <SignUp 
          path="/sign-up" 
          routing="path" 
          signInUrl="/sign-in" 
          forceRedirectUrl="/questions"
          // redirectUrl="/questions"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
