import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { red, gray } from 'theme/colors';

const NO_OP = () => {};

const ClearButton = ({ onClick = NO_OP }) => {
  const styles = {
    clear: {
      position: 'relative',
    },

    button: {
      width: 27,
      height: 27,
      borderRadius: '50%',
      backgroundColor: red,
      border: `2px solid ${gray}`,
      cursor: 'pointer',
      ':hover': {
        transform: 'scale(1.08) translateZ(0)',
      },
      ':active': {
        transform: 'scale(1.0) translateZ(0)',
      },
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.clear)}>
      <div className={css(ss.button)} onClick={onClick} />
    </div>
  );
};

ClearButton.propTypes = {
  onClick: PropTypes.func,
};

export default ClearButton;
