import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getTempo } from 'store/selectors/common';
import { onTempoChange } from 'store/actions';

import Knob from 'components/knob';
import Guides from 'components/guides';
import KnobInner from 'components/knob-inner';

import { gray, darkGray } from 'theme/colors';
import { ring, labelGrayLarge, unselectableText, fontFamily, normal, fontWeight, letterSpacing } from 'theme/styles';

const guideNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const guideValues = [];
for (let i = 0; i < 41; i++) {
  const size = i % 4 === 0 ? 5 : 4;
  guideValues.push(<div style={{ width: size, height: size, backgroundColor: gray, borderRadius: '50%' }} />);
}

const labelHeight = 25;

const TempoKnob = ({ size = 216 }) => {
  const innerSize = size - 30;
  const knobSize = Math.floor(size * 0.75);

  const styles = {
    tempoKnob: {
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

    label: labelGrayLarge,

    controlWrapper: {
      position: 'relative',
      width: size,
      height: size,
    },

    ringOuter: ring(size, gray),
    ringInner: ring(innerSize, darkGray),
    knobWrapper: ring(knobSize),

    labelGuides: {
      fontFamily,
      fontWeight,
      letterSpacing,
      fontSize: normal,
      color: darkGray,
      ...unselectableText,
    },
  };

  const ss = StyleSheet.create(styles);

  const value = useSelector(getTempo);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onTempoChange(value));
  }

  return (
    <div className={css(ss.tempoKnob)}>
      <div className={css(ss.labelWrapper)}>
        <div className={css(ss.label)}>TEMPO</div>
      </div>
      <div className={css(ss.controlWrapper)}>
        <div className={css(ss.ringOuter)}>
          <Guides
            distance={size - 97.5}
            hideCount={1}
            values={guideNumbers}
            rotate={false}
            style={styles.labelGuides}
          />
          <div className={css(ss.ringInner)}>
            <Guides num={41} distance={size - 109} hideCount={7} values={guideValues} />
            <div className={css(ss.knobWrapper)}>
              <Knob value={value} onChange={onChange} size={knobSize} bufferSize={300} min={30} max={300} step={6.75}>
                <KnobInner size={knobSize} />
              </Knob>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TempoKnob.propTypes = {
  size: PropTypes.number,
};

export default TempoKnob;
