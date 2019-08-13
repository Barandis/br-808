import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import Switch from 'components/switch';

import { black, darkerBlack } from 'theme/colors';

const borderRadius = 2;

const VoiceSwitch = ({ onChange, position }) => {
  const styles = {
    voiceSwitch: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    inner: {
      backgroundColor: black,
      borderRadius,
    },

    outer: {
      backgroundColor: darkerBlack,
      borderRadius,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.voiceSwitch)}>
      <Switch
        position={position}
        onChange={onChange}
        direction="vertical"
        numPositions={2}
        thickness={30}
        length={50}
        padding={4}
        innerThickness={22}
        outerStyle={styles.outer}
        innerStyle={styles.inner}
      />
    </div>
  );
};

VoiceSwitch.propTypes = {
  onChange: PropTypes.func,
  position: PropTypes.number,
};

export default VoiceSwitch;
