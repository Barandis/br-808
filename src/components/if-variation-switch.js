import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getIntroFillVariationPosition } from 'store/selectors/common';
import { onIfVariationChange } from 'store/actions';

import Switch from 'components/switch';

import { gray, black, silver } from 'theme/colors';
import { labelDarkGray } from 'theme/styles';

const IFVariationSwitch = () => {
  const thickness = 30;
  const length = 65;

  const styles = {
    ifVariation: {
      minWidth: length * 1.8,
      height: 69,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    switchTitle: labelDarkGray,

    label: labelDarkGray,

    switchWrapper: {
      width: length,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    labelWrapper: {
      width: length - 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 5,
    },

    switchOuter: {
      backgroundColor: black,
      borderRadius: thickness * 0.475,
    },

    switchInner: {
      backgroundColor: silver,
      borderRadius: '50%',
      border: `2px solid ${gray}`,
    },
  };

  const ss = StyleSheet.create(styles);

  const position = useSelector(getIntroFillVariationPosition);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onIfVariationChange(value));
  }

  return (
    <div className={css(ss.ifVariation)}>
      <div className={css(ss.switchTitle)}>I / F - VARIATION</div>
      <div className={css(ss.switchWrapper)}>
        <Switch
          position={position}
          onChange={onChange}
          direction="horizontal"
          numPositions={2}
          thickness={thickness}
          length={length}
          padding={4}
          innerThickness={thickness - 8}
          outerStyle={styles.switchOuter}
          innerStyle={styles.switchInner}
        />
        <div className={css(ss.labelWrapper)}>
          <div className={css(ss.label)}>A</div>
          <div className={css(ss.label)}>B</div>
        </div>
      </div>
    </div>
  );
};

export default IFVariationSwitch;
