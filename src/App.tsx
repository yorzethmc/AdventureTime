import { useState, useEffect } from 'react';
import './index.css';
import { initAudio } from './utils/audio';
import { calculateRemainingGold, missionOptions } from './data/gameData';
import GameBackground from './components/GameBackground';
import MusicPlayer from './components/MusicPlayer';

import Splash from './views/00-Splash';
import AvatarSelection from './views/01-AvatarSelection';
import MissionBriefing from './views/02-MissionBriefing';
import SadEnding from './views/03-SadEnding';
import Inventory from './views/03b-Inventory';
import Weather from './views/03c-Weather';
import DressCode from './views/05b-DressCode';
import Transport from './views/04-Transport';
import DateTime from './views/05-DateTime';
import Destinations from './views/06-Destinations';
import SideQuests from './views/06b-SideQuests';
import Fuel from './views/07-Fuel';
import BossBattle from './views/08-BossBattle';
import FourthWall from './views/13-FourthWall';
import Victory from './views/09-Victory';
import EventScreen, { rollForEvent } from './views/EventScreen';
import ConversationPrompt, { conversationQuestions, questionTriggers } from './views/ConversationPrompt';

export interface GameState {
  avatarId: string | null;
  inventoryId: string | null;
  weatherId: string | null;
  dressId: string | null;
  transportId: string | null;
  dayId: string | null;
  time: string | null;
  destId: string | null;
  sideQuestId: string | null;
  fuelId: string | null;
  haggleDiscount: number;
  responses: Record<string, string>;
}

