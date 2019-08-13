import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { brightOrange, darkGray } from 'theme/colors';
import { labelGrayTitle } from 'theme/styles';

const lineHeight = 3;
const titleRight = 60;
const lineTop = 54.2;

const Title = ({ width = 955, height = 151 }) => {
  const styles = {
    title: {
      width,
      height,
      position: 'relative',
    },

    titleLine: {
      position: 'absolute',
      width: width - 20,
      height: `${lineHeight}%`,
      left: '50%',
      transform: 'translateX(-50%)',
      top: `${lineTop}%`,
      backgroundColor: brightOrange,
    },

    titleWrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'no-wrap',
      alignItems: 'baseline',
      position: 'absolute',
      bottom: `calc(${lineTop}% - 17.5px)`,
      right: titleRight,
    },

    titleBig: {
      ...labelGrayTitle,
      marginRight: 40,
      color: brightOrange,
      fontSize: 48,
      textShadow: `0.2rem 0 ${darkGray}, -0.2rem 0 ${darkGray}`,
    },

    titleSmall: {
      ...labelGrayTitle,
      color: brightOrange,
      fontSize: 36,
      letterSpacing: -1.7,
    },

    subtitle: {
      ...labelGrayTitle,
      position: 'absolute',
      top: `${lineTop + lineHeight * 1.5}%`,
      right: titleRight,
      fontSize: 28,
      letterSpacing: -0.75,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.title)}>
      <div className={css(ss.titleLine)} />
      <div className={css(ss.titleWrapper)}>
        <div className={css(ss.titleBig)}>Rhythm Composer</div>
        <div className={css(ss.titleSmall)}>BR-808</div>
      </div>
      <div className={css(ss.subtitle)}>Browser Controlled</div>
    </div>
  );
};

Title.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Title;
