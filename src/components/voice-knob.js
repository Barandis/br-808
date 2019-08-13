import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import Knob from 'components/knob';
import Guides from 'components/guides';

import { voiceHandle, voiceLevelInner, voiceInner, voiceOuter, gray } from 'theme/colors';
import { labelGrayNormal, ring } from 'theme/styles';

export const LABEL_HEIGHT = 30;

const VoiceKnob = ({ value, onChange, size = 75, label = '', level = false }) => {
  const knobSize = Math.ceil(size * 0.6);

  const styles = {
    voiceKnob: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: size,
      height: size + LABEL_HEIGHT,
    },

    labelWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },

    label: {
      ...labelGrayNormal,
    },

    controlWrapper: {
      position: 'relative',
      width: size,
      height: size,
    },

    knobWrapper: {
      ...ring(knobSize),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inner: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: `8px solid ${voiceOuter}`,
      backgroundColor: level ? voiceLevelInner : voiceInner,
    },

    handle: {
      position: 'absolute',
      width: 4,
      height: 12,
      backgroundColor: voiceHandle,
      top: -6,
      left: '50%',
      transform: 'translateX(-50%)',
    },

    levelIndicator: {
      position: 'absolute',
      width: 5,
      height: 5,
      borderRadius: '50%',
      backgroundColor: voiceLevelInner,
      right: '8%',
      top: '37%',
    },

    guides: {
      width: 2,
      height: size / 3,
      backgroundColor: gray,
    },
  };

  const ss = StyleSheet.create(styles);

  const levelIndicator = level ? <div className={css(ss.levelIndicator)} /> : null;

  return (
    <div className={css(ss.voiceKnob)}>
      <div className={css(ss.labelWrapper)}>
        <span className={css(ss.label)}>{label}</span>
      </div>
      <div className={css(ss.controlWrapper)}>
        {levelIndicator}
        <div className={css(ss.guideWrapper)}>
          <Guides num={11} distance={size / 3} hideCount={1} style={styles.guides} />
        </div>
        <div className={css(ss.knobWrapper)}>
          <Knob value={value} onChange={onChange} size={knobSize} min={0} max={100} step={2} bufferSize={300}>
            <div className={css(ss.inner)}>
              <div className={css(ss.handle)} />
            </div>
          </Knob>
        </div>
      </div>
    </div>
  );
};

VoiceKnob.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.bool,
};

export default VoiceKnob;
