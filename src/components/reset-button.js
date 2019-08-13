import React from 'react';
import PropTypes from 'prop-types';
import { FaUndo } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { getPlaying } from 'store/selectors/common';
import { onReset } from 'store/actions';

import Button from 'components/button';

import { brightYellow, darkGray } from 'theme/colors';

const ResetButton = ({ size = 50 }) => {
  const styles = {
    resetButton: {
      width: size,
      height: size,
      borderRadius: 4,
      backgroundColor: brightYellow,
      marginLeft: 5,
      marginRight: 5,
    },
    icon: {
      width: size,
      height: size,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: darkGray,
      transform: 'scale(0.7)',
    },
  };

  const disabled = useSelector(getPlaying);
  const dispatch = useDispatch();

  function onClick() {
    if (window.confirm('Are you sure you want to reset the sequencer?')) {
      dispatch(onReset());
    }
  }

  return (
    <Button style={styles.resetButton} disabled={disabled} onClick={onClick}>
      <FaUndo title="Reset" style={styles.icon} />
    </Button>
  );
};

ResetButton.propTypes = {
  size: PropTypes.number,
};

export default ResetButton;
