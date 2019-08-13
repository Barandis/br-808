import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getSelectedMode } from 'store/selectors/common';
import { onModeChange } from 'store/actions';

import Knob from 'components/knob';
import Guides from 'components/guides';
import KnobInner from 'components/knob-inner';

import { gray } from 'theme/colors';
import { ring } from 'theme/styles';

const ModeKnob = ({ size = 100 }) => {
  const styles = {
    modeKnob: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: size,
      height: size,
    },

    constrolWrapper: {
      position: 'relative',
      width: size,
      height: size,
    },

    knobWrapper: ring('100%'),

    guides: {
      width: 5,
      height: 5,
      backgroundColor: gray,
      borderRadius: '50%',
    },
  };

  const ss = StyleSheet.create(styles);

  const value = useSelector(getSelectedMode);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onModeChange(value));
  }

  return (
    <div className={css(ss.modeKnob)}>
      <div className={css(ss.controlWrapper)}>
        <Guides num={6} distance={size * 0.58} hideCount={6} style={styles.guides} />
        <div className={css(ss.knobWrapper)}>
          <Knob value={value} onChange={onChange} size={size} bufferSize={150} min={0} max={5} step={1}>
            <KnobInner size={size} />
          </Knob>
        </div>
      </div>
    </div>
  );
};

ModeKnob.propTypes = {
  size: PropTypes.number,
};

export default ModeKnob;
