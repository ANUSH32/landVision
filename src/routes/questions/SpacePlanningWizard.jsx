import React, { useState } from 'react';
import { ArrowRight, Building2, Trees, Briefcase, Dumbbell, ArrowLeft, CheckCircle } from 'lucide-react';
import './SpacePlanningWizard.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/DashboardButton.css';
import '../../styles/NavigationButton.css';
import { useMutation } from '@tanstack/react-query';
import IframeModal from '../../components/IframeModal/IframeModal';


const SpacePlanningWizard = () => {
  const navigate = useNavigate();
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questions = [
    {
      id: 'spaceSize',
      label: 'What is the approximate size of your vacant space?',
      options: ['Less than 1000 sq ft', '1000-2500 sq ft', '2500-5000 sq ft', 'More than 5000 sq ft']
    },
    {
      id: 'budget',
      label: 'What is your budget range for the project?',
      options: [
        '₹5-10 Lakhs',
        '₹10-20 Lakhs',
        '₹20-40 Lakhs',
        '₹40+ Lakhs'
      ]
    },
    {
      id: 'purpose',
      label: 'What is the primary purpose you envision for this space?',
      options: ['Commercial', 'Community/Social', 'Educational', 'Entertainment', 'Wellness', 'Mixed-use']
    },
    {
      id: 'timeline',
      label: 'What is your desired timeline for completing this project?',
      options: ['Less than 6 months', '6-12 months', '12-18 months', 'No specific timeline']
    },
    {
      id: 'designStyle',
      label: 'What design style are you looking to achieve?',
      options: ['Modern', 'Traditional', 'Industrial', 'Minimalist', 'Rustic', 'Eclectic']
    }
  ];

  const ideas = [
    {
      title: 'Community Garden & Farmer\'s Market',
      description: 'Transform the space into a vibrant community garden with raised beds, seating areas, and a weekend farmer\'s market.',
      icon: Trees,
      suitableFor: 'Medium to large outdoor spaces',
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
      title: 'Small Business Incubator',
      description: 'A compact workspace for startups and small businesses with shared resources.',
      icon: Briefcase,
      suitableFor: 'Small to medium indoor spaces',
      timeframe: '2-4 months',
      estimatedCost: '$40,000 - $90,000',
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
      title: 'Wellness Studio',
      description: 'A boutique wellness space for yoga, meditation, and personal training.',
      icon: Dumbbell,
      suitableFor: 'Small indoor spaces with good ventilation',
      timeframe: '2-4 months',
      estimatedCost: '$25,000 - $50,000',
      detailedInfo: {
        overview: 'Comprehensive wellness facility combining fitness, meditation, and spa services.',
        keyFeatures: [
          'Yoga studio',
          'Meditation rooms',
          'Spa facilities'
        ]
      }
    },
    {
      title: 'Maker Space & Fabrication Lab',
      description: 'An open workshop with specialized equipment for woodworking, metalworking, electronics, and creative projects.',
      icon: 'Wrench',
      suitableFor: 'Large indoor spaces with high ceilings',
      timeframe: '4-8 months',
      estimatedCost: '$75,000 - $150,000',
      detailedInfo: {
        overview: 'A collaborative workspace for hobbyists, entrepreneurs, and small-scale manufacturers.',
        keyFeatures: [
          'Wood and metal workshops',
          '3D printing & CNC equipment',
          'Electronics workstations'
        ]
      }
    },
    {
      title: 'Culinary Incubator & Teaching Kitchen',
      description: 'A shared commercial kitchen space with classrooms for culinary education and food business support.',
      icon: 'Utensils',
      suitableFor: 'Medium to large indoor spaces with commercial-grade kitchen equipment',
      timeframe: '4-8 months',
      estimatedCost: '$100,000 - $250,000',
      detailedInfo: {
        overview: 'Empowering food entrepreneurs and teaching culinary skills to the community.',
        keyFeatures: [
          'Commercial-grade kitchen',
          'Culinary classrooms',
          'Food business support'
        ]
      }
    },
    {
      title: 'Children Discovery Center',
      description: 'An interactive learning environment with hands-on exhibits and creative play spaces for kids.',
      icon: 'Cubes',
      suitableFor: 'Medium to large indoor spaces with open layouts',
      timeframe: '6-12 months',
      estimatedCost: '$150,000 - $300,000',
      detailedInfo: {
        overview: 'Fostering curiosity, learning, and exploration through interactive exhibits.',
        keyFeatures: [
          'STEM-focused exhibits',
          'Arts and crafts areas',
          'Indoor play structures'
        ]
      }
    },
    {
      title: 'Performing Arts Center',
      description: 'A multipurpose facility with a stage, performance spaces, and supporting amenities.',
      icon: 'Mask',
      suitableFor: 'Large indoor spaces with high ceilings',
      timeframe: '6-12 months',
      estimatedCost: '$200,000 - $500,000',
      detailedInfo: {
        overview: 'A hub for the local arts community to showcase their talents.',
        keyFeatures: [
          'Main performance stage',
          'Rehearsal studios',
          'Audience seating'
        ]
      }
    },
    {
      title: 'Community Recreation Center',
      description: 'A versatile facility with activity rooms, sports courts, and fitness equipment.',
      icon: 'Basketball',
      suitableFor: 'Large indoor spaces with high ceilings',
      timeframe: '6-12 months',
      estimatedCost: '$150,000 - $300,000',
      detailedInfo: {
        overview: 'A hub for community recreation, sports, and wellness activities.',
        keyFeatures: [
          'Gymnasium',
          'Fitness center',
          'Multi-purpose rooms'
        ]
      }
    },
    {
      title: 'Collaborative Innovation Lab',
      description: 'A flexible workspace designed to foster creativity, problem-solving, and interdisciplinary collaboration.',
      icon: 'LightBulb',
      suitableFor: 'Medium to large indoor spaces with open layouts',
      timeframe: '3-6 months',
      estimatedCost: '$75,000 - $150,000',
      detailedInfo: {
        overview: 'An environment that stimulates ideation, experimentation, and team-based innovation.',
        keyFeatures: [
          'Modular furniture',
          'Whiteboard walls',
          'Breakout areas'
        ]
      }
    },
    {
      title: 'Art Gallery & Exhibition Space',
      description: 'A dedicated venue for showcasing local and regional art, with both permanent and rotating exhibits.',
      icon: 'Palette',
      suitableFor: 'Medium to large indoor spaces with good lighting',
      timeframe: '4-8 months',
      estimatedCost: '$100,000 - $250,000',
      detailedInfo: {
        overview: 'A platform for the community to engage with and appreciate diverse forms of art.',
        keyFeatures: [
          'Gallery walls',
          'Specialized lighting',
          'Event space'
        ]
      }
    },
    {
      title: 'Community Technology Center',
      description: 'A hub for digital literacy, STEM education, and technology-enabled services.',
      icon: 'Desktop',
      suitableFor: 'Medium to large indoor spaces with good infrastructure',
      timeframe: '4-8 months',
      estimatedCost: '$100,000 - $200,000',
      detailedInfo: {
        overview: 'Bridging the digital divide and empowering the community through technology.',
        keyFeatures: [
          'Computer lab',
          'Coding & robotics classes',
          'Tech support services'
        ]
      }
    },
    {
      title: 'Urban Farm & Food Hub',
      description: 'A mixed-use facility combining urban farming, food processing, and community education.',
      icon: 'Seedling',
      suitableFor: 'Large indoor/outdoor spaces with access to sunlight',
      timeframe: '6-12 months',
      estimatedCost: '$150,000 - $300,000',
      detailedInfo: {
        overview: 'Promoting sustainable food systems and local food security.',
        keyFeatures: [
          'Greenhouse & raised beds',
          'Commercial kitchen',
          'Nutrition education'
        ]
      }
    },
    {
      title: 'Youth Development Center',
      description: 'A multi-purpose facility focused on fostering the growth and well-being of young people.',
      icon: 'Child',
      suitableFor: 'Medium to large indoor spaces with flexible layouts',
      timeframe: '6-12 months',
      estimatedCost: '$150,000 - $300,000',
      detailedInfo: {
        overview: 'Empowering youth through educational, recreational, and mentorship programs.',
        keyFeatures: [
          'Classrooms',
          'Activity rooms',
          'Counseling spaces'
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

  const filterIdeasBasedOnResponses = (ideas, responses) => {
    const { spaceSize, budget, purpose } = responses;

    // Base set of 12 diverse ideas
    const allIdeas = [
      {
        title: 'Modern Coworking Space',
        description: 'Flexible workspace with private offices and shared areas.',
        icon: Briefcase,
        suitableFor: 'Small to medium indoor spaces (800-1500 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹8-15 Lakhs',
        purpose: 'Commercial',
        detailedInfo: {
          overview: 'Professional coworking environment with all modern amenities.',
          keyFeatures: ['Private offices', 'Meeting rooms', 'High-speed internet', 'Coffee bar']
        }
      },
      {
        title: 'Wellness & Yoga Studio',
        description: 'Serene space for yoga, meditation, and fitness classes.',
        icon: Dumbbell,
        suitableFor: 'Small indoor spaces (600-1000 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹7-12 Lakhs',
        purpose: 'Wellness',
        detailedInfo: {
          overview: 'Peaceful environment for wellness activities and classes.',
          keyFeatures: ['Yoga area', 'Meditation room', 'Changing rooms', 'Reception']
        }
      },
      {
        title: 'Community Learning Hub',
        description: 'Educational center for skill development and workshops.',
        icon: Building2,
        suitableFor: 'Medium indoor spaces (1000-2000 sq ft)',
        timeframe: '3-4 months',
        estimatedCost: '₹12-20 Lakhs',
        purpose: 'Educational',
        detailedInfo: {
          overview: 'Modern learning facility with multiple classrooms.',
          keyFeatures: ['Classrooms', 'Computer lab', 'Library', 'Study areas']
        }
      },
      {
        title: 'Art Gallery & Studio',
        description: 'Creative space for exhibitions and art creation.',
        icon: Building2,
        suitableFor: 'Small to medium indoor spaces (800-1500 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹10-18 Lakhs',
        purpose: 'Entertainment',
        detailedInfo: {
          overview: 'Versatile art space with excellent lighting.',
          keyFeatures: ['Gallery walls', 'Studio space', 'Lighting system', 'Storage']
        }
      },
      {
        title: 'Café & Community Space',
        description: 'Combined café and event space for community gatherings.',
        icon: Building2,
        suitableFor: 'Medium indoor spaces (1000-2000 sq ft)',
        timeframe: '3-4 months',
        estimatedCost: '₹15-25 Lakhs',
        purpose: 'Mixed-use',
        detailedInfo: {
          overview: 'Modern café with flexible event space.',
          keyFeatures: ['Café setup', 'Event area', 'Kitchen', 'Outdoor seating']
        }
      },
      {
        title: 'Digital Media Studio',
        description: 'Professional space for content creation and recording.',
        icon: Building2,
        suitableFor: 'Small indoor spaces (500-800 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹8-15 Lakhs',
        purpose: 'Commercial',
        detailedInfo: {
          overview: 'Fully equipped studio for digital content creation.',
          keyFeatures: ['Recording booth', 'Editing suite', 'Green screen', 'Control room']
        }
      },
      {
        title: 'Indoor Sports Center',
        description: 'Compact sports facility for various indoor activities.',
        icon: Dumbbell,
        suitableFor: 'Medium to large indoor spaces (1500-3000 sq ft)',
        timeframe: '3-4 months',
        estimatedCost: '₹20-35 Lakhs',
        purpose: 'Entertainment',
        detailedInfo: {
          overview: 'Multi-purpose indoor sports facility.',
          keyFeatures: ['Sports court', 'Equipment area', 'Changing rooms', 'Viewing area']
        }
      },
      {
        title: 'Tech Innovation Lab',
        description: 'Collaborative space for technology projects and startups.',
        icon: Briefcase,
        suitableFor: 'Medium indoor spaces (1000-2000 sq ft)',
        timeframe: '3-4 months',
        estimatedCost: '₹15-25 Lakhs',
        purpose: 'Commercial',
        detailedInfo: {
          overview: 'High-tech workspace for innovation and development.',
          keyFeatures: ['Work stations', 'Testing area', 'Meeting rooms', 'Presentation space']
        }
      },
      {
        title: 'Children\'s Activity Center',
        description: 'Educational play space for children\'s development.',
        icon: Building2,
        suitableFor: 'Small to medium indoor spaces (800-1500 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹10-18 Lakhs',
        purpose: 'Educational',
        detailedInfo: {
          overview: 'Safe and engaging environment for children\'s activities.',
          keyFeatures: ['Play area', 'Learning zones', 'Parent waiting area', 'Storage']
        }
      },
      {
        title: 'Dance & Performance Studio',
        description: 'Professional space for dance classes and performances.',
        icon: Building2,
        suitableFor: 'Medium indoor spaces (1000-2000 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹12-20 Lakhs',
        purpose: 'Entertainment',
        detailedInfo: {
          overview: 'Well-equipped studio for dance and performance arts.',
          keyFeatures: ['Mirror wall', 'Sprung floor', 'Sound system', 'Changing rooms']
        }
      },
      {
        title: 'Therapy & Counseling Center',
        description: 'Private practice space for mental health professionals.',
        icon: Building2,
        suitableFor: 'Small indoor spaces (600-1000 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹8-15 Lakhs',
        purpose: 'Wellness',
        detailedInfo: {
          overview: 'Comfortable and private counseling facility.',
          keyFeatures: ['Therapy rooms', 'Waiting area', 'Sound insulation', 'Reception']
        }
      },
      {
        title: 'Craft Workshop & Retail',
        description: 'Combined workshop and retail space for artisans.',
        icon: Building2,
        suitableFor: 'Small to medium indoor spaces (800-1500 sq ft)',
        timeframe: '2-3 months',
        estimatedCost: '₹10-18 Lakhs',
        purpose: 'Mixed-use',
        detailedInfo: {
          overview: 'Creative space for craft production and sales.',
          keyFeatures: ['Workshop area', 'Retail display', 'Storage', 'Teaching space']
        }
      }
    ];

    // Filter ideas based on available criteria
    let filteredIdeas = allIdeas.filter(idea => {
      let matches = true;

      if (purpose && idea.purpose !== purpose) {
        matches = false;
      }

      if (spaceSize) {
        if (spaceSize === 'Less than 1000 sq ft' && !idea.suitableFor.includes('Small')) {
          matches = false;
        }
        if (spaceSize === '1000-2500 sq ft' && !idea.suitableFor.includes('Medium')) {
          matches = false;
        }
        if ((spaceSize === '2500-5000 sq ft' || spaceSize === 'More than 5000 sq ft') 
            && !idea.suitableFor.includes('Large')) {
          matches = false;
        }
      }

      if (budget) {
        const costString = idea.estimatedCost;
        const maxCost = parseInt(costString.split('-')[1].replace(/[^0-9]/g, ''));
        
        if (budget === '₹5-10 Lakhs' && maxCost > 10) matches = false;
        if (budget === '₹10-20 Lakhs' && maxCost > 20) matches = false;
        if (budget === '₹20-40 Lakhs' && maxCost > 40) matches = false;
      }

      return matches;
    });

    // If no exact matches, return ideas matching any criterion
    if (filteredIdeas.length === 0) {
      filteredIdeas = allIdeas.filter(idea => {
        if (purpose && idea.purpose === purpose) return true;
        if (spaceSize && idea.suitableFor.includes(spaceSize)) return true;
        if (budget) {
          const costString = idea.estimatedCost;
          const maxCost = parseInt(costString.split('-')[1].replace(/[^0-9]/g, ''));
          if (budget === '₹5-10 Lakhs' && maxCost <= 10) return true;
          if (budget === '₹10-20 Lakhs' && maxCost <= 20) return true;
          if (budget === '₹20-40 Lakhs' && maxCost <= 40) return true;
        }
        return false;
      });
    }

    // Always return at least 6 ideas
    return filteredIdeas.length > 0 ? filteredIdeas : allIdeas.slice(0, 6);
  };

  const QuestionnaireView = () => (
    <div className="space-wizard-container">
      {currentStep === 'questionnaire' && (
        <div className="space-wizard-card">
          <div className="space-wizard-header">
            <div className="header-content">
              <Building2 className="header-icon" />
              Space Planning Questionnaire
            </div>
          </div>
          
          <div className="space-wizard-progress-container">
            <div 
              className="space-wizard-progress-bar" 
              style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
            />
          </div>
          
          <div className="space-wizard-question-number">
            {currentQuestion + 1}
          </div>
          
          <div className="question-container">
            <div className="question-content">
              <label className="question-label">
                {questions[currentQuestion].label}
              </label>
              
              <div className="space-wizard-grid">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInputChange(questions[currentQuestion].id, option)}
                    className={`option-button ${
                      responses[questions[currentQuestion].id] === option
                        ? 'option-button-selected'
                        : 'option-button-unselected'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleNext}
              className="space-wizard-next-button"
              disabled={!responses[questions[currentQuestion].id]}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Recommendations'}
              <ArrowRight className="next-button-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const IdeasView = () => {
    const filteredIdeas = filterIdeasBasedOnResponses(ideas, responses);

    return (
      <div className="ideas-container">
        <div className="ideas-header">
          <h2 className="ideas-title">
            Top Recommended Ideas for Your Space
          </h2>
        </div>
        
        <div className="ideas-grid">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.title}
              onClick={() => handleIdeaClick(idea)}
              className="idea-card"
            >
              <div className="idea-header">
                <idea.icon className="idea-icon" />
                <h3 className="idea-title">{idea.title}</h3>
              </div>
              
              <p className="idea-description">
                {idea.description}
              </p>
              
              <div className="idea-details">
                <div className="idea-detail-item">
                  <span className="detail-label">Suitable for:</span>
                  <span className="detail-value">{idea.suitableFor}</span>
                </div>
                
                <div className="idea-detail-item">
                  <span className="detail-label">Timeframe:</span>
                  <span className="detail-value">{idea.timeframe}</span>
                </div>
                
                <div className="idea-detail-item">
                  <span className="detail-label">Cost:</span>
                  <span className="detail-value">{idea.estimatedCost}</span>
                </div>
              </div>

              <button className="view-details-button">
                View Details
                <ArrowRight className="view-details-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DetailView = () => {
    const navigate = useNavigate();

    const handleNavigateToDashboard = () => {
      navigate('/dashboard');
    };

    return (
      <div className="detail-container">
        <button
          onClick={() => setCurrentStep('ideas')}
          className="back-button"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Ideas
        </button>

        <div className="detail-card">
          <div className="detail-header">
            <div className="detail-title">
              <selectedIdea.icon className="detail-icon" />
              {selectedIdea.title}
            </div>
          </div>

          <div className="detail-content">
            <div className="detail-section">
              <h3 className="detail-section-title">Overview</h3>
              <p className="detail-text">
                {selectedIdea.detailedInfo.overview}
              </p>
            </div>

            <div className="detail-section">
              <h3 className="detail-section-title">Key Features</h3>
              <ul className="detail-features">
                {selectedIdea.detailedInfo.keyFeatures.map((feature, index) => (
                  <li key={index} className="detail-feature-item">
                    <CheckCircle className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3 className="detail-section-title">Additional Information</h3>
              <div className="idea-details">
                <div className="idea-detail-item">
                  <span className="detail-label">Suitable for:</span>
                  <span className="detail-value">{selectedIdea.suitableFor}</span>
                </div>
                
                <div className="idea-detail-item">
                  <span className="detail-label">Timeframe:</span>
                  <span className="detail-value">{selectedIdea.timeframe}</span>
                </div>
                
                <div className="idea-detail-item">
                  <span className="detail-label">Estimated Cost:</span>
                  <span className="detail-value">{selectedIdea.estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="navigation-button-container">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="navigation-button"
            >
              <span>Open AI Chat</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>

        <IframeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    );
  };

  return (
    <div className="main-container">
      <img src="/orbital.png" alt="" className="orbital" />
      {currentStep === 'questionnaire' && <QuestionnaireView />}
      {currentStep === 'ideas' && <IdeasView />}
      {currentStep === 'detail' && <DetailView />}
    </div>
  );
};

export default SpacePlanningWizard;
