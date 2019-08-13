import { createSelector } from 'reselect';
import {
  getPlaying,
  getCurrentPattern,
  getSelectedMode,
  getCurrentStep,
  getSelectedInstrumentTrack,
  getSteps,
  getIntroFillVariationPosition,
  getFillScheduled,
  getSelectedPlayPattern,
  getSelectedPlayFillPattern,
  getSelectedPattern,
} from 'store/selectors/common';
import { MODE_FIRST_PART, MODE_SECOND_PART, MODE_MANUAL_PLAY, MODE_PATTERN_CLEAR } from 'store/constants';

import currentPartSelector from 'store/selectors/current-part-display';
import basicVariationSelector from 'store/selectors/variation';
import { stepKey } from 'utils';

const getBlinkState = state => state.blinkState;

export default stepNumber => {
  return createSelector(
    [
      getPlaying,
      getCurrentPattern,
      getSelectedMode,
      basicVariationSelector,
      getCurrentStep,
      getBlinkState,
      getSelectedInstrumentTrack,
      getSteps,
      currentPartSelector,
      getIntroFillVariationPosition,
      getFillScheduled,
      getSelectedPlayPattern,
      getSelectedPlayFillPattern,
      getSelectedPattern,
    ],
    (
      playing,
      currentPattern,
      selectedMode,
      basicVariation,
      currentStep,
      blinkState,
      selectedInstrument,
      steps,
      currentPart,
      introFillVariation,
      fillScheduled,
      selectedPlayPattern,
      selectedPlayFillPattern,
      selectedPattern
    ) => {
      const currentVariation = currentPattern < 12 ? basicVariation : introFillVariation;

      function whenPlaying() {
        switch (selectedMode) {
          case MODE_FIRST_PART:
          case MODE_SECOND_PART: {
            const currentStepKey = stepKey(
              currentPattern,
              selectedInstrument,
              currentPart,
              currentVariation,
              stepNumber
            );
            const sequencerValue = steps[currentStepKey];
            return currentStep === stepNumber ? !sequencerValue : sequencerValue;
          }
          case MODE_MANUAL_PLAY: {
            const isCurrentPattern = currentPattern === stepNumber;
            const isCurrentStep = currentStep === stepNumber;
            return isCurrentPattern ? isCurrentPattern && !isCurrentStep : isCurrentStep;
          }
          default:
            return false;
        }
      }

      function whenNotPlaying() {
        switch (selectedMode) {
          case MODE_PATTERN_CLEAR:
          case MODE_FIRST_PART:
          case MODE_SECOND_PART:
            return selectedPattern === stepNumber && blinkState;
          case MODE_MANUAL_PLAY: {
            if (stepNumber < 12) {
              if (fillScheduled) {
                return selectedPlayPattern === stepNumber;
              }
              return selectedPlayPattern === stepNumber && blinkState;
            }
            const selectedStep = selectedPlayFillPattern + 12;
            if (fillScheduled) {
              return selectedStep === stepNumber && blinkState;
            }
            return selectedStep === stepNumber;
          }
          default:
            return false;
        }
      }

      return playing ? whenPlaying() : whenNotPlaying();
    }
  );
};
