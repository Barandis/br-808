import { createSelector } from 'reselect';
import { A_VARIATION, AB_VARIATION, B_VARIATION, MODE_PATTERN_CLEAR } from 'store/constants';
import {
  getPlaying,
  getSelectedMode,
  getCurrentStep,
  getCurrentPattern,
  getCurrentVariation,
  getIntroFillVariationPosition,
} from 'store/selectors/common';

const getBasicVariationPosition = state => state.basicVariationPosition;
const getPartLengths = state => state.patternLengths;
const getClearPressed = state => state.clearPressed;

const variationMap = [A_VARIATION, AB_VARIATION, B_VARIATION];

export default createSelector(
  [
    getPlaying,
    getSelectedMode,
    getCurrentStep,
    getCurrentPattern,
    getCurrentVariation,
    getPartLengths,
    getBasicVariationPosition,
    getClearPressed,
    getIntroFillVariationPosition,
  ],
  (
    playing,
    selectedMode,
    currentStep,
    currentPattern,
    currentVariation,
    rhythmLengths,
    basicVariationPosition,
    clearPressed,
    introFillVariation
  ) => {
    if (currentPattern >= 12) {
      if (selectedMode === MODE_PATTERN_CLEAR && !clearPressed) {
        return null;
      }
      return introFillVariation;
    }

    if (playing) {
      return currentVariation;
    } else if (selectedMode === MODE_PATTERN_CLEAR && !clearPressed) {
      return null;
    }
    return variationMap[basicVariationPosition];
  }
);
