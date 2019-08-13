import Immutable from 'seamless-immutable';

import {
  ACCENT,
  BASS_DRUM,
  SNARE_DRUM,
  LOW_CONGA_LOW_TOM,
  MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM,
  CLAVES_RIMSHOT,
  MARACAS_HANDCLAP,
  COWBELL,
  CYMBAL,
  OPEN_HIHAT,
  CLOSED_HIHAT,
  FIRST_PART,
  SECOND_PART,
  A_VARIATION,
  B_VARIATION,
} from 'store/constants';

import { stepKey, patternLengthKey } from 'utils';

const PARTS = [FIRST_PART, SECOND_PART];
const VARIATIONS = [A_VARIATION, B_VARIATION];

const initialStepsState = (() => {
  const steps = {};
  for (let track = 0; track < 16; track++) {
    for (let instrument = 0; instrument < 12; instrument++) {
      for (const part of PARTS) {
        for (const variation of VARIATIONS) {
          for (let step = 0; step < 16; step++) {
            const key = stepKey(track, instrument, part, variation, step);
            steps[key] = false;
          }
        }
      }
    }
  }
  return steps;
})();

const initialRhythmLengthState = (() => {
  const lengths = {};
  for (let track = 0; track < 16; track++) {
    lengths[patternLengthKey(track, FIRST_PART)] = 16;
    lengths[patternLengthKey(track, SECOND_PART)] = 0;
  }
  return lengths;
})();

const initialVoiceState = {
  [ACCENT]: {
    level: 0,
  },
  [BASS_DRUM]: {
    level: 75,
    tone: 50,
    decay: 50,
  },
  [SNARE_DRUM]: {
    level: 75,
    tone: 50,
    snappy: 50,
  },
  [LOW_CONGA_LOW_TOM]: {
    level: 75,
    tuning: 50,
    selector: 1,
  },
  [MID_CONGA_MID_TOM]: {
    level: 75,
    tuning: 50,
    selector: 1,
  },
  [HI_CONGA_HI_TOM]: {
    level: 75,
    tuning: 50,
    selector: 1,
  },
  [CLAVES_RIMSHOT]: {
    level: 75,
    selector: 1,
  },
  [MARACAS_HANDCLAP]: {
    level: 75,
    selector: 1,
  },
  [COWBELL]: {
    level: 75,
  },
  [CYMBAL]: {
    level: 75,
    tone: 50,
    decay: 50,
  },
  [OPEN_HIHAT]: {
    level: 75,
    decay: 50,
  },
  [CLOSED_HIHAT]: {
    level: 75,
  },
};

const initialState = Immutable({
  voiceState: initialVoiceState,
  patternLengths: initialRhythmLengthState,
  steps: initialStepsState,

  currentPart: FIRST_PART,
  currentVariation: A_VARIATION,
  currentMeasure: 0,

  playing: false,

  selectedMode: 1,
  selectedInstrumentTrack: 1,

  masterVolume: 70,

  autoFillInPosition: 0,
  basicVariationPosition: 0,
  introFillVariationPosition: 1,
  preScalePosition: 2,

  selectedPattern: 0,
  selectedPlayPattern: 0,
  selectedPlayFillPattern: 0,
  fillScheduled: false,

  tempo: 135,
  fineTempo: 0,

  currentStep: 0,
  blinkState: true,
});

export default initialState;
