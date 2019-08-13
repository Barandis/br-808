import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';

import { gray } from 'theme/colors';
import { labelGrayLarge, autoCursor } from 'theme/styles';

import TopLeftSection from 'layouts/top-left';
import TopRightSection from 'layouts/top-right';
import BottomSection from 'layouts/bottom';

import SaveButton from 'components/save-button';
import LoadButton from 'components/load-button';
import ResetButton from 'components/reset-button';

import {
  APP_WIDTH,
  APP_PADDING,
  APP_HEIGHT,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  TOP_BOTTOM_DIVIDER_HEIGHT,
  TOP_HORIZONTAL_SEPARATOR_HEIGHT,
  BOTTOM_HEIGHT,
  TOP_HEIGHT,
  TOP_LEFT_WIDTH,
  TOP_RIGHT_WIDTH,
  VOICE_SEPARATOR_WIDTH,
} from 'layouts/constants';

const AppLayout = () => {
  const styles = {
    pageWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minWidth: APP_WIDTH + APP_PADDING,
      minHeight: APP_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT + APP_PADDING,
    },

    wrapper: {
      position: 'absolute',
      width: APP_WIDTH,
      height: APP_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    headerWrapper: {
      width: APP_WIDTH,
      height: HEADER_HEIGHT,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row',
    },

    footerWrapper: {
      width: APP_WIDTH,
      height: FOOTER_HEIGHT,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
    },

    appWrapper: {
      width: APP_WIDTH,
      height: APP_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
    },

    topBottomDivider: {
      width: APP_WIDTH,
      height: TOP_BOTTOM_DIVIDER_HEIGHT,
      backgroundColor: gray,
    },

    topHorizontalDivider: {
      width: VOICE_SEPARATOR_WIDTH,
      height: TOP_HORIZONTAL_SEPARATOR_HEIGHT,
      backgroundColor: gray,
    },

    topWrapper: {
      width: APP_WIDTH,
      height: TOP_HEIGHT,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    bottomWrapper: {
      width: APP_WIDTH,
      height: BOTTOM_HEIGHT,
    },

    footerText: {
      ...labelGrayLarge,
      ...autoCursor,
    },
  };

  const ss = StyleSheet.create(styles);

  return (
    <div className={css(ss.pageWrapper)}>
      <div className={css(ss.wrapper)}>
        <div className={css(ss.headerWrapper)}>
          <div className={css(ss.buttonWrapper)}>
            <SaveButton size={35} />
            <LoadButton size={35} />
            <ResetButton size={35} />
          </div>
        </div>
        <div className={css(ss.appWrapper)}>
          <div className={css(ss.topBottomDivider)} />
          <div className={css(ss.topWrapper)}>
            <TopLeftSection width={TOP_LEFT_WIDTH} height={TOP_HEIGHT} />
            <div className={css(ss.topHorizontalDivider)} />
            <TopRightSection width={TOP_RIGHT_WIDTH} height={TOP_HEIGHT} separatorWidth={VOICE_SEPARATOR_WIDTH} />
            <div className={css(ss.topHorizontalDivider)} />
          </div>
          <div className={css(ss.topBottomDivider)} />
          <div className={css(ss.bottomWrapper)}>
            <BottomSection width={APP_WIDTH} height={BOTTOM_HEIGHT} topLeftWidth={TOP_LEFT_WIDTH} />
          </div>
        </div>
        <div className={css(ss.footerWrapper)} />
      </div>
    </div>
  );
};

export default AppLayout;
