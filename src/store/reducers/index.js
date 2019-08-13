import {
  A_VARIATION,
  B_VARIATION,
  AUTO_FILL_IN_MAPPING,
  FIRST_PART,
  MODE_PATTERN_CLEAR,
  MODE_FIRST_PART,
  MODE_SECOND_PART,
  MODE_MANUAL_PLAY,
  SECOND_PART,
} from 'store/constants';

import {
  VOICE_CHANGE,
  STEP_BUTTON_CLICK,
  START_STOP_BUTTON_CLICK,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  IF_VARIATION_CHANGE,
  PRE_SCALE_CHANGE,
  TEMPO_CHANGE,
  FINE_TEMPO_CHANGE,
  AUTO_FILL_IN_CHANGE,
  INSTRUMENT_TRACK_CHANGE,
  MODE_CHANGE,
  TICK,
  BLINK_TICK,
  TAP_BUTTON_CLICK,
  STATE_LOAD,
  RESET,
} from 'store/action-types';

import initialState from 'store/initial-state';

import stepClickReducer from 'store/reducers/step-click';

import patternLengthSelector from 'store/selectors/pattern-length';

import { patternLengthKey } from 'utils';

function getNextVariation(currentVariation, basicVariationPosition) {
  switch (basicVariationPosition) {
    case 0:
      return A_VARIATION;
    case 1:
      return currentVariation === A_VARIATION ? B_VARIATION : A_VARIATION;
    case 2:
      return B_VARIATION;
  }
}

function isMeasureAutoFill(state, measure) {
  const autoFillInValue = AUTO_FILL_IN_MAPPING[state.autoFillInPosition];
  return measure !== 0 && autoFillInValue && measure % autoFillInValue === 0;
}

function nextMeasure(state) {
  const nextVariation = getNextVariation(state.currentVariation, state.basicVariationPosition);
  const stateUpdate = {
    currentStep: 0,
    currentPart: FIRST_PART,
    currentVariation: nextVariation,
  };

  if (state.fillScheduled) {
    return state.merge({
      ...stateUpdate,
      currentPattern: state.selectedPlayFillPattern + 12,
      fillScheduled: false,
    });
  }

  stateUpdate.currentPattern = state.selectedPlayPattern;

  if (state.currentPattern < 12) {
    if (isMeasureAutoFill(state, state.currentMeasure + 1)) {
      stateUpdate.currentPattern = state.selectedPlayFillPattern + 12;
    }
    return state.merge({
      ...stateUpdate,
      currentMeasure: state.currentMeasure + 1,
    });
  }

  return state.merge(stateUpdate);
}

function startStopButtonClick(state) {
  let newState = state;
  switch (state.selectedMode) {
    case MODE_PATTERN_CLEAR:
      return state;

    case MODE_FIRST_PART:
    case MODE_SECOND_PART:
      if (!state.playing) {
        newState = newState.merge({
          currentStep: -1,
          currentVariation: state.basicVariationPosition > 1 ? B_VARIATION : A_VARIATION,
          currentPattern: state.selectedPattern,
        });
      }
      return newState.merge({
        playing: !state.playing,
        currentPart: FIRST_PART,
      });

    case MODE_MANUAL_PLAY:
      if (!state.playing) {
        newState = newState.merge({
          currentStep: -1,
          currentVariation: state.basicVariationPosition > 1 ? B_VARIATION : A_VARIATION,
          currentPattern: state.fillScheduled ? state.selectedPlayFillPattern + 12 : state.selectedPlayPattern,
          currentMeasure: 0,
          fillScheduled: false,
        });
      }
      return newState.merge({
        playing: !state.playing,
        currentPart: FIRST_PART,
      });

    default:
      return state;
  }
}

function tick(state) {
  const currentPatternLength = patternLengthSelector(state);

  if (state.currentStep + 1 >= currentPatternLength) {
    switch (state.selectedMode) {
      case MODE_FIRST_PART:
        return state.merge({
          currentStep: 0,
          currentPart: FIRST_PART,
          currentVariation: getNextVariation(state.currentVariation, state.basicVariationPosition),
        });

      case MODE_SECOND_PART: {
        let nextPart = FIRST_PART;
        let nextVariation = state.currentVariation;

        if (state.currentPart === FIRST_PART) {
          const secondPartLength = state.patternLengths[patternLengthKey(state.currentPattern, SECOND_PART)];
          if (secondPartLength !== 0) {
            nextPart = SECOND_PART;
          } else {
            nextVariation = getNextVariation(state.currentVariation, state.basicVariationPosition);
          }
        } else {
          nextVariation = getNextVariation(state.currentVariation, state.basicVariationPosition);
        }

        return state.merge({
          currentStep: 0,
          currentPart: nextPart,
          currentVariation: nextVariation,
        });
      }

      case MODE_MANUAL_PLAY:
        if (state.currentPart === FIRST_PART) {
          const secondPartLength = state.patternLengths[patternLengthKey(state.currentPattern, SECOND_PART)];
          if (secondPartLength !== 0) {
            return state.merge({
              currentStep: 0,
              currentPart: SECOND_PART,
            });
          }
          return nextMeasure(state);
        }
        return nextMeasure(state);
    }
  }

  return state.merge({
    currentStep: state.currentStep + 1,
  });
}

// Disabling complexity check because there's no way to choose between 23 different action types without tripping
// the warning that goes off at 21 different paths. Each case that is not trivial is already given its own function
// and doing any more to artifically reduce complexity (by splitting out some into a separate function, for
// instance) would actually be harder to read.
// eslint-disable-next-line complexity
export default function(state, { type, payload }) {
  switch (type) {
    case VOICE_CHANGE: {
      const { type: voiceType, control, value } = payload;
      return state.setIn(['voiceState', voiceType, control], value);
    }

    case STEP_BUTTON_CLICK:
      return stepClickReducer(state, payload);

    case START_STOP_BUTTON_CLICK:
      return startStopButtonClick(state);

    case MASTER_VOLUME_CHANGE:
      return state.set('masterVolume', payload);

    case BASIC_VARIATION_CHANGE:
      return state.set('basicVariationPosition', payload);

    case IF_VARIATION_CHANGE:
      return state.set('introFillVariationPosition', payload);

    case PRE_SCALE_CHANGE:
      return state.set('preScalePosition', payload);

    case TEMPO_CHANGE:
      return state.set('tempo', payload);

    case FINE_TEMPO_CHANGE:
      return state.set('fineTempo', payload);

    case AUTO_FILL_IN_CHANGE:
      return state.set('autoFillInPosition', payload);

    case INSTRUMENT_TRACK_CHANGE:
      return state.set('selectedInstrumentTrack', payload);

    case MODE_CHANGE:
      return state.merge({
        selectedMode: payload,
        playing: false,
      });

    case TICK:
      return tick(state);

    case BLINK_TICK:
      return state.set('blinkState', !state.blinkState);

    case TAP_BUTTON_CLICK:
      return state.selectedMode === MODE_MANUAL_PLAY ? state.set('fillScheduled', !state.fillScheduled) : state;

    case STATE_LOAD:
      return state.merge(payload);

    case RESET:
      return state.merge(initialState);

    default:
      return state;
  }
}
