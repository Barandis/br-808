import { createSelector } from 'reselect';
import { MODE_PATTERN_CLEAR, MODE_FIRST_PART, MODE_SECOND_PART, FIRST_PART, SECOND_PART } from 'store/constants';
import { getSelectedMode, getCurrentPart } from 'store/selectors/common';

export default createSelector(
  [getSelectedMode, getCurrentPart],
  (selectedMode, currentPart) => {
    switch (selectedMode) {
      case MODE_PATTERN_CLEAR:
        return FIRST_PART;
      case MODE_FIRST_PART:
        return FIRST_PART;
      case MODE_SECOND_PART:
        return SECOND_PART;
      default:
        return currentPart;
    }
  }
);
