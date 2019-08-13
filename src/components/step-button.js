import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import createActiveSelector from 'store/selectors/step-button';
import { onStepButtonClick } from 'store/actions';

import Button from 'components/button';
import Light from 'components/light';

const StepButton = ({ index, color, width = 50, height = 80 }) => {
  const styles = {
    stepButton: {
      width,
      height,
      backgroundColor: color,
      borderRadius: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
    },

    upper: {
      width,
      height: height - 32,
      backgroundColor: 'transparent',
      borderRadius: 4,
      boxShadow: '0 -1px 2px rgba(0, 0, 0, 0.5)',
    },
  };

  const ss = StyleSheet.create(styles);

  const selector = createActiveSelector(index);
  const active = useSelector(selector);
  const dispatch = useDispatch();

  function onClick() {
    dispatch(onStepButtonClick(index));
  }

  return (
    <Button style={styles.stepButton} onClick={onClick}>
      <Light active={active} />
      <div className={css(ss.upper)} />
    </Button>
  );
};

StepButton.propTypes = {
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default StepButton;
