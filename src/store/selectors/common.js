import { A_VARIATION, B_VARIATION } from 'store/constants';

export const getIntroFillVariation = state => [A_VARIATION, B_VARIATION][state.introFillVariationPosition];

export const getIntroFillVariationPosition = state => state.introFillVariationPosition;

export const getPlaying = state => state.playing;

export const getCurrentPattern = state => state.currentPattern;

export const getSelectedMode = state => state.selectedMode;

export const getCurrentVariation = state => state.currentVariation;

export const getCurrentStep = state => state.currentStep;

export const getBasicVariationPosition = state => state.basicVariationPosition;

export const getPreScalePosition = state => state.preScalePosition;

export const getSteps = state => state.steps;

export const getSelectedInstrumentTrack = state => state.selectedInstrumentTrack;

export const getPatternLengths = state => state.patternLengths;

export const getFillScheduled = state => state.fillScheduled;

export const getSelectedPlayPattern = state => state.selectedPlayPattern;

export const getSelectedPlayFillPattern = state => state.selectedPlayFillPattern;

export const getCurrentPart = state => state.currentPart;

export const getSelectedPattern = state => state.selectedPattern;

export const getTempo = state => state.tempo;

export const getFineTempo = state => state.fineTempo;

export const getAutoFillInPosition = state => state.autoFillInPosition;

export const getVoiceState = state => state.voiceState;

export const getMasterVolume = state => state.masterVolume;

export const getStoreState = state => state;