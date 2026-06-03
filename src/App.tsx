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
import Transport from './views/04-Transport';
import DateTime from './views/05-DateTime';
import Destinations from './views/06-Destinations';
import SideQuests from './views/06b-SideQuests';
import Fuel from './views/07-Fuel';
import BossBattle from './views/08-BossBattle';
import Victory from './views/09-Victory';

export interface GameState {
  avatarId: string | null;
  inventoryId: string | null;
  weatherId: string | null;
  transportId: string | null;
  dayId: string | null;
  time: string | null;
  destId: string | null;
  sideQuestId: string | null;
  fuelId: string | null;
  haggleDiscount: number;
}

const App = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>({
    avatarId: null,
    inventoryId: null,
    weatherId: null,
    transportId: null,
    dayId: null,
    time: null,
    destId: null,
    sideQuestId: null,
    fuelId: null,
    haggleDiscount: 0
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
    if (currentStep > 0 && currentStep !== 12) {
      localStorage.setItem('rpgDateQuestState', JSON.stringify(gameState));
      localStorage.setItem('rpgDateQuestStep', currentStep.toString());
    } else if (currentStep === 12) {
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
        return <Transport 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 7:
        return <DateTime 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 8:
        return <Destinations 
                  onNext={() => {
                    const mission = missionOptions.find(m => m.id === gameState.destId);
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe'))) {
                      updateGameState('fuelId', null as any);
                      goToStep(11); // Skip Fuel and SideQuests if going straight to eating? Wait, SideQuests are before Fuel. Let's let them do side quests.
                      // Actually, if we want them to do SideQuests even if they eat:
                      goToStep(9);
                    } else {
                      nextStep();
                    }
                  }} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 9:
        return <SideQuests 
                  onNext={() => {
                    // Check if fuel should be skipped
                    const mission = missionOptions.find(m => m.id === gameState.destId);
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe'))) {
                      updateGameState('fuelId', null as any);
                      goToStep(11); // BossBattle
                    } else {
                      nextStep(); // Fuel
                    }
                  }} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 10:
        return <Fuel 
                  onNext={nextStep} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 11:
        return <BossBattle 
                  onConfirm={nextStep} 
                  onEdit={() => goToStep(4)} 
                  gameState={gameState} 
               />;
      case 12:
        return <Victory gameState={gameState} onRestart={() => {
          setGameState({
            avatarId: null,
            inventoryId: null,
            weatherId: null,
            transportId: null,
            dayId: null,
            time: null,
            destId: null,
            sideQuestId: null,
            fuelId: null,
            haggleDiscount: 0
          });
          goToStep(0);
        }} />;
      default:
        return <Splash onNext={nextStep} onInteract={handleInteraction} onContinue={handleContinue} hasSave={!!localStorage.getItem('rpgDateQuestStep')} />;
    }
  };

  return (
    <>
      <GameBackground currentStep={currentStep} />
      <MusicPlayer />
      <div className="scanlines" />
      <div className="app-container screen-enter" key={`step-${currentStep}`} onClick={handleInteraction}>
        {currentStep > 0 && currentStep !== 3 && currentStep !== 12 && (
          <div className="status-bar fade-in">
            <span>HP: 100/100</span>
            <span style={{ color: '#ffd43b' }}>🪙 ORO: {calculateRemainingGold(gameState.transportId, gameState.destId, gameState.fuelId, gameState.haggleDiscount)}</span>
            <span>{gameState.avatarId ? 'P1 READY' : 'NO AVATAR'}</span>
          </div>
        )}
        {renderStep()}
      </div>
    </>
  );
};

export default App;
