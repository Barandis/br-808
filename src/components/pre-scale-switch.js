import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getPreScalePosition } from 'store/selectors/common';
import { onPreScaleChange } from 'store/actions';

import Switch from 'components/switch';

import { black, darkerBlack } from 'theme/colors';
import { labelGrayNormal, labelGraySmall } from 'theme/styles';

const borderRadius = 2;
const titlePadding = 5;

const PreScaleSwitch = ({ offset = 0 }) => {
  const styles = {
    preScale: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      right: offset,
    },

    title: {
      ...labelGrayNormal,
      marginBottom: titlePadding,
    },

    switchWrapper: {
      position: 'relative',
    },

    labelWrapper: {
      position: 'absolute',
      height: '80%',
      top: '50%',
      right: -15,
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    label: labelGraySmall,

    switchInner: {
      backgroundColor: black,
      borderRadius,
    },

    switchOuter: {
      backgroundColor: darkerBlack,
      borderRadius,
    },
  };

  const ss = StyleSheet.create(styles);

  const position = useSelector(getPreScalePosition);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onPreScaleChange(value));
  }

  return (
    <div className={css(ss.preScale)}>
      <div className={css(ss.title)}>PRE-SCALE</div>
      <div className={css(ss.switchWrapper)}>
        <div className={css(ss.labelWrapper)}>
          <div className={css(ss.label)}>1</div>
          <div className={css(ss.label)}>2</div>
          <div className={css(ss.label)}>3</div>
          <div className={css(ss.label)}>4</div>
        </div>
        <Switch
          onChange={onChange}
          position={position}
          direction="vertical"
          numPositions={4}
          thickness={25}
          length={80}
          padding={4}
          innerThickness={21}
          outerStyle={styles.switchOuter}
          innerStyle={styles.switchInner}
        />
      </div>
    </div>
  );
};

PreScaleSwitch.propTypes = {
  offset: PropTypes.number,
};

export default PreScaleSwitch;
