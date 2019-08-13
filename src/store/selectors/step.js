import { createSelector } from 'reselect';
import { getCurrentStep, getSelectedMode } from 'store/selectors/common';
// import patternLengthSelector from './pattern-length';
// import { MODE_FIRST_PART, MODE_SECOND_PART } from 'store/constants';

export default createSelector(
  [getCurrentStep, getSelectedMode, /* patternLengthSelector */],
  (currentStep, mode, /* patternLength */) => {
    switch (mode) {
      // case MODE_FIRST_PART:
      // case MODE_SECOND_PART:
      //   return currentStep % patternLength;
      default:
        return currentStep;
    }
  }
)
