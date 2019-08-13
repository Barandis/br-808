/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { gray, darkGray, red, orange, yellow, offWhite, paleYellow } from 'theme/colors';
import { labelDarkGray, labelGrayNormal, labelGrayXlarge } from 'theme/styles';

import BasicVariationSwitch from 'components/basic-variation-switch';
import StartStopButton from 'components/start-stop-button';
import IFVariationSwitch from 'components/if-variation-switch';
import TapButton from 'components/tap-button';
import PreScaleSwitch from 'components/pre-scale-switch';
import PartLights from 'components/part-lights';
import StepButton from 'components/step-button';

import TimeSignatureSection from 'layouts/time-signature';
import ArrowLabel from 'components/arrow-label';

const RHYTHM_LABELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4];
const STEP_BUTTON_COLORS = [
  red,
  red,
  red,
  red,
  orange,
  orange,
  orange,
  orange,
  yellow,
  yellow,
  yellow,
  yellow,
  offWhite,
  offWhite,
  offWhite,
  offWhite,
];

function generateStepButtons(width, buttonHeight, labelHeight, bottomHeight, padding) {
  const stepButtons = [];
  const stepButtonWidth = width / 16 - (padding * 15) / 16;
  const stepButtonHeight = buttonHeight - padding;

  const styles = {
    bottomLayout: {
      width: stepButtonWidth,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    stepLabelWrapper: {
      height: labelHeight,
      display: 'flex',
      alignItems: 'center',
    },

    stepLabel: {
      ...labelGrayNormal,
      color: paleYellow,
    },

    rhythmLabelWrapper: {
      marginTop: padding,
      height: bottomHeight,
      display: 'flex',
      alignItems: 'center',
    },

    rhythmLabel: {
      ...labelGrayXlarge,
      color: darkGray,
    },
  };

  const ss = StyleSheet.create(styles);

  for (let index = 0; index < 16; index++) {
    stepButtons.push(
      <div key={`stepbutton-${index}`} className={css(ss.bottomLayout)}>
        <div className={css(ss.stepLabelWrapper)}>
          <div className={css(ss.stepLabel)}>{index + 1}</div>
        </div>
        <StepButton index={index} width={stepButtonWidth} height={stepButtonHeight} color={STEP_BUTTON_COLORS[index]} />
        <div className={css(ss.rhythmLabelWrapper)}>
          <div className={css(ss.rhythmLabel)}>{RHYTHM_LABELS[index]}</div>
        </div>
      </div>
    );
  }

  return stepButtons;
}

const BottomSection = ({ width, height, topLeftWidth }) => {
  const bgPadding = 10;
  const bgBorderRadius = 8;
  const bgBottomHeight = ~~((height - bgPadding) * 0.17);
  const bgCenterHeight = height - bgPadding - bgBottomHeight;

  const leftWidth = ~~(width * 0.1375);
  const rightWidth = ~~(width * 0.12);

  const sequencerWidth = width - (leftWidth + rightWidth);
  const sequencerHeight = height - bgBottomHeight - bgPadding;
  const preScaleWidth = topLeftWidth - leftWidth;
  const stepsWidth = sequencerWidth - preScaleWidth - bgPadding;

  const quarterStepWidth = stepsWidth / 4 - (bgPadding * 3) / 4;

  const bgBottomLeftWidth = leftWidth + preScaleWidth + quarterStepWidth * 3 + bgPadding * 2;
  const bgBottomRightWidth = rightWidth + quarterStepWidth + bgPadding;

  const timeSigHeight = Math.ceil(sequencerHeight * 0.5);
  const stepControlHeight = sequencerHeight - timeSigHeight;

  const leftHeight = height - bgPadding - bgBottomHeight;

  const stepButtonLabelHeight = 18;
  const stepButtonHeight = stepControlHeight - stepButtonLabelHeight;
  const stepButtonSectionHeight = stepButtonLabelHeight + stepButtonHeight + bgBottomHeight;

  const arrowLabelHeight = stepButtonLabelHeight;

  function horizontalSeparatorStyle(thickness) {
    return {
      height: thickness,
      backgroundColor: darkGray,
    };
  }

  const styles = {
    wrapper: {
      width,
      height,
      position: 'relative',
    },

    controlWrapper: {
      position: 'absolute',
      width,
      height,
      left: 0,
      top: bgPadding,
    },

    sequencerSection: {
      position: 'absolute',
      width: sequencerWidth,
      height: sequencerHeight,
      top: 0,
      left: leftWidth,
    },

    leftSection: {
      position: 'absolute',
      width: leftWidth,
      height: leftHeight,
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      padding: bgPadding,
    },

    buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    darkGrayButtonLabel: {
      ...labelDarkGray,
      cursor: 'inherit',
    },

    darkGrayLabel: labelDarkGray,

    rightSection: {
      position: 'absolute',
      width: rightWidth,
      height: leftHeight,
      top: 0,
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      padding: bgPadding,
    },

    fillInButtonLabelWrapper: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },

    preScaleSection: {
      position: 'absolute',
      width: preScaleWidth,
      height: sequencerHeight,
      top: 0,
      left: leftWidth,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    preScaleBottomSection: {
      width: '100%',
      height: stepControlHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    stepButtonSection: {
      position: 'absolute',
      width: stepsWidth,
      height: stepButtonSectionHeight,
      top: stepControlHeight,
      left: leftWidth + preScaleWidth,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
    },

    basicRhythmArrowWrapper: {
      position: 'absolute',
      width: leftWidth + preScaleWidth,
      height: bgBottomHeight,
      left: 25,
      top: bgCenterHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    ifArrowWrapper: {
      position: 'absolute',
      width: rightWidth,
      height: bgBottomHeight,
      right: 12.5,
      top: bgCenterHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  const backgroundStyles = {
    wrapper: {
      width,
      height: height - bgPadding,
      position: 'absolute',
      bottom: 0,
      left: 0,
    },

    left: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: leftWidth,
      height: height - bgPadding,
      backgroundColor: gray,
      borderRadius: bgBorderRadius,
    },

    right: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: rightWidth,
      height: height - bgPadding,
      backgroundColor: gray,
      borderRadius: bgBorderRadius,
    },

    center: {
      position: 'absolute',
      top: 0,
      left: leftWidth,
      right: rightWidth,
      height: bgCenterHeight,
      backgroundColor: darkGray,
      borderRadius: bgBorderRadius,
    },

    bottomLeft: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: bgBottomLeftWidth,
      height: bgBottomHeight,
      backgroundColor: gray,
      borderRadius: bgBorderRadius,
    },

    bottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: bgBottomRightWidth,
      height: bgBottomHeight,
      backgroundColor: gray,
      borderRadius: bgBorderRadius,
    },

    leftFiller: {
      position: 'absolute',
      bottom: bgBottomHeight,
      left: leftWidth,
      transform: 'translateX(-50%)',
      width: 20,
      height: 20,
      backgroundColor: gray,
    },

    rightFiller: {
      position: 'absolute',
      bottom: bgBottomHeight,
      right: rightWidth,
      transform: 'translateX(-50%)',
      width: 20,
      height: 20,
      backgroundColor: gray,
    },

    timeSignatureSectionWrapper: {
      position: 'absolute',
      width: stepsWidth,
      height: timeSigHeight,
      top: 0,
      left: leftWidth + preScaleWidth,
    },
  };

  const ss = StyleSheet.create(styles);
  const bg = StyleSheet.create(backgroundStyles);

  return (
    <div className={css(ss.wrapper)}>
      <div className={css(bg.wrapper)}>
        <div className={css(bg.left)} />
        <div className={css(bg.right)} />
        <div className={css(bg.bottomLeft)} />
        <div className={css(bg.bottomRight)} />
        <div className={css(bg.leftFiller)} />
        <div className={css(bg.rightFiller)} />
        <div className={css(bg.center)} />
        <div className={css(bg.timeSignatureSectionWrapper)}>
          <TimeSignatureSection
            width={stepsWidth}
            height={timeSigHeight}
            stepPadding={bgPadding}
            quarterStepWidth={quarterStepWidth}
          />
        </div>
      </div>
      <div className={css(ss.controlWrapper)}>
        <div className={css(ss.leftSection)}>
          <BasicVariationSwitch />
          <div style={horizontalSeparatorStyle(2)} />
          <div className={css(ss.buttonWrapper)}>
            <StartStopButton height={leftHeight * 0.25} width={leftWidth * 0.7} />
          </div>
        </div>
        <div className={css(ss.rightSection)}>
          <IFVariationSwitch />
          <div style={horizontalSeparatorStyle(2)} />
          <div className={css(ss.fillInButtonLabelWrapper)}>
            <div className={css(ss.darkGrayLabel)}>INTRO SET</div>
            <div style={{ ...horizontalSeparatorStyle(1), margin: 3 }} />
            <div className={css(ss.darkGrayLabel)}>FILL IN TRIGGER</div>
          </div>
          <div className={css(ss.buttonWrapper)}>
            <TapButton height={leftHeight * 0.25} width={leftHeight * 0.25} />
          </div>
        </div>
        <div className={css(ss.preScaleSection)}>
          <PreScaleSwitch position={2} offset={stepButtonLabelHeight / 3} />
          <div className={css(ss.preScaleBottomSection)}>
            <ArrowLabel
              label="STEP NO"
              width={preScaleWidth - 20}
              height={arrowLabelHeight}
              textColor={darkGray}
              backgroundColor={gray}
              direction="right"
            />
            <PartLights offset={stepButtonLabelHeight / 3} width={preScaleWidth} height={stepButtonHeight} />
          </div>
        </div>
        <div className={css(ss.stepButtonSection)}>
          {generateStepButtons(stepsWidth, stepButtonHeight, stepButtonLabelHeight, bgBottomHeight, bgPadding)}
        </div>
        <div className={css(ss.basicRhythmArrowWrapper)}>
          <ArrowLabel
            label="BASIC RHYTHM"
            width={140}
            height={25}
            direction="right"
            textColor={gray}
            backgroundColor={darkGray}
          />
        </div>
        <div className={css(ss.ifArrowWrapper)}>
          <ArrowLabel
            label="INTRO/FILL IN"
            width={140}
            height={25}
            direction="left"
            textColor={gray}
            backgroundColor={darkGray}
          />
        </div>
      </div>
    </div>
  );
};

BottomSection.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  topLeftWidth: PropTypes.number.isRequired,
};

export default BottomSection;
