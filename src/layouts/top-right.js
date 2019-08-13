import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import { useSelector, useDispatch } from 'react-redux';
import { onVoiceChange } from 'store/actions';
import { getVoiceState } from 'store/selectors/common';

import Title from 'components/title';
import MasterVolumeKnob from 'components/master-volume-knob';
import Voice, { EMPTY_CONTROL } from 'components/voice';

import { gray } from 'theme/colors';

import {
  ACCENT,
  BASS_DRUM,
  SNARE_DRUM,
  LOW_CONGA_LOW_TOM,
  MID_CONGA_MID_TOM,
  HI_CONGA_HI_TOM,
  CLAVES_RIMSHOT,
  MARACAS_HANDCLAP,
  COWBELL,
  CYMBAL,
  OPEN_HIHAT,
  CLOSED_HIHAT,
} from 'store/constants';

const voiceConfig = [
  {
    type: ACCENT,
    labels: [['*A', '*C', 'CENT']],
    controls: [],
  },
  {
    type: BASS_DRUM,
    labels: [['*B', 'ASS ', '*D', 'RUM']],
    controls: ['tone', 'decay'],
  },
  {
    type: SNARE_DRUM,
    labels: [['*S', 'NARE', '*D', 'RUM']],
    controls: ['tone', 'snappy'],
  },
  {
    type: LOW_CONGA_LOW_TOM,
    labels: [['*L', 'OW ', '*C', 'ONGA'], ['*L', 'OW ', '*T', 'OM']],
    controls: ['tuning'],
  },
  {
    type: MID_CONGA_MID_TOM,
    labels: [['*M', 'ID ', '*C', 'ONGA'], ['*M', 'ID ', '*T', 'OM']],
    controls: ['tuning'],
  },
  {
    type: HI_CONGA_HI_TOM,
    labels: [['*H', 'I ', '*C', 'ONGA'], ['*H', 'I ', '*T', 'OM']],
    controls: ['tuning'],
  },
  {
    type: CLAVES_RIMSHOT,
    labels: [['*C', '*L', 'AVES'], ['*R', 'IM ', '*S', 'HOT']],
    controls: [],
  },
  {
    type: MARACAS_HANDCLAP,
    labels: [['*M', '*A', 'RACAS'], ['HAND ', '*C', 'LA', '*P']],
    controls: [],
  },
  {
    type: COWBELL,
    labels: [['*C', 'OW', '*B', 'ELL']],
    controls: [],
  },
  {
    type: CYMBAL,
    labels: [['*C', '*Y', 'MBAL']],
    controls: ['tone', 'decay'],
  },
  {
    type: OPEN_HIHAT,
    labels: [['*O', 'PEN ', '*H', 'IHAT']],
    controls: [EMPTY_CONTROL, 'decay'],
  },
  {
    type: CLOSED_HIHAT,
    labels: [['*C', "LS'D", '*H', 'IHAT']],
    controls: [],
  },
];

function generateVoices(separatorWidth, width, height) {
  const separatorHeight = height - 10;

  const separatorStyle = StyleSheet.create({
    separator: {
      width: separatorWidth,
      height: separatorHeight,
      backgroundColor: gray,
    },
  });

  return voiceConfig.reduce((components, config, index) => {
    if (index !== 0) {
      components.push(<div key={`separator-${index}`} className={css(separatorStyle.separator)} />);
    }

    const voiceState = useSelector(getVoiceState)[config.type];
    const dispatch = useDispatch();

    function onChange(type, controlName, value) {
      dispatch(onVoiceChange(type, controlName, value));
    }

    components.push(
      <Voice
        key={`column-${index}`}
        voiceState={voiceState}
        onChange={onChange}
        config={config}
        width={width}
        height={height}
      />
    );
    return components;
  }, []);
}

const TopRightSection = ({ width, height, separatorWidth }) => {
  const numVoices = 12;
  const titleWidth = Math.ceil(width * 0.85);
  const voiceHeight = Math.ceil(height * 0.7);
  const titleHeight = height - voiceHeight;
  const masterVolumeSize = Math.floor(titleHeight * 0.86);
  const voiceWidth = Math.floor(width / numVoices - separatorWidth / numVoices);

  const styles = {
    topRight: {
      width,
      height,
      display: 'flex',
      flexDirection: 'column',
    },

    voiceWrapper: {
      width,
      height: voiceHeight,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    titleWrapper: {
      width,
      height: titleHeight,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    masterVolumeWrapper: {
      height: titleHeight,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.topRight)}>
      <div className={css(ss.voiceWrapper)}>
        {generateVoices(separatorWidth, voiceWidth, voiceHeight)}
      </div>
      <div className={css(ss.titleWrapper)}>
        <Title width={titleWidth} height={titleHeight} />
        <div className={css(ss.masterVolumeWrapper)}>
          <MasterVolumeKnob size={masterVolumeSize} />
        </div>
      </div>
    </div>
  );
};

TopRightSection.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  separatorWidth: PropTypes.number.isRequired,
};

export default TopRightSection;
