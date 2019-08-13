import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getSelectedInstrumentTrack } from 'store/selectors/common';
import { onInstrumentTrackChange } from 'store/actions';

import Knob from 'components/knob';
import Guides from 'components/guides';
import KnobInner from 'components/knob-inner';

import { darkGray, paleYellow, brightOrange } from 'theme/colors';
import { fontFamily, normal, letterSpacing, small, fontWeight, unselectableText, ring } from 'theme/styles';

const guideNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const guideLabels = ['AC', 'BD', 'SD', 'LT', 'MT', 'HT', 'RS', 'CP', 'CB', 'CY', 'OH', 'CH'];

const InstrumentKnob = ({ size = 200 }) => {
  const knobSize = size - 75;
  const styles = {
    instrument: {
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
    },

    knobWrapper: ring(knobSize),

    numberGuides: {
      fontFamily,
      fontSize: small,
      fontWeight,
      letterSpacing,
      color: brightOrange,
      ...unselectableText,
    },

    labelGuides: {
      fontFamily,
      fontSize: normal,
      fontWeight: 'normal',
      letterSpacing,
      color: darkGray,
      backgroundColor: paleYellow,
      borderRadius: 3,
      textAlign: 'center',
      width: 27,
      paddingTop: 2,
      paddingBottom: 2,
      ...unselectableText,
    },
  };

  const ss = StyleSheet.create(styles);

  const value = useSelector(getSelectedInstrumentTrack);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onInstrumentTrackChange(value));
  }

  return (
    <div className={css(ss.instrument)}>
      <div className={css(ss.controlWrapper)}>
        <Guides distance={size * 0.3} offset={15} rotate={false} values={guideNumbers} style={styles.numberGuides} />
        <Guides distance={size * 0.45} offset={15} rotate={false} values={guideLabels} style={styles.labelGuides} />
        <div className={css(ss.knobWrapper)}>
          <Knob value={value} onChange={onChange} size={knobSize} bufferSize={330} min={0} max={11} step={1}>
            <KnobInner size={knobSize} />
          </Knob>
        </div>
      </div>
    </div>
  );
};

InstrumentKnob.propTypes = {
  size: PropTypes.number,
};

export default InstrumentKnob;
