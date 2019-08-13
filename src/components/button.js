import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { gray } from 'theme/colors';

const Button = ({ children, onClick = () => {}, style = {}, disabled = false }) => {
  const styles = {
    button: {
      backgroundColor: gray,
      width: 80,
      height: 40,
      transition: 'transform cubic-bezier(0.4, 0.0, 0.2, 1) 0.1s, opacity 0.5s',
      transform: 'scale(1.0), translateZ(0)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      ':hover': {
        cursor: 'pointer',
        transform: style && style.transform ? style.transform : 'scale(1.04) translateZ(0)',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      },
      ':active': {
        transform: style && style.transform ? style.transform : 'scale(1.0) translateZ(0)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      },
      userSelect: 'none',
      pointerEvents: disabled ? 'none' : 'auto',
      opacity: disabled ? 0.5 : 1,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.button)} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
