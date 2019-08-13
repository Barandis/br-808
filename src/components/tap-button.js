import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { brightYellow } from 'theme/colors';
import { labelDarkGray } from 'theme/styles';

import Button from 'components/button';

const TapButton = ({ width, height }) => {
  const styles = {
    tapButton: {
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

    label: {
      ...labelDarkGray,
      cursor: 'inherit',
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <Button style={styles.tapButton}>
      <div className={css(ss.label)}>TAP</div>
    </Button>
  );
};

TapButton.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default TapButton;