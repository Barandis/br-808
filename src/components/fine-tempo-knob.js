import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getFineTempo } from 'store/selectors/common';
import { onFineTempoChange } from 'store/actions';

import Knob from 'components/knob';
import Guides from 'components/guides';
import KnobInner from 'components/knob-inner';

import { gray } from 'theme/colors';
import { ring, labelGrayNormal, labelGraySmall } from 'theme/styles';

const labelHeight = 20;

const FineTempoKnob = ({ size = 72 }) => {
  const styles = {
    fineTempo: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: size,
      height: size + labelHeight,
    },

    labelWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    label: labelGrayNormal,

    controlWrapper: {
      position: 'relative',
      width: size,
      height: size,
    },

    knobWrapper: ring('75%'),

    knobLabelWrapper: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 20,
      width: '150%',
      bottom: '-23%',
      left: '50%',
      transform: 'translateX(-50%)',
    },

    knobLabel: {
      ...labelGraySmall,
      width: 35,
    },

    left: {
      textAlign: 'left',
    },

    right: {
      textAlign: 'right',
    },

    guides: {
      width: 4,
      height: 4,
      backgroundColor: gray,
      borderRadius: '50%',
    },
  };

  const ss = StyleSheet.create(styles);

  const knobSize = Math.ceil(size * 0.75);

  const value = useSelector(getFineTempo);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onFineTempoChange(value));
  }

  return (
    <div className={css(ss.fineTempo)}>
      <div className={css(ss.labelWrapper)}>
        <div className={css(ss.label)}>FINE</div>
      </div>
      <div className={css(ss.controlWrapper)}>
        <Guides num={11} distance={size * 0.48} hideCount={1} style={styles.guides} />
        <div className={css(ss.knobWrapper)}>
          <Knob value={value} onChange={onChange} bufferSize={300} min={-6.75} max={6.75} step={0.1} size={knobSize}>
            <KnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
      <div className={css(ss.knobLabelWrapper)}>
        <div className={css(ss.knobLabel, ss.right)}>SLOW</div>
        <div className={css(ss.knobLabel, ss.left)}>FAST</div>
      </div>
    </div>
  );
};

FineTempoKnob.propTypes = {
  size: PropTypes.number,
};

export default FineTempoKnob;
