import {
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_TO_PART_MAPPING,
  MODE_MANUAL_PLAY,
  FIRST_PART,
  MODE_PATTERN_CLEAR,
} from 'store/constants';
import { stepKey } from 'utils';

import basicVariationSelector from 'store/selectors/variation';

export default (state, stepNumber) => {
  const { playing, selectedMode, currentPattern, selectedInstrumentTrack, currentStep, currentPart } = state;
  const currentVariation = basicVariationSelector(state);

  if (playing) {
    switch (selectedMode) {
      case MODE_FIRST_PART:
      case MODE_SECOND_PART: {
        const selectedPart = MODE_TO_PART_MAPPING[selectedMode];
        const key = stepKey(currentPattern, selectedInstrumentTrack, selectedPart, currentVariation, stepNumber);
        return state.setIn(['steps', key], !state.steps[key]);
      }

      case MODE_MANUAL_PLAY:
        if (stepNumber < 12) {
          if (currentPart === FIRST_PART && currentStep < 4) {
            return state.merge({
              selectedPlayPattern: stepNumber,
              currentPattern: stepNumber,
            });
          }
          return state.set('selectedPlayPattern', stepNumber);
        }
        return state.set('selectedPlayFillPattern', stepNumber - 12);
    }
  }

  switch (selectedMode) {
    case MODE_PATTERN_CLEAR:
    case MODE_FIRST_PART:
    case MODE_SECOND_PART:
      return state.set('selectedPattern', stepNumber);
    case MODE_MANUAL_PLAY:
      return stepNumber < 12
        ? state.set('selectedPlayPattern', stepNumber)
        : state.set('selectedPlayFillPattern', stepNumber - 12);
    default:
      return state;
  }
};
