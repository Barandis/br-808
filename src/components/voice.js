import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import VoiceLayout from 'layouts/voice';

import VoiceLabel from 'components/voice-label';
import VoiceSwitch from 'components/voice-switch';
import VoiceKnob, { LABEL_HEIGHT } from 'components/voice-knob';

export const EMPTY_CONTROL = 'EMPTY';

const InstrumentColumn = ({ config, voiceState, onChange, width, height }) => {
  const { type, labels, controls } = config;
  const knobSize = Math.ceil(width * 0.72);

  const labelComponents = [<VoiceLabel key={`${type}-label-0`} label={labels[0]} />];
  if (labels.length === 2) {
    labelComponents.push(
      <VoiceSwitch
        key={`${type}-switch`}
        position={voiceState.selector}
        onChange={value => onChange(type, 'selector', value)}
      />
    );
    labelComponents.push(<VoiceLabel key={`${type}-label-1`} label={labels[1]} />);
  }

  const emptyStyle = StyleSheet.create({
    empty: {
      width: knobSize,
      height: knobSize + LABEL_HEIGHT,
    },
  });

  const controlComponents = [
    <VoiceKnob
      key={`${type}-knob-level`}
      value={voiceState.level}
      onChange={value => onChange(type, 'level', value)}
      size={knobSize}
      label="LEVEL"
      level
    />,
  ];
  controls.forEach((controlName, index) => {
    if (controlName !== EMPTY_CONTROL) {
      controlComponents.push(
        <VoiceKnob
          key={`${type}-knob-${index}`}
          value={voiceState[controlName]}
          onChange={value => onChange(type, controlName, value)}
          size={knobSize}
          label={controlName.toUpperCase()}
        />
      );
    } else {
      controlComponents.push(<div key={`${type}-knob-${index}`} className={css(emptyStyle.empty)} />);
    }
  });

  return (
    <VoiceLayout labels={labelComponents} width={width} height={height}>
      {controlComponents}
    </VoiceLayout>
  );
};

InstrumentColumn.propTypes = {
  config: PropTypes.object.isRequired,
  voiceState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default InstrumentColumn;
