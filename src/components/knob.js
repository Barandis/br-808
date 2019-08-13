import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { snap } from 'utils';

const BASE_HEIGHT = 100;

function getNormalizedValue(value, min, max) {
  return (value - min) / (max - min);
}

function createEmptyState() {
  return {
    right: null,
    y: null,
    scale: null,
    center: null,
    cursor: null,
  };
}

const Knob = ({ children, size, value, min, max, step, onChange, bufferSize = 360 }) => {
  const [state, setState] = useReducer((state, newState) => ({ ...state, ...newState }), createEmptyState());

  useEffect(() => {
    if (state.x !== null) {
      document.addEventListener('mousemove', handleDrag, false);
      document.addEventListener('mouseup', endDrag, false);

      return function cleanup() {
        document.removeEventListener('mouseup', endDrag, false);
        document.removeEventListener('mousemove', handleDrag, false);
      };
    }
  });

  function handleDrag(event) {
    event.preventDefault();
    if (state.center === null) {
      return;
    }

    const { clientX, clientY } = event;
    const scale = Math.abs(clientY - state.center[1]) / 200 + 1;
    const right =
      clientX > state.right
        ? clientX
        : clientX < state.right - BASE_HEIGHT * scale
        ? clientX + BASE_HEIGHT * scale
        : state.right;
    const cursor = [clientX, clientY];

    const normalized = (100 - (right - clientX) * (100 / (BASE_HEIGHT * scale))) / 100;
    const unnormalized = snap(normalized * (max - min), step, min);

    setState({ top, scale, cursor });

    if (unnormalized !== value) {
      onChange(unnormalized);
    }
  }

  function endDrag() {
    setState(createEmptyState());
  }

  function startDrag(event) {
    event.preventDefault();
    const { clientX, clientY } = event;

    const knobRect = event.currentTarget.getBoundingClientRect();
    const center = [knobRect.left + knobRect.width / 2, knobRect.top + knobRect.height / 2];

    const y = clientY;
    const scale = Math.abs(y - center[1]) / 200 + 1;
    const right = clientX + (BASE_HEIGHT * scale - getNormalizedValue(value, min, max) * (BASE_HEIGHT * scale));
    const cursor = [clientX, clientY];

    setState({ right, y, scale, center, cursor });
  }

  const rotation = getNormalizedValue(value, min, max) * bufferSize - bufferSize / 2;

  const styles = {
    knobWrapper: {
      position: 'relative',
      borderRadius: '50%',
      height: size,
      width: size,
      ':hover': {
        cursor: 'pointer',
      },
    },

    knob: {
      position: 'relative',
      borderRadius: '50%',
      height: '100%',
      width: '100%',
      transform: `rotate(${rotation}deg) translateZ(0)`,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.knobWrapper)}>
      <div className={css(ss.knob)} onMouseDown={startDrag}>
        {children}
      </div>
    </div>
  );
};

Knob.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  bufferSize: PropTypes.number,
  overlayColor: PropTypes.string,
  innerColor: PropTypes.string,
};

export default Knob;
