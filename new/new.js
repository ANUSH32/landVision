import React, { useState } from 'react';
import { ArrowRight, Building2, Trees, Briefcase, Dumbbell, ArrowLeft } from 'lucide-react';

const SpacePlanningWizard = () => {
  const [currentStep, setCurrentStep] = useState('questionnaire');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [responses, setResponses] = useState({
    spaceSize: '',
    budget: '',
    purpose: '',
    timeline: '',
    location: '',
    accessibility: '',
    targetAudience: ''
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 'spaceSize',
      label: 'What is the approximate size of your vacant space?',
      options: ['Less than 1000 sq ft', '1000-2500 sq ft', '2500-5000 sq ft', 'More than 5000 sq ft']
    },
    {
      id: 'budget',
      label: 'What is your budget range for the project?',
      options: ['$25,000-$50,000', '$50,000-$100,000', '$100,000-$200,000', '$200,000+']
    },
    {
      id: 'purpose',
      label: 'What is the primary purpose you envision for this space?',
      options: ['Commercial', 'Community/Social', 'Educational', 'Entertainment', 'Wellness', 'Mixed-use']
    }
  ];

  const ideas = [
    {
      title: 'Community Garden & Farmer\'s Market',
      description: 'Transform the space into a vibrant community garden with raised beds, seating areas, and a weekend farmer\'s market.',
      icon: Trees,
      suitableFor: 'Outdoor spaces, medium to large areas',
      timeframe: '3-6 months',
      estimatedCost: '$30,000 - $75,000',
      detailedInfo: {
        overview: 'A community garden and farmer\'s market combination creates a sustainable, community-focused space.',
        keyFeatures: [
          'Multiple raised garden beds',
          'Market stalls',
          'Common areas'
        ]
      }
    },
    {
      title: 'Coworking & Creative Studio',
      description: 'A flexible workspace combining hot desks, private offices, and creative studios for the modern professional.',
      icon: Briefcase,
      suitableFor: 'Indoor spaces, adaptable layouts',
      timeframe: '2-4 months',
      estimatedCost: '$50,000 - $150,000',
      detailedInfo: {
        overview: 'Modern coworking space designed for freelancers and remote workers.',
        keyFeatures: [
          'Hot desk area',
          'Private offices',
          'Meeting rooms'
        ]
      }
    },
    {
      title: 'Wellness Center & Spa',
      description: 'A holistic wellness center offering fitness classes, meditation spaces, and spa treatments.',
      icon: Dumbbell,
      suitableFor: 'Indoor spaces with good ventilation',
      timeframe: '4-8 months',
      estimatedCost: '$100,000 - $200,000',
      detailedInfo: {
        overview: 'Comprehensive wellness facility combining fitness, meditation, and spa services.',
        keyFeatures: [
          'Yoga studio',
          'Meditation rooms',
          'Spa facilities'
        ]
      }
    }
  ];

  const handleInputChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('ideas');
    }
  };

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
    setCurrentStep('detail');
  };

  const QuestionnaireView = () => (
    <div className="w-full max-w-2xl mx-auto transform transition-all duration-500 hover:shadow-xl bg-white rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <Building2 className="h-6 w-6" />
          Space Planning Questionnaire
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            {questions[currentQuestion].label}
          </label>
          <div className="grid grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleInputChange(questions[currentQuestion].id, option)}
                className={`p-4 text-left rounded-lg transition-colors duration-300 ${
                  responses[questions[currentQuestion].id] === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
          disabled={!responses[questions[currentQuestion].id]}
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Recommendations'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const IdeasView = () => (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Recommended Ideas for Your Space</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea.title}
            onClick={() => handleIdeaClick(idea)}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <div className="border-b bg-gray-50 p-4">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                <idea.icon className="h-6 w-6 text-blue-600" />
                {idea.title}
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-gray-700">{idea.description}</p>
              <div className="space-y-2 text-sm">
                <p><strong>Suitable for:</strong> {idea.suitableFor}</p>
                <p><strong>Timeframe:</strong> {idea.timeframe}</p>
                <p><strong>Estimated Cost:</strong> {idea.estimatedCost}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const DetailView = () => (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <button
        onClick={() => setCurrentStep('ideas')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Ideas
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <selectedIdea.icon className="h-6 w-6" />
            {selectedIdea.title}
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold">Overview</h3>
            <p>{selectedIdea.detailedInfo.overview}</p>

            <h3 className="text-xl font-semibold mt-6">Key Features</h3>
            <ul>
              {selectedIdea.detailedInfo.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {currentStep === 'questionnaire' && <QuestionnaireView />}
      {currentStep === 'ideas' && <IdeasView />}
      {currentStep === 'detail' && <DetailView />}
    </div>
  );
};

export default SpacePlanningWizard;
