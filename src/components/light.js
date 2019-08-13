import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { lightActive, lightInactive } from 'theme/colors';

const innerPadding = 4;

const Light = ({ active, size = 18 }) => {
  const baseInnerStyle = {
    position: 'absolute',
    left: innerPadding,
    right: innerPadding,
    top: innerPadding,
    bottom: innerPadding,
    borderRadius: '50%',
  };

  const styles = {
    lightOuter: {
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      width: size,
      height: size,
      borderRadius: '50%',
      pointerEvents: 'none',
    },

    lightInnerInactive: {
      ...baseInnerStyle,
      backgroundColor: lightInactive,
    },

    lightInnerActive: {
      ...baseInnerStyle,
      backgroundColor: lightActive,
      transition: 'opacity 0.1s',
      opacity: active ? 1 : 0,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.lightOuter)}>
      <div className={css(ss.lightInnerInactive)} />
      <div className={css(ss.lightInnerActive)} />
    </div>
  );
};

Light.propTypes = {
  active: PropTypes.bool.isRequired,
  size: PropTypes.number,
};

export default Light;
