import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TrixieAvatar from '../components/TrixieAvatar';
import SymptomCard, { Symptom } from '../components/SymptomCard';
import AnswerOption, { Answer } from '../components/AnswerOption';
import OutcomeCard, { Outcome } from '../components/OutcomeCard';
import ChatContainer from '../components/ChatContainer';
import BotMessage from '../components/BotMessage';
import UserMessage from '../components/UserMessage';
import LoadingDots from '../components/LoadingDots';
import PrivacyNote from '../components/PrivacyNote';
import SelfCareTip from '../components/SelfCareTip';
import CrisisResources from '../components/CrisisResources';
import SelfCareToolbox from '../components/SelfCareToolbox';
import MoodJournal from '../components/MoodJournal';
import HealthTrends from '../components/HealthTrends';
import PersonalizationModal from '../components/PersonalizationModal';
import AnonymousModeIndicator from '../components/AnonymousModeIndicator';
import AvatarSelector from '../components/AvatarSelector';
import LanguageSelector from '../components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { symptoms } from '../data/symptoms';
import { Question, questionsBySymptom } from '../data/questions';
import { evaluateTriage, TriageResult } from '../utils/triageLogic';
import { logTriageSession, logMentalHealthSession } from '../services/supabaseClient';
import { useToast } from '../hooks/use-toast';
import { usePreferences } from '../hooks/use-preferences';
import { useHealthTrends } from '../hooks/use-health-trends';
import { ArrowRight, Settings, ChartLine, Bell } from 'lucide-react';
import { getRandomCompassionateWord, physicalHealthWords, mentalHealthWords } from '../data/compassionateWords';

