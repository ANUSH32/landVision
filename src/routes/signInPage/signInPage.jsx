import React from 'react';
import { SignIn, useSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './signInPage.css';

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
      <img src="/orbital.png" alt="" className="orbital" />
        <SignIn 
          path="/sign-in" 
          routing="path" 
          signUpUrl="/sign-up" 
          forceRedirectUrl="/questions"
          // redirectUrl="/questions"
        />
      </div>
    </div>
  );
};

export default SignInPage;
