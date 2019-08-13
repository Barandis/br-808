import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { brightYellow, darkGray } from 'theme/colors';
import { labelDarkGray } from 'theme/styles';

import Button from 'components/button';

const StartStopButton = ({ width, height }) => {
  const styles = {
    startStopButton: {
      width,
      height,
      backgroundColor: brightYellow,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: 11,
      borderRadius: 4,
    },

    separator: {
      height: 1,
      margin: 3,
      backgroundColor: darkGray,
    },

    label: {
      ...labelDarkGray,
      lineHeight: '13px',
      cursor: 'inherit',
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <Button style={styles.startStopButton}>
      <div className={css(ss.label)}>START</div>
      <div className={css(ss.separator)} />
      <div className={css(ss.label)}>STOP</div>
    </Button>
  );
};

StartStopButton.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default StartStopButton;
