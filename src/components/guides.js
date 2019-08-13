import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const baseGuideStyle = {
  cursor: 'default',
  position: 'absolute',
  top: '50%',
  left: '50%',
};

const baseWrapperStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
};

const Guides = ({ num, distance, hideCount = 0, style = {}, rotate = true, values = null, offset = 0 }) => {
  const useValues = values && values.length;
  const n = useValues ? values.length : num;

  const guides = [];
  const angleCounter = 360 / (n + hideCount);
  let currentAngle = 180 + hideCount * angleCounter + offset;

  const hideCountAdjust = hideCount > 1 ? hideCount - 1 : 0;
  const hideCompensation = (angleCounter * hideCountAdjust) / 2;

  for (let i = 0; i < n; i++) {
    const value = useValues ? values[i] : null;
    const transform =
      `translateX(-50%) translateY(-50%) rotate(${currentAngle}deg) translateY(-${distance}px)` +
      (rotate ? '' : ` rotate(-${currentAngle - hideCompensation}deg)`);

    const styles = StyleSheet.create({
      guide: {
        ...style,
        ...baseGuideStyle,
        transform,
      },
    });

    guides.push(
      <div className={css(styles.guide)} key={i}>
        {value}
      </div>
    );
    currentAngle += angleCounter;
  }

  const styles = StyleSheet.create({
    guide: {
      ...baseWrapperStyle,
      transform: `rotate(-${hideCompensation}deg)`,
    },
  });

  return <div className={css(styles.guide)}>{guides}</div>;
};

Guides.propTypes = {
  num: PropTypes.number,
  distance: PropTypes.number.isRequired,
  hideCount: PropTypes.number,
  style: PropTypes.object,
  rotate: PropTypes.bool,
  values: PropTypes.array,
  offset: PropTypes.number,
};

export default Guides;
