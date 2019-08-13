import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { darkGray, paleYellow } from 'theme/colors';
import { unselectableText, fontFamily } from 'theme/styles';

const VoiceLabel = ({ label }) => {
  const baseLabelStyle = {
    fontFamily,
    whiteSpace: 'pre',
    color: darkGray,
    letterSpacing: -0.4,
    ...unselectableText,
  };

  const styles = {
    voiceLabel: {
      width: '100%',
      height: 36,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: paleYellow,
      borderRadius: 4,
    },

    innerWrapper: {
      alignItems: 'baseline',
      cursor: 'default',
      display: 'flex',
      flexDIrection: 'row',
    },

    smallLabel: {
      ...baseLabelStyle,
      fontSize: 11,
    },

    largeLabel: {
      ...baseLabelStyle,
      fontSize: 19,
    },
  };

  const ss = StyleSheet.create(styles);

  const formattedLabel = label.map((section, index) => {
    const style = section[0] === '*' ? 'largeLabel' : 'smallLabel';
    const value = section[0] === '*' ? section.slice(1) : section;

    return (
      <div key={index} className={css(ss[style])}>
        {value}
      </div>
    );
  });

  return (
    <div className={css(ss.voiceLabel)}>
      <div className={css(ss.innerWrapper)}>{formattedLabel}</div>
    </div>
  );
};

VoiceLabel.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VoiceLabel;
