import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getAutoFillInPosition } from 'store/selectors/common';
import { onAutoFillInChange } from 'store/actions';

import Knob from 'components/knob';
import Guides from 'components/guides';
import KnobInner from 'components/knob-inner';

import { gray } from 'theme/colors';
import { ring, labelGraySmall, labelGrayLarge } from 'theme/styles';

const labelHeight = 33;

const guideValues = [<div style={{ transform: 'translateX(-15px)' }} key={1}>MANUAL</div>, 16, 12, 8, 4, 2];
guideValues.push();

const AutoFillInKnob = ({ size = 100 }) => {
  const knobSize = size - 75;

  const styles = {
    autoFillIn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: size,
      height: size,
    },

    controlWrapper: {
      position: 'relative',
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
    },

    knobWrapper: ring(knobSize),

    labelWrapper: {
      position: 'relative',
      top: -30,
      width: size,
      height: labelHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    measuresLabel: labelGraySmall,

    autoLabel: {
      position: 'relative',
      top: -2,
      ...labelGrayLarge,
    },

    labelGuides: labelGraySmall,

    dotGuides: {
      width: 5,
      height: 5,
      backgroundColor: gray,
      borderRadius: '50%',
    }
  };

  const ss = StyleSheet.create(styles);

  const value = useSelector(getAutoFillInPosition);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onAutoFillInChange(value));
  }

  return (
    <div className={css(ss.autoFillIn)}>
      <div className={css(ss.controlWrapper)}>
        <Guides num={6} distance={size * 0.29} hideCount={6} style={styles.dotGuides} />
        <Guides distance={size * 0.37} hideCount={5.5} values={guideValues} rotate={false} style={styles.labelGuides} />
        <div className={css(ss.knobWrapper)}>
          <Knob value={value} onChange={onChange} size={knobSize} bufferSize={150} min={0} max={5} step={1}>
            <KnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
      <div className={css(ss.labelWrapper)}>
        <div className={css(ss.measuresLabel)}>MEASURES</div>
        <div className={css(ss.autoLabel)}>AUTO FILL IN</div>
      </div>
    </div>
  );
};

AutoFillInKnob.propTypes = {
  size: PropTypes.number,
};

export default AutoFillInKnob;
