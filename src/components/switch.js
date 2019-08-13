import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';

const NO_OP = () => {};

const Switch = ({
  position,
  thickness,
  length,
  direction,
  numPositions,
  innerThickness,
  padding = 0,
  onChange = NO_OP,
  outerStyle = {},
  innerStyle = {},
}) => {
  const [hover, setHover] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(position);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  const outer = useRef(null);

  useEffect(() => {
    if (hover) {
      const el = outer.current;
      el.addEventListener('mousemove', handleMouseHover, false);
      el.addEventListener('click', handleClick, false);

      return () => {
        el.removeEventListener('mousemove', handleMouseHover, false);
        el.removeEventListener('click', handleClick, false);
      };
    }
  });

  function handleClick() {
    onChange(hoverPosition);
  }

  function handleMouseHover({ clientX, clientY }) {
    const totalLength = length - padding * 2;
    let currentRelativeCoord = direction === VERTICAL ? clientY - (y + padding) : clientX - (x + padding);
    if (currentRelativeCoord < 0) {
      currentRelativeCoord = 0;
    }
    if (currentRelativeCoord > totalLength - padding) {
      currentRelativeCoord = totalLength - padding;
    }

    setHoverPosition(~~((currentRelativeCoord / totalLength) * numPositions));
  }

  function handleMouseEnter({ currentTarget }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    setX(left);
    setY(top);
    setHover(true);
  }

  function handleMouseLeave() {
    setX(null);
    setY(null);
    setHover(false);
    setHoverPosition(position);
  }

  const positionIncrement = (length - padding * 2 - innerThickness) / (numPositions - 1);
  const positionChange = positionIncrement * position;
  const hoverPositionChange = positionIncrement * hoverPosition;

  let width = null;
  let height = null;
  let innerWidth = null;
  let innerHeight = null;
  let transform = null;
  let hoverTransform = null;

  if (direction === VERTICAL) {
    width = thickness;
    height = length;
    innerWidth = width - padding * 2;
    innerHeight = innerThickness;
    transform = `translateY(${positionChange}px)`;
    hoverTransform = `translateY(${hoverPositionChange}px)`;
  } else {
    width = length;
    height = thickness;
    innerWidth = innerThickness;
    innerHeight = height - padding * 2;
    transform = `translateX(${positionChange}px)`;
    hoverTransform = `translateX(${hoverPositionChange}px)`;
  }

  const styles = {
    switchOuter: {
      position: 'relative',
      ...outerStyle,
      width,
      height,
      padding,
      cursor: hover ? 'pointer' : 'default',
    },

    switchInner: {
      position: 'absolute',
      ...innerStyle,
      width: innerWidth,
      height: innerHeight,
      transform,
      transition: 'transform cubic-bezier(0.4, 0.0, 0.2, 1) 0.1s',
    },

    switchHover: {
      position: 'absolute',
      opacity: 0.5,
      ...innerStyle,
      width: innerWidth,
      height: innerHeight,
      transform: hoverTransform,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={css(ss.switchOuter)} ref={outer}>
      <div className={css(ss.switchInner)} />
      <div className={css(ss.switchHover)} />
    </div>
  );
};

Switch.propTypes = {
  position: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]).isRequired,
  numPositions: PropTypes.number.isRequired,
  innerThickness: PropTypes.number,
  padding: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  outerStyle: PropTypes.object,
  innerStyle: PropTypes.object,
};

export default Switch;