type ChatStep = 
  | 'welcome'
  | 'symptom-selection'
  | 'questions'
  | 'thinking'
  | 'outcome'
  | 'restart';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<ChatStep>('welcome');
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [outcome, setOutcome] = useState<TriageResult | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showSelfCareTip, setShowSelfCareTip] = useState(false);
  const [showCrisisResources, setShowCrisisResources] = useState(false);
  const [showSelfCareToolbox, setShowSelfCareToolbox] = useState(false);
  const [showMoodJournal, setShowMoodJournal] = useState(false);
  const [showHealthTrends, setShowHealthTrends] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { toast } = useToast();
  
  const { preferences, savePreferences, isLoaded: preferencesLoaded } = usePreferences();
  const { addSymptomEntry, addMoodEntry } = useHealthTrends();
  
  useEffect(() => {
    if (selectedSymptom) {
      const symptomQuestions = questionsBySymptom[selectedSymptom.id] || [];
      setQuestions(symptomQuestions);
    }
  }, [selectedSymptom]);

  const handleSymptomSelect = (symptom: Symptom) => {
    setSelectedSymptom(symptom);
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswerSelect = (value: string | number | boolean) => {
    if (!selectedSymptom || currentQuestionIndex >= questions.length) return;
    
    // Store the answer
    const questionId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Move to next question or to outcome
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      setIsThinking(true);
      setCurrentStep('thinking');
      
      // Simulate processing time for a more natural feel
      setTimeout(() => {
        if (selectedSymptom) {
          const result = evaluateTriage({
            symptomId: selectedSymptom.id,
            answers
          });
          
          // Add compassionate word for warning or danger outcomes
          if (result.outcome === 'warning' || result.outcome === 'danger') {
            const wordsList = selectedSymptom.id === 'mental-health' 
              ? mentalHealthWords 
              : physicalHealthWords;
            
            result.compassionateWord = getRandomCompassionateWord(wordsList);
          }
          
          setOutcome(result);
          setCurrentStep('outcome');
          setIsThinking(false);
          
          // Log the session to localStorage for health trends
          const timestamp = new Date().toISOString();
          
          if (selectedSymptom.id === 'mental-health') {
            addMoodEntry({
              timestamp,
              mood: answers['mental-health-mood'] as string,
              anxiety: answers['mental-health-anxiety'] as string,
              sleep: answers['mental-health-sleep'] as string,
              outcome: result.outcome
            });
          } else {
            addSymptomEntry({
              timestamp,
              symptomId: selectedSymptom.id,
              outcome: result.outcome
            });
          }
          
          // Only log to Supabase if not in anonymous mode
          if (!preferences.anonymous) {
            if (selectedSymptom.id === 'mental-health') {
              logMentalHealthSession({
                mood: answers['mental-health-mood'] as string,
                anxiety: answers['mental-health-anxiety'] as string,
                sleep_issues: answers['mental-health-sleep'] as string,
                duration: answers['mental-health-duration'] as string,
                self_harm_thoughts: answers['mental-health-thoughts'] as string,
                outcome: result.outcome,
                timestamp,
                compassionateWord: result.compassionateWord
              }).catch(err => {
                console.error("Failed to log mental health session:", err);
              });
            } else {
              logTriageSession({
                symptom: selectedSymptom.id,
                answers,
                outcome: result.outcome,
                condition: result.condition,
                compassionateWord: result.compassionateWord,
                timestamp
              }).catch(err => {
                console.error("Failed to log session:", err);
              });
            }
          }
        }
      }, 2000);
    }
  };

  const handleRestart = () => {
    setCurrentStep('restart');
    setTimeout(() => {
      setSelectedSymptom(null);
      setQuestions([]);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setOutcome(null);
      setCurrentStep('symptom-selection');
    }, 1000);
  };

  const handleAskDoctor = () => {
    toast({
      title: "Feature coming soon! 🚀",
      description: "The 'Ask a Doctor' feature will be available in the next update!",
      duration: 5000,
    });
  };

  const getAppTitle = () => {
    switch (preferences.tone) {
      case 'playful': return 'Trixie the Triage Bot';
      case 'professional': return 'Health Triage Assistant';
      case 'gentle': 
      default: return 'Trixie the Triage Bot';
    }
  };
  
  const getAvatarEmoji = () => {
    switch (preferences.avatar) {
      case 'doctor': return '👩‍⚕️';
      case 'nurse': return '👨‍⚕️';
      case 'friend': return '🧸';
      case 'star': return '✨';
      case 'heart': return '💖';
      case 'bot':
      default: return '🤖';
    }
  };
  
  if (!preferencesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-mint/10 ${preferences.theme === 'lavender' ? 'theme-lavender' : preferences.theme === 'coral' ? 'theme-coral' : preferences.theme === 'blue' ? 'theme-blue' : preferences.theme === 'sunshine' ? 'theme-sunshine' : ''}`}>
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between border-b bg-white/80 backdrop-blur-sm">
        <div className="flex items-center">
          <TrixieAvatar size="md" customEmoji={getAvatarEmoji()} />
          <div className="ml-3">
            <h1 className="text-xl font-bold">{getAppTitle()}</h1>
            <p className="text-xs text-gray-500">Your friendly symptom checker 🩺</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {preferences.anonymous && (
            <AnonymousModeIndicator />
          )}
          
          <LanguageSelector 
            onLanguageChange={setCurrentLanguage} 
            currentLanguage={currentLanguage} 
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHealthTrends(true)}
            title="View Health Trends"
          >
            <ChartLine size={20} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPersonalization(true)}
            title="Personalization Settings"
          >
            <Settings size={20} />
          </Button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container max-w-lg mx-auto py-6 px-4">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6">
                <TrixieAvatar size="lg" customEmoji={getAvatarEmoji()} />
              </div>
              <h1 className="text-3xl font-bold mb-4">Hi there! I'm {preferences.avatar === 'bot' ? 'Trixie' : preferences.avatar === 'doctor' ? 'Dr. Care' : 'your health buddy'} 👋</h1>
              <p className="text-lg mb-6">
                I'm your friendly triage assistant! Tell me what's bothering you, and I'll help you figure out what to do next.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Remember, I'm not a doctor—just a helpful bot with some triage smarts! 🤖
              </p>
              <Button 
                onClick={() => setCurrentStep('symptom-selection')}
                className="bg-mint hover:bg-mint/80 text-white px-8 py-6 rounded-xl text-lg flex items-center gap-2"
              >
                Let's get started <ArrowRight size={18} />
              </Button>
            </motion.div>
          )}

          {currentStep === 'symptom-selection' && (
            <motion.div
              key="symptoms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-2">What's bothering you?</h2>
              <p className="text-gray-500 mb-6">Tap the symptom that best describes what you're feeling.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {symptoms.map((symptom, index) => (
                  <SymptomCard
                    key={symptom.id}
                    symptom={symptom}
                    onClick={handleSymptomSelect}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'questions' && selectedSymptom && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ChatContainer>
                <BotMessage>
                  {selectedSymptom.id === 'mental-health' ? (
                    <p className="mb-2">Thank you for sharing with me 💚 Let's talk about how you've been feeling lately.</p>
                  ) : (
                    <p className="mb-2">Hi there! 👋 I see you're having issues with <span className="font-bold">{selectedSymptom.name}</span> {selectedSymptom.emoji}</p>
                  )}
                  <p>Let me ask you a few questions to understand better.</p>
                </BotMessage>
                
                {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
                  <div key={question.id}>
                    <BotMessage delay={index * 500}>
                      <p>{question.text}</p>
                    </BotMessage>
                    
                    {index === currentQuestionIndex ? (
                      <div className="ml-10 space-y-3 mb-4">
                        {question.answers.map((answer, aIndex) => (
                          <AnswerOption
                            key={answer.id}
                            answer={answer}
                            onSelect={handleAnswerSelect}
                            index={aIndex}
                            isSelected={answers[question.id] === answer.value}
                          />
                        ))}
                      </div>
                    ) : (
                      <UserMessage>
                        {question.answers.find(
                          a => a.value === answers[question.id]
                        )?.text || 'Selected option'}
                      </UserMessage>
                    )}
                  </div>
                ))}
              </ChatContainer>
            </motion.div>
          )}

          {currentStep === 'thinking' && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <TrixieAvatar size="lg" />
              <h2 className="text-xl font-bold mt-4 mb-2">Let me think about this...</h2>
              <LoadingDots />
            </motion.div>
          )}

          {currentStep === 'outcome' && outcome && (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <OutcomeCard
                type={outcome.outcome as Outcome}
                title={outcome.title}
                emoji={outcome.emoji}
                description={outcome.description}
                explanation={outcome.explanation}
                condition={outcome.condition}
                compassionateWord={outcome.compassionateWord}
                isMentalHealth={selectedSymptom?.id === 'mental-health'}
                onSelfCare={() => setShowSelfCareTip(true)}
                onTalkToSomeone={() => setShowCrisisResources(true)}
                onToolbox={() => setShowSelfCareToolbox(true)}
                onMoodJournal={() => setShowMoodJournal(true)}
              />
              
              <div className="flex flex-col gap-4 mt-8">
                {selectedSymptom?.id !== 'mental-health' && (
                  <Button 
                    onClick={handleAskDoctor}
                    className="bg-skyblue hover:bg-skyblue/80 text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2"
                  >
                    Ask a Doctor 👨‍⚕️
                  </Button>
                )}
                
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="py-6 rounded-xl"
                >
                  Check Another Symptom
                </Button>
              </div>
              
              <PrivacyNote />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showSelfCareTip && (
          <SelfCareTip onClose={() => setShowSelfCareTip(false)} />
        )}
        
        {showCrisisResources && (
          <CrisisResources onClose={() => setShowCrisisResources(false)} />
        )}
        
        {showSelfCareToolbox && (
          <SelfCareToolbox onClose={() => setShowSelfCareToolbox(false)} />
        )}
        
        {showMoodJournal && (
          <MoodJournal onClose={() => setShowMoodJournal(false)} />
        )}
        
        {showHealthTrends && (
          <HealthTrends onClose={() => setShowHealthTrends(false)} />
        )}
        
        {showPersonalization && (
          <PersonalizationModal 
            onClose={() => setShowPersonalization(false)} 
            onSavePreferences={savePreferences}
            currentPreferences={preferences}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
