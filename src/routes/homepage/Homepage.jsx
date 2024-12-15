import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
  
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate("/questions");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>LandVision</h1>
        <h2>Unveil hidden potential in every barren expanse.</h2>
        <h3>
        At LandVision, we unveil hidden potential in every barren expanse, turning overlooked spaces into dynamic opportunities for growth and innovation.
        </h3>
        <div className="links">
        <button onClick={handleGetStartedClick}>Get Started</button>
        </div>
        </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
  sequence={[
    "User: I have unused land. Can you help?",
    2000,
    () => {
      setTypingStatus("LandVision");
    },
    "LandVision: Yes, we can help you use it profitably.",
    2000,
    () => {
      setTypingStatus("User");
    },
    "User: What can I do with it?",
    2000,
    () => {
      setTypingStatus("LandVision");
    },
    "LandVision: You can farm, lease, or start a project.",
    2000,
    () => {
      setTypingStatus("User");
    },
  ]}
  wrapper="span"
  repeat={Infinity}
  cursor={true}
  omitDeletionAnimation={true}
/>

          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
