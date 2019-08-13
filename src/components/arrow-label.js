import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { labelGrayNormal } from 'theme/styles';

const LEFT = 'left';
const RIGHT = 'right';

const ArrowLabel = ({ label, width, height, textColor, backgroundColor, direction }) => {
  const arrowEndWidth = height;
  const arrowShaftWidth = height / 4;
  const arrowShaftHeight = height / 3;
  const labelWrapperWidth = width - arrowEndWidth - arrowShaftWidth;

  const transparentSide = `${(arrowEndWidth * 3) / 8}px solid transparent`;
  const coloredSide = `${arrowEndWidth / 2}px solid ${backgroundColor}`;

  const styles = {
    arrow: {
      position: 'relative',
      width,
      height,
      display: 'flex',
      alignItems: 'center',
      flexDirection: direction === LEFT ? 'row-reverse' : 'row',
    },

    arrowPoint: {
      width: 0,
      height: 0,
      borderTop: transparentSide,
      borderBottom: transparentSide,
      [direction === LEFT ? 'borderRight' : 'borderLeft']: coloredSide,
    },

    arrowShaft: {
      position: 'relative',
      width: arrowShaftWidth,
      height: arrowShaftHeight,
      transform: 'scaleX(1.1)',
      backgroundColor,
    },

    labelWrapper: {
      width: labelWrapperWidth + arrowEndWidth / 2,
      height,
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1,
    },

    label: {
      ...labelGrayNormal,
      color: textColor,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.arrow)}>
      <div className={css(ss.labelWrapper)}>
        <div className={css(ss.label)}>{label}</div>
      </div>
      <div className={css(ss.arrowShaft)} />
      <div className={css(ss.arrowPoint)} />
    </div>
  );
};

ArrowLabel.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  direction: PropTypes.oneOf([LEFT, RIGHT]),
};

export default ArrowLabel;
