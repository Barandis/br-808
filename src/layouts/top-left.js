import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { gray, paleYellow, brightOrange, red } from 'theme/colors';
import { labelGraySmall } from 'theme/styles';

import {
  separator,
  rhythmToCompose,
  rhythmToPlay,
  patternToInstrument,
  manualPlay,
  firstToSecondPart,
  patternToParts,
  patternWriteToClear,
  modeToPatternClear,
  patternLabelToButton,
  composeToTrackClear,
} from 'layouts/paths/top-left-section';

import ClearButton from 'components/clear-button';
import AutoFillInKnob from 'components/auto-fill-in-knob';
import TempoKnob from 'components/tempo-knob';
import FineTempoKnob from 'components/fine-tempo-knob';
import InstrumentKnob from 'components/instrument-knob';
import ModeKnob from 'components/mode-knob';

const TopLeftSection = ({ width, height }) => {
  const labelBase = {
    ...labelGraySmall,
    position: 'absolute',
    lineHeight: 0.9,
  };

  const labelBorder = color => ({
    padding: 2,
    border: `1px solid ${color}`,
    borderRadius: 1,
  });

  const labelStyles = {
    firstPart: {
      ...labelBase,
      color: paleYellow,
      textAlign: 'left',
      width: 20,
      top: -10,
      left: -25,
    },
    secondPart: {
      ...labelBase,
      color: paleYellow,
      textAlign: 'left',
      width: 20,
      top: -28,
      left: 0,
    },
    manualPlay: {
      ...labelBase,
      color: gray,
      width: 51,
      height: 22,
      top: -34,
      left: 57,
      border: `1px solid ${gray}`,
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    play: {
      ...labelBase,
      color: brightOrange,
      width: 30,
      top: -1,
      right: -29,
    },
    compose: {
      ...labelBase,
      color: brightOrange,
      width: 20,
      top: 18,
      right: -29,
    },
    patternWrite: {
      ...labelBase,
      color: paleYellow,
      top: 2,
      left: 20,
      ...labelBorder(paleYellow),
    },
    instrumentSelect: {
      ...labelBase,
      position: 'static',
      width: 122,
      marginTop: 2,
      color: paleYellow,
      ...labelBorder('rgba(0, 0, 0, 0)'),
    },
    rhythmTrack: {
      ...labelBase,
      position: 'static',
      width: 115,
      marginTop: 1,
      color: brightOrange,
      ...labelBorder(brightOrange),
    },
    patternClear: {
      ...labelBase,
      color: paleYellow,
      top: 168,
      left: 30,
      ...labelBorder(paleYellow),
    },
    trackClear: {
      ...labelBase,
      color: brightOrange,
      left: '107%',
      bottom: '55%',
    },
    stepNumber: {
      ...labelBase,
      width: 45,
      color: paleYellow,
      right: '110%',
      bottom: '55%',
    },
    preScale: {
      ...labelBase,
      width: 45,
      color: paleYellow,
      right: '110%',
      top: '55%',
    },
  };

  const styles = {
    topLeft: {
      width,
      height,
      position: 'relative',
    },
    stencilWrapper: {
      position: 'absolute',
      width,
      height,
      top: 0,
      left: 0,
    },
    instrumentSelectorWrapper: {
      marginTop: 5,
    },
    modeWrapper: {
      position: 'absolute',
      top: 114,
      left: 75,
      transform: 'translateX(-50%) translateY(-50%)',
    },
    clearWrapper: {
      position: 'absolute',
      top: 202,
      left: 61,
    },
    clearButton: {
      width: 27,
      height: 27,
      borderRadius: '50%',
      backgroundColor: red,
      border: `2px solid ${gray}`,
    },
    autoFillInWrapper: {
      marginTop: 20,
    },
    tempoWrapper: {
      position: 'absolute',
      bottom: 7,
      left: 0,
    },
    fineTempoWrapper: {
      position: 'absolute',
      right: 70,
      bottom: 40,
      transform: 'translateX(50%)',
    },
  };

  const alignStyles = {
    tempoAndAutoFill: {
      position: 'absolute',
      top: 0,
      right: 7,
      width: 149,
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  };

  const ls = StyleSheet.create(labelStyles);
  const ss = StyleSheet.create(styles);
  const as = StyleSheet.create(alignStyles);

  return (
    <div className={css(ss.topLeft)}>
      <div className={css(ss.stencilWrapper)}>
        <div className={css(ls.patternWrite)}>PATTERN WRITE</div>
        <div className={css(ls.patternClear)}>PATTERN CLEAR</div>
        <svg width={width} height={height}>
          <path d={separator} stroke={gray} fill="none" strokeWidth={2} />
          <path d={rhythmToCompose} stroke={brightOrange} fill="none" strokeWidth={1} />
          <path d={rhythmToPlay} stroke={brightOrange} fill="none" strokeWidth={1} />
          <path d={patternToInstrument} stroke={paleYellow} fill="none" strokeWidth={1} />
          <path d={manualPlay} stroke={gray} fill="none" strokeWidth={1} />
          <path d={firstToSecondPart} stroke={paleYellow} fill="none" strokeWidth={1} />
          <path d={patternToParts} stroke={paleYellow} fill="none" strokeWidth={1} />
          <path d={patternWriteToClear} stroke={paleYellow} fill="none" strokeWidth={1} />
          <path d={modeToPatternClear} stroke={paleYellow} fill="none" strokeWidth={1} />
          <path d={patternLabelToButton} stroke={paleYellow} fill="none" strokeWidth={1} />
          <path d={composeToTrackClear} stroke={brightOrange} fill="none" strokeWidth={1} />
        </svg>
      </div>
      <div className={css(as.tempoAndAutoFill)}>
        <div className={css(ls.instrumentSelect)}>INSTRUMENT-SELECT</div>
        <div className={css(ls.rhythmTrack)}>RHYTHM TRACK</div>
        <div className={css(ss.instrumentSelectorWrapper)}>
          <InstrumentKnob size={151} value={1} />
        </div>
        <div className={css(ss.autoFillInWrapper)}>
          <AutoFillInKnob size={151} value={0} />
        </div>
      </div>
      <div className={css(ss.modeWrapper)}>
        <div className={css(ls.firstPart)}>1st PART</div>
        <div className={css(ls.secondPart)}>2nd PART</div>
        <div className={css(ls.manualPlay)}>MANUAL PLAY</div>
        <div className={css(ls.play)}>PLAY</div>
        <div className={css(ls.compose)}>COM- POSE</div>
        <ModeKnob size={76} value={1} />
      </div>
      <div className={css(ss.clearWrapper)}>
        <div className={css(ls.trackClear)}>TRACK CLEAR</div>
        <div className={css(ls.stepNumber)}>STEP NUMBER</div>
        <div className={css(ls.preScale)}>PRE- SCALE</div>
        <ClearButton style={ss.clearButton} />
      </div>
      <div className={css(ss.tempoWrapper)}>
        <TempoKnob size={180} />
      </div>
      <div className={css(ss.fineTempoWrapper)}>
        <FineTempoKnob size={70} value={0} />
      </div>
    </div>
  );
};

TopLeftSection.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default TopLeftSection;
