import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getMasterVolume } from 'store/selectors/common';
import { onMasterVolumeChange } from 'store/actions';

import Knob from 'components/knob';
import Guides from 'components/guides';
import KnobInner from 'components/knob-inner';

import { gray } from 'theme/colors';
import { labelGraySmall, labelGrayNormal, ring } from 'theme/styles';

const labelValues = [];
for (let i = 0; i < 11; i++) {
  if (i === 0) {
    labelValues.push('MIN');
  } else if (i === 10) {
    labelValues.push('MAX');
  } else {
    labelValues.push(i);
  }
}

const labelHeight = 9;

const MasterVolumeKnob = ({ size = 130 }) => {
  const knobSize = Math.ceil(size * 0.54);

  const styles = {
    masterVolume: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: size,
      height: size + labelHeight,
    },

    controlWrapper: {
      position: 'relative',
      width: size,
      height: size,
    },

    knobWrapper: ring(knobSize),

    label: {
      position: 'relative',
      ...labelGrayNormal,
      width: size,
      overflow: 'visible',
      top: -4,
    },

    dotGuides: {
      width: 5,
      height: 5,
      backgroundColor: gray,
      borderRadius: '50%',
    },

    labelGuides: labelGraySmall,
  };

  const ss = StyleSheet.create(styles);

  const value = useSelector(getMasterVolume);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onMasterVolumeChange(value));
  }

  return (
    <div className={css(ss.masterVolume)}>
      <div className={css(ss.controlWrapper)}>
        <Guides num={11} distance={size * 0.33} hideCount={1} style={styles.dotGuides} />
        <Guides distance={size * 0.45} hideCount={1} rotate={false} values={labelValues} style={styles.labelGuides} />
        <div className={css(ss.knobWrapper)}>
          <Knob value={value} onChange={onChange} size={knobSize} bufferSize={300} min={0} max={100} step={0.1}>
            <KnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
      <div className={css(ss.label)}>MASTER VOLUME</div>
    </div>
  );
};

MasterVolumeKnob.propTypes = {
  size: PropTypes.number,
};

export default MasterVolumeKnob;
