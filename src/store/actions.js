import {
  VOICE_CHANGE,
  MASTER_VOLUME_CHANGE,
  BASIC_VARIATION_CHANGE,
  START_STOP_BUTTON_CLICK,
  IF_VARIATION_CHANGE,
  TAP_BUTTON_CLICK,
  PRE_SCALE_CHANGE,
  STEP_BUTTON_CLICK,
  AUTO_FILL_IN_CHANGE,
  FINE_TEMPO_CHANGE,
  INSTRUMENT_TRACK_CHANGE,
  MODE_CHANGE,
  TEMPO_CHANGE,
  TICK,
  BLINK_TICK,
  CLEAR_CLICK,
  STATE_LOAD,
  RESET,
} from 'store/action-types';

export const onAutoFillInChange = value => ({
  type: AUTO_FILL_IN_CHANGE,
  payload: value,
});

export const onFineTempoChange = value => ({
  type: FINE_TEMPO_CHANGE,
  payload: value,
});

export const onInstrumentTrackChange = value => ({
  type: INSTRUMENT_TRACK_CHANGE,
  payload: value,
});

export const onModeChange = value => ({
  type: MODE_CHANGE,
  payload: value,
});

export const onTempoChange = value => ({
  type: TEMPO_CHANGE,
  payload: value,
});

export const onVoiceChange = (type, control, value) => ({
  type: VOICE_CHANGE,
  payload: {
    type,
    control,
    value,
  },
});

export const onMasterVolumeChange = value => ({
  type: MASTER_VOLUME_CHANGE,
  payload: value,
});

export const onBasicVariationChange = position => ({
  type: BASIC_VARIATION_CHANGE,
  payload: position,
});

export const onStartStopButtonClick = () => ({
  type: START_STOP_BUTTON_CLICK,
});

export const onIfVariationChange = position => ({
  type: IF_VARIATION_CHANGE,
  payload: position,
});

export const onTapButtonClick = () => ({
  type: TAP_BUTTON_CLICK,
});

export const onPreScaleChange = position => ({
  type: PRE_SCALE_CHANGE,
  payload: position,
});

export const onStepButtonClick = index => ({
  type: STEP_BUTTON_CLICK,
  payload: index,
});

export const onTick = () => ({
  type: TICK,
});

export const onBlinkTick = () => ({
  type: BLINK_TICK,
});

export const onClearClick = () => ({
  type: CLEAR_CLICK,
});

export const onStateLoad = state => ({
  type: STATE_LOAD,
  payload: state,
});

export const onReset = () => ({
  type: RESET,
});
