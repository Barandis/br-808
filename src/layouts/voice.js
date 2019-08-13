import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const VoiceLayout = ({ children, labels, width = 110, height = 450 }) => {
  const styles = {
    voice: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width,
      height,
      padding: 4,
    },

    knobsWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    controlSpacing: {
      marginBottom: 5,
    },

    labelWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },

    labelSpacing: {
      marginTop: 8,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.voice)}>
      <div className={css(ss.knobsWrapper)}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={css(ss.controlSpacing)}>
            {child}
          </div>
        ))}
      </div>
      <div className={css(ss.labelWrapper)}>
        {labels.map((label, index) => (
          <div key={index} className={css(ss.labelSpacing)}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

VoiceLayout.propTypes = {
  children: PropTypes.node,
  labels: PropTypes.arrayOf(PropTypes.node).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default VoiceLayout;
