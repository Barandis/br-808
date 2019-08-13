import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { gray, darkGray } from 'theme/colors';

import {
  quarterNotePath,
  quarterViewBox,
  eighthNotePath,
  eightViewBox,
  noteLinePath,
} from 'layouts/paths/time-signature';

const TimeSignatureSection = ({ width, height, stepPadding, quarterStepWidth }) => {
  const borderRadius = 6;
  const verticalPadding = 2;
  const rowHeight = height / 4 - verticalPadding * 0.75;

  const halfStepWidth = (width - stepPadding) / 2;
  const tripletStepWidth = quarterStepWidth * 1.5 + stepPadding * 0.5;
  const sixthStepWidth = tripletStepWidth * 0.5 - stepPadding * 0.5;

  const noteHeight = 16;
  const notePadding = quarterStepWidth / 12;
  const quarterWidth = 9;
  const eighthWidth = 11;

  const baseStepStyle = {
    position: 'relative',
    height: rowHeight,
    borderRadius,
    backgroundColor: gray,
    flexShrink: 0,
    marginRight: stepPadding,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: notePadding,
    paddingRight: notePadding,
  };

  const styles = {
    timeSignature: {
      position: 'relative',
      width,
      height,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    row: {
      position: 'relative',
      width,
      height: rowHeight,
      display: 'flex',
      overflow: 'hidden',
    },

    halfStep: {
      ...baseStepStyle,
      width: halfStepWidth,
    },

    quarterStep: {
      ...baseStepStyle,
      width: quarterStepWidth,
    },

    tripletStep: {
      ...baseStepStyle,
      width: tripletStepWidth,
      paddingRight: baseStepStyle.paddingRight + quarterStepWidth / 3.8,
    },

    sixthStep: {
      ...baseStepStyle,
      width: sixthStepWidth,
    },

    linePadding: {
      position: 'absolute',
      width: 5,
      height: rowHeight,
      top: 0,
      right: 0,
      backgroundColor: gray,
    },

    sixthLineWrapper: {
      position: 'absolute',
      width: sixthStepWidth,
      height: rowHeight,
      top: 0,
      left: notePadding,
    },

    tripletLineWrapper: {
      position: 'absolute',
      width: tripletStepWidth,
      height: rowHeight,
      top: 0,
      left: notePadding,
    },
  };

  const ss = StyleSheet.create(styles);

  const EighthNote = ({ visible = false }) => (
    <svg viewBox={eightViewBox} width={eighthWidth} height={noteHeight}>
      <path d={eighthNotePath} fill={visible ? darkGray : 'none'} />
    </svg>
  );

  EighthNote.propTypes = {
    visible: PropTypes.bool,
  };

  const QuarterNote = () => (
    <svg viewBox={quarterViewBox} width={quarterWidth} height={noteHeight}>
      <path d={quarterNotePath} fill={darkGray} />
    </svg>
  );

  const LinePadding = () => <div className={css(ss.linePadding)} />;

  const SixthLine = () => {
    const path = noteLinePath(eighthWidth + 7, quarterStepWidth / 2, 8);
    return (
      <div className={css(ss.sixthLineWrapper)}>
        <svg width={sixthStepWidth} height={rowHeight}>
          <path d={path} stroke={darkGray} fill="none" />
        </svg>
      </div>
    );
  };

  const SixthStep = () => (
    <div className={css(ss.sixthStep)}>
      <SixthLine />
      <EighthNote visible />
      <EighthNote visible />
      <EighthNote visible />
    </div>
  );

  const TripletLine = () => {
    const path = noteLinePath(eighthWidth + 7, tripletStepWidth - quarterStepWidth / 2, 17);
    return (
      <div className={css(ss.tripletLineWrapper)}>
        <svg width={tripletStepWidth} height={rowHeight}>
          <path d={path} stroke={darkGray} fill="none" />
        </svg>
      </div>
    );
  };
  
  const TripletStep = () => (
    <div className={css(ss.tripletStep)}>
      <TripletLine />
      <EighthNote visible />
      <EighthNote />
      <EighthNote visible />
      <EighthNote />
      <EighthNote visible />
    </div>
  );

  const QuarterStep = () => (
    <div className={css(ss.quarterStep)}>
      <QuarterNote />
    </div>
  );

  const HalfStep = () => (
    <div className={css(ss.halfStep)}>
      <QuarterNote />
    </div>
  );

  return (
    <div className={css(ss.timeSignature)}>
      <div className={css(ss.row)}>
        <SixthStep />
        <SixthStep />
        <SixthStep />
        <SixthStep />
        <SixthStep />
        <SixthStep />
        <LinePadding />
      </div>
      <div className={css(ss.row)}>
        <TripletStep />
        <TripletStep />
        <TripletStep />
        <LinePadding />
      </div>
      <div className={css(ss.row)}>
        <QuarterStep />
        <QuarterStep />
        <QuarterStep />
        <QuarterStep />
      </div>
      <div className={css(ss.row)}>
        <HalfStep />
        <HalfStep />
      </div>
    </div>
  );
};

TimeSignatureSection.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  stepPadding: PropTypes.number,
  quarterStepWidth: PropTypes.number,
};

export default TimeSignatureSection;
