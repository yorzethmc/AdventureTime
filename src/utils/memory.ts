import type { GameState } from '../App';

export const getPlayerMood = (state: GameState): string => state.responses['mood'] || '';
export const getPlayerEnergy = (state: GameState): string => state.responses['plan_vibe'] || '';
export const getPlayerSong = (state: GameState): string => state.responses['song'] || '';
export const getPlayerNervousness = (state: GameState): string => state.responses['nervous'] || '';
export const getPlayerWish = (state: GameState): string => state.responses['wish'] || '';

// Parse emoji helpers for logic
export const isNervousHigh = (state: GameState): boolean => {
  const n = getPlayerNervousness(state);
  return n.includes('Sí, bastante') || n.includes('😳');
};

export const isNervousLow = (state: GameState): boolean => {
  const n = getPlayerNervousness(state);
  return n.includes('Para nada') || n.includes('😎');
};

export const isEnergyRomantic = (state: GameState): boolean => {
  const e = getPlayerEnergy(state);
  return e.includes('Romántico') || e.includes('💕');
};

export const isEnergyAdrenaline = (state: GameState): boolean => {
  const e = getPlayerEnergy(state);
  return e.includes('adrenalina') || e.includes('🔥');
};
