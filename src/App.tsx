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
import Victory from './views/09-Victory';
import EventScreen from './views/EventScreen';

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
}

const App = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [pendingStep, setPendingStep] = useState<number | null>(null);
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
    haggleDiscount: 0
  });

  const [audioInitialized, setAudioInitialized] = useState(false);

  // No localStorage save/load logic needed
  useEffect(() => {
    // Intentionally empty or remove entirely. 
    // Left empty here to just replace the block.
  }, []);

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
    const next = currentStep + 1;
    
    // Motor de eventos (50% de probabilidad en ciertos breakpoints)
    const diceRoll = Math.random();
    
    if (next === 5 && diceRoll < 0.5) {
      // Después de Inventory (Paso 4) -> Camino a Weather (5)
      setPendingStep(next);
      setActiveEvent('knight');
      return;
    }
    
    if (next === 8 && diceRoll < 0.5) {
      // Después de Transport (Paso 7) -> Camino a DateTime (8)
      setPendingStep(next);
      setActiveEvent('merchant');
      return;
    }
    
    if (next === 10 && diceRoll < 0.5) {
      // Después de Destinations (Paso 9) -> Camino a SideQuests (10)
      setPendingStep(next);
      setActiveEvent(Math.random() < 0.5 ? 'slime' : 'thief');
      return;
    }
    
    if (next === 12 && diceRoll < 0.5) { // BossBattle is 12, Fuel is 11
      // Después de Fuel -> Camino a Boss
      setPendingStep(next);
      setActiveEvent('fortune_teller');
      return;
    }

    setCurrentStep(next);
  };



  const goToStep = (step: number) => {
    setCurrentStep(step);
  };



  const renderStep = () => {
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
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe'))) {
                      updateGameState('fuelId', null as any);
                      goToStep(10); // SideQuests are now step 10
                    } else {
                      nextStep();
                    }
                  }} 
                  gameState={gameState} 
                  updateState={updateGameState as any} 
               />;
      case 10:
        return <SideQuests 
                  onNext={() => {
                    // Check if fuel should be skipped
                    const mission = missionOptions.find(m => m.id === gameState.destId);
                    if (mission && (mission.tags.includes('comida') || mission.tags.includes('cena') || mission.tags.includes('cafe'))) {
                      updateGameState('fuelId', null as any);
                      // Custom routing bypassing normal nextStep, check event here too:
                      if (Math.random() < 0.5) {
                        setPendingStep(12);
                        setActiveEvent('fortune_teller');
                      } else {
                        goToStep(12);
                      }
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
            haggleDiscount: 0
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
        {currentStep > 0 && currentStep !== 3 && currentStep !== 13 && (
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
