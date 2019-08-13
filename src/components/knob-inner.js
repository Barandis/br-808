import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import Guides from 'components/guides';

import { ring } from 'theme/styles';
import { black, darkerBlack, knobInner, knobHandle } from 'theme/colors';

const GUIDE_SIZE = 6;

const KnobInner = ({ size }) => {
  const styles = {
    spokes: ring(size - 20, darkerBlack),

    knobInner: {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: black,
      width: size,
      height: size,
    },

    inner: {
      ...ring(size - 30, knobInner),
      ...(size < 60 ? { width: size - 8, height: size - 8 } : {}),
    },

    lowerHandle: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 8,
      height: 15,
      backgroundColor: knobInner,
      opacity: 0.6,
    },

    handle: {
      position: 'absolute',
      top: '8.5%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 5,
      height: 15,
      backgroundColor: knobHandle,
      borderRadius: 1,
    },

    guides: {
      width: GUIDE_SIZE,
      height: GUIDE_SIZE,
      borderRadius: '50%',
      backgroundColor: black,
    },
  };

  const ss = StyleSheet.create(styles);

  const guides = size > 90 ? <Guides num={60} distance={size / 2 - 9.5} style={styles.guides} /> : null;
  const spokes = size > 60 ? <div className={css(ss.spokes)} /> : null;

  return (
    <div className={css(ss.knobInner)}>
      {spokes}
      {guides}
      <div className={css(ss.lowerHandle)} />
      <div className={css(ss.inner)} />
      <div className={css(ss.handle)} />
    </div>
  );
};

KnobInner.propTypes = {
  size: PropTypes.number.isRequired,
};

export default KnobInner;
