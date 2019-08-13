import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector } from 'react-redux';
import getCurrentPart from 'store/selectors/current-part-display';

import Light from 'components/light';

import { labelGrayNormal } from 'theme/styles';

import { FIRST_PART, SECOND_PART } from 'store/constants';

const PartLights = ({ width, height, offset = 0 }) => {
  const currentPart = useSelector(getCurrentPart);
  const firstActive = currentPart === FIRST_PART;
  const secondActive = currentPart === SECOND_PART;

  const styles = {
    partLights: {
      position: 'relative',
      right: offset,
      width,
      height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 7,
    },

    partWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    label: {
      ...labelGrayNormal,
      marginTop: 4,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.partLights)}>
      <div className={css(ss.partWrapper)}>
        <Light active={firstActive} />
        <div className={css(ss.label)}>1st PART</div>
      </div>
      <div className={css(ss.partWrapper)}>
        <Light active={secondActive} />
        <div className={css(ss.label)}>2nd PART</div>
      </div>
    </div>
  );
};

PartLights.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  offset: PropTypes.number,
};

export default PartLights;
