import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FaFolderOpen } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { getPlaying } from 'store/selectors/common';
import { onStateLoad } from 'store/actions';

import Button from 'components/button';

import { brightYellow, darkGray } from 'theme/colors';
import { PERSISTANCE_FILTER } from 'store/constants';

const LoadButton = ({ size = 50 }) => {
  const styles = {
    loadButton: {
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
    input: {
      display: 'none',
    },
  };

  const fileUpload = useRef(null);
  const disabled = useSelector(getPlaying);
  const dispatch = useDispatch();

  function validateState(loadedState) {
    for (const property in loadedState) {
      if (Object.prototype.hasOwnProperty.call(loadedState, property)) {
        if (!PERSISTANCE_FILTER.includes(property)) {
          return false;
        }
      }
    }
    return true;
  }

  function handleFileChange() {
    const files = fileUpload.current.files;
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const loadedState = JSON.parse(reader.result);
        if (validateState(loadedState)) {
          dispatch(onStateLoad(loadedState));
        } else {
          window.alert('Sorry, the chosen BR-808 save is invalid.');
        }
      };

      reader.readAsText(file);
    } else {
      window.alert('Please only upload one BR-808 save at a time.');
    }
  }

  function onClick() {
    fileUpload.current.click();
  }

  return (
    <Button style={styles.loadButton} disabled={disabled} onClick={onClick}>
      <input ref={fileUpload} type="file" style={styles.input} onChange={handleFileChange} />
      <FaFolderOpen title="Load" style={styles.icon} />
    </Button>
  );
};

LoadButton.propTypes = {
  size: PropTypes.number,
};

export default LoadButton;