const App = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [questionPendingStep, setQuestionPendingStep] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    avatarId: null,
    inventoryId: null,
    weatherId: null,
    dressId: null,
    transportId: null,
    dayId: null,
    time: null,
    destId: null,
    sideQuestId: null,
    fuelId: null,
    haggleDiscount: 0,
    responses: {}
  });

  const [audioInitialized, setAudioInitialized] = useState(false);

  // Cargar estado inicial desde localStorage o usar default
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('invite98_gamestate');
      const savedStep = localStorage.getItem('invite98_step');
      
      if (savedState) {
        setGameState(JSON.parse(savedState));
      }
      if (savedStep) {
        const step = parseInt(savedStep, 10);
        if (!isNaN(step) && step !== 14) {
          setCurrentStep(step);
        }
      }
    } catch (e) {
      console.error('Error loading state', e);
    }
  }, []);

  // Guardar estado cada vez que cambie
  useEffect(() => {
    if (currentStep !== 14) { // No guardar si ya terminó
      localStorage.setItem('invite98_gamestate', JSON.stringify(gameState));
      localStorage.setItem('invite98_step', currentStep.toString());
    } else {
      localStorage.removeItem('invite98_gamestate');
      localStorage.removeItem('invite98_step');
    }
  }, [gameState, currentStep]);

  // A helper to initialize audio on first interaction
  const handleInteraction = () => {
    if (!audioInitialized) {
      initAudio();
      setAudioInitialized(true);
    }
  };

  const updateGameState = (key: keyof GameState, value: string | null) => {
    setGameState(prev => ({ ...prev, [key]: value }));
  };

  const transitionTo = (next: number) => {
    // 1. Verificar si hay pregunta conversacional para este paso
    if (questionTriggers[next] !== undefined && !gameState.responses[conversationQuestions[questionTriggers[next]].id]) {
      setActiveQuestion(questionTriggers[next]);
      setQuestionPendingStep(next);
      return;
    }

    // 2. Motor de eventos: cada breakpoint tiene un pool de NPCs posibles
    let trigger: string | null = null;
    
    if (next === 5) trigger = 'after_inventory';
    else if (next === 8) trigger = 'after_transport';
    else if (next === 10) trigger = 'after_destinations';
    else if (next === 12) trigger = 'after_fuel';
    
    if (trigger) {
      const eventId = rollForEvent(trigger);
      if (eventId) {
        setPendingStep(next);
        setActiveEvent(eventId);
        return;
      }
    }

    setCurrentStep(next);
  };

  const nextStep = () => {
    transitionTo(currentStep + 1);
  };

  const handleConversationAnswer = (questionId: string, answer: string) => {
    setGameState(prev => {
      const newState = { ...prev, responses: { ...prev.responses, [questionId]: answer } };
      return newState;
    });
    
    if (questionPendingStep !== null) {
      const pendingNext = questionPendingStep;
      setActiveQuestion(null);
      setQuestionPendingStep(null);
      
      // After answering, check for NPC events at this step too
      let trigger: string | null = null;
      if (pendingNext === 5) trigger = 'after_inventory';
      else if (pendingNext === 8) trigger = 'after_transport';
      else if (pendingNext === 10) trigger = 'after_destinations';
      else if (pendingNext === 12) trigger = 'after_fuel';
      
      if (trigger) {
        const eventId = rollForEvent(trigger);
        if (eventId) {
          setPendingStep(pendingNext);
          setActiveEvent(eventId);
          return;
        }
      }
      setCurrentStep(pendingNext);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    // Pregunta conversacional activa
    if (activeQuestion !== null) {
      const q = conversationQuestions[activeQuestion];
      return (
        <ConversationPrompt
          question={q}
          onAnswer={handleConversationAnswer}
        />
      );
    }

    // Evento NPC activo
    if (activeEvent && pendingStep !== null) {
      return (
        <EventScreen 
          eventId={activeEvent} 
          gameState={gameState} 
          updateState={updateGameState} 
          onResolve={() => {
            setActiveEvent(null);
            setCurrentStep(pendingStep);
            setPendingStep(null);
          }} 
        />
      );
    }

    switch (currentStep) {
      case 0:
        return <Splash onNext={nextStep} onInteract={handleInteraction} />;
      case 1:
        return <AvatarSelection 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState} 
               />;
      case 2:
        return <MissionBriefing 
                  onAccept={() => goToStep(4)} 
                  onReject={() => goToStep(3)} 
                  gameState={gameState}
               />;
      case 3:
        return <SadEnding onRetry={() => goToStep(2)} />;
      case 4:
        return <Inventory 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 5:
        return <Weather 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 6:
        return <DressCode 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 7:
        return <Transport 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 8:
        return <DateTime 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 9:
        return <Destinations 
                  onNext={() => {
                    const mission = missionOptions.find(m => m.id === gameState.destId);
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe') || mission.tags.includes('sorpresa'))) {
                      updateGameState('fuelId', 'she_chooses' as any); // Evita error de nulo y marca que el destino lo cubre
                    }
                    nextStep();
                  }} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 10:
        return <SideQuests 
                  onNext={() => {
                    // Check if fuel should be skipped
                    const mission = missionOptions.find(m => m.id === gameState.destId);
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe') || mission.tags.includes('sorpresa'))) {
                      transitionTo(12);
                    } else {
                      nextStep(); // Fuel is 11
                    }
                  }} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 11:
        return <Fuel 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 12:
        return <BossBattle 
                  onConfirm={nextStep} 
                  onEdit={() => goToStep(4)} 
                  gameState={gameState} 
               />;
      case 13:
        return <FourthWall onNext={nextStep} />;
      case 14:
        return <Victory gameState={gameState} onRestart={() => {
          setGameState({
            avatarId: null,
            inventoryId: null,
            weatherId: null,
            dressId: null,
            transportId: null,
            dayId: null,
            time: null,
            destId: null,
            sideQuestId: null,
            fuelId: null,
            haggleDiscount: 0,
            responses: {}
          });
          goToStep(0);
        }} />;
      default:
        return <Splash onNext={nextStep} onInteract={handleInteraction} />;
    }
  };

  const getAvatarName = (id: string | null): string => {
    const names: Record<string, string> = {
      mage: 'Maga Estelar', explorer: 'Exploradora', princess_random: 'Princesa Random',
      gemini: 'Gemela Cósmica', warrior: 'Caballera del Caos', bard: 'Barda Lo-Fi',
      vampire: 'Vampiresa', healer_glam: 'Sanadora Aesthetic', necromancer_goth: 'Nigromante',
      hunter_athletic: 'Cazadora Acrobática'
    };
    return names[id || ''] || 'P1 READY';
  };

  return (
    <>
      <GameBackground currentStep={currentStep} />
      <MusicPlayer />
      <div className="scanlines" />
      <div className="app-container screen-enter" key={`step-${currentStep}`} onClick={handleInteraction}>
        {currentStep > 0 && currentStep !== 3 && currentStep !== 13 && currentStep !== 14 && (
          <div className="status-bar fade-in">
            <span>HP: 100/100</span>
            <span style={{ color: '#ffd43b' }}>🪙 ORO: {calculateRemainingGold(gameState.transportId, gameState.destId, gameState.fuelId, gameState.haggleDiscount)}</span>
            <span>{gameState.avatarId ? getAvatarName(gameState.avatarId) : 'NO AVATAR'}</span>
          </div>
        )}
        {renderStep()}
      </div>
    </>
  );
};

export default App;
