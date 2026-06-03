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
import Transport from './views/04-Transport';
import DateTime from './views/05-DateTime';
import Destinations from './views/06-Destinations';
import Fuel from './views/07-Fuel';
import BossBattle from './views/08-BossBattle';
import Victory from './views/09-Victory';

export interface GameState {
  avatarId: string | null;
  transportId: string | null;
  dayId: string | null;
  time: string | null;
  destId: string | null;
  fuelId: string | null;
}

const App = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>({
    avatarId: null,
    transportId: null,
    dayId: null,
    time: null,
    destId: null,
    fuelId: null
  });

  const [audioInitialized, setAudioInitialized] = useState(false);

  // Load state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('rpgDateQuestState');
    const savedStep = localStorage.getItem('rpgDateQuestStep');
    if (savedState && savedStep) {
      try {
        const parsedState = JSON.parse(savedState);
        // Only load if not on Splash (or let splash handle "Continuar")
        // We will just load the state silently. If they are on step > 0, we can restore it.
        // Actually, we'll restore state but stay on step 0 to let them choose "Continuar"
        setGameState(parsedState);
      } catch (e) {
        console.error("Failed to parse save", e);
      }
    }
  }, []);

  // Save state on change
  useEffect(() => {
    if (currentStep > 0 && currentStep !== 9) {
      localStorage.setItem('rpgDateQuestState', JSON.stringify(gameState));
      localStorage.setItem('rpgDateQuestStep', currentStep.toString());
    } else if (currentStep === 9) {
      // Clear on victory
      localStorage.removeItem('rpgDateQuestState');
      localStorage.removeItem('rpgDateQuestStep');
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

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };



  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleContinue = () => {
    const savedStep = localStorage.getItem('rpgDateQuestStep');
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Splash onNext={nextStep} onInteract={handleInteraction} onContinue={handleContinue} hasSave={!!localStorage.getItem('rpgDateQuestStep')} />;
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
               />;
      case 3:
        return <SadEnding onRetry={() => goToStep(2)} />;
      case 4:
        return <Transport 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState} 
               />;
      case 5:
        return <DateTime 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState} 
               />;
      case 6:
        return <Destinations 
                  onNext={() => {
                    const mission = missionOptions.find(m => m.id === gameState.destId);
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe'))) {
                      updateGameState('fuelId', null);
                      goToStep(8);
                    } else {
                      nextStep();
                    }
                  }} 
                  gameState={gameState} 
                  updateState={updateGameState} 
               />;
      case 7:
        return <Fuel 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState} 
               />;
      case 8:
        return <BossBattle 
                  onConfirm={nextStep} 
                  onEdit={() => goToStep(4)} 
                  gameState={gameState} 
               />;
      case 9:
        return <Victory gameState={gameState} onRestart={() => {
          setGameState({
            avatarId: null,
            transportId: null,
            dayId: null,
            time: null,
            destId: null,
            fuelId: null
          });
          goToStep(0);
        }} />;
      default:
        return <Splash onNext={nextStep} onInteract={handleInteraction} />;
    }
  };

  return (
    <>
      <GameBackground currentStep={currentStep} />
      <MusicPlayer />
      <div className="scanlines" />
      <div className="app-container screen-enter" key={`step-${currentStep}`} onClick={handleInteraction}>
        {currentStep > 0 && currentStep !== 3 && currentStep !== 9 && (
          <div className="status-bar fade-in">
            <span>HP: 100/100</span>
            <span style={{ color: '#ffd43b' }}>🪙 ORO: {calculateRemainingGold(gameState.transportId, gameState.destId, gameState.fuelId)}</span>
            <span>{gameState.avatarId ? 'P1 READY' : 'NO AVATAR'}</span>
          </div>
        )}
        {renderStep()}
      </div>
    </>
  );
};

export default App;
