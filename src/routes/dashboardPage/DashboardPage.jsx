import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./dashboardPage.css";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { profilePic = '', topic = '', answers = [] } = location.state || {};

  const [hasPromptBeenSent, setHasPromptBeenSent] = useState(false);

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  useEffect(() => {
    if (topic && answers.length > 0 && !hasPromptBeenSent) {
      const text = `Topic: ${topic}\nUser Answers: ${answers.join(', ')}`;
      
      // Trigger the mutation to start the prompt
      mutation.mutate(text);
      setHasPromptBeenSent(true);
    }
  }, [topic, answers, mutation, hasPromptBeenSent]);

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <h1>LandVision AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Create Chat" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Analyze Images" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="Help with Code" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      
      <div className="formContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Ask me anything..."
            defaultValue={`Topic: ${topic}`}
            readOnly
          />
          <button type="submit">
            <img src="/arrow.png" alt="Submit" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
