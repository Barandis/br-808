import React from 'react';
import PropTypes from 'prop-types';
import { FaSave } from 'react-icons/fa';
import { saveAs } from 'file-saver';

import { useSelector } from 'react-redux';
import { getStoreState } from 'store/selectors/common';
import { PERSISTANCE_FILTER } from 'store/constants';

import Button from 'components/button';

import { brightYellow, darkGray } from 'theme/colors';

const SaveButton = ({ size = 50 }) => {
  const styles = {
    saveButton: {
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

  const storeState = useSelector(getStoreState);

  function onClick() {
    const saved = {};
    for (const key of PERSISTANCE_FILTER) {
      saved[key] = storeState[key];
    }
    console.log(saved);

    const saveString = JSON.stringify(saved);
    const saveData = new Blob([saveString], {
      type: 'text/plain;charset=utf-8'
    });

    saveAs(saveData, 'br808.json');
  }

  return (
    <Button style={styles.saveButton} disabled={false} onClick={onClick}>
      <FaSave title="Save" style={styles.icon} />
    </Button>
  );
};

SaveButton.propTypes = {
  size: PropTypes.number,
};

export default SaveButton;
