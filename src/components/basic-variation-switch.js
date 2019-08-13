import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { getBasicVariationPosition } from 'store/selectors/common';
import getBasicVariation from 'store/selectors/variation';
import { onBasicVariationChange } from 'store/actions';

import Light from 'components/light';
import Switch from 'components/switch';

import { gray, black, silver } from 'theme/colors';
import { labelDarkGray } from 'theme/styles';

import { A_VARIATION, B_VARIATION, AB_VARIATION } from 'store/constants';

const BasicVariationSwitch = () => {
  const thickness = 30;
  const length = 80;

  const styles = {
    basicVariation: {
      minWidth: length * 1.8,
      height: 110,
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
      paddingTop: 10,
      borderRadius: 1,
    },

    lightsWrapper: {
      width: length,
      height: thickness - 3,
      backgroundColor: black,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 4,
      borderRadius: 2,
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

  const position = useSelector(getBasicVariationPosition);
  const lightState = useSelector(getBasicVariation);
  const dispatch = useDispatch();

  function onChange(value) {
    dispatch(onBasicVariationChange(value));
  }

  const aActive = [A_VARIATION, AB_VARIATION].includes(lightState);
  const bActive = [B_VARIATION, AB_VARIATION].includes(lightState);

  return (
    <div className={css(ss.basicVariation)}>
      <div className={css(ss.switchTitle)}>BASIC VARIATION</div>
      <div className={css(ss.switchWrapper)}>
        <Switch
          position={position}
          onChange={onChange}
          direction="horizontal"
          numPositions={3}
          thickness={thickness}
          length={length}
          padding={4}
          innerThickness={thickness - 8}
          outerStyle={styles.switchOuter}
          innerStyle={styles.switchInner}
        />
        <div className={css(ss.labelWrapper)}>
          <div className={css(ss.label)}>A</div>
          <div className={css(ss.label)}>AB</div>
          <div className={css(ss.label)}>B</div>
        </div>
      </div>
      <div className={css(ss.lightsWrapper)}>
        <Light active={aActive} />
        <Light active={bActive} />
      </div>
    </div>
  );
};

export default BasicVariationSwitch;
