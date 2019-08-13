import { createSelector } from 'reselect';
import { getCurrentPattern, getPatternLengths, getCurrentPart } from 'store/selectors/common';
import { patternLengthKey } from 'utils';

export default createSelector(
  [getCurrentPattern, getCurrentPart, getPatternLengths],
  (currentPattern, currentPart, patternLengths) => {
    return patternLengths[patternLengthKey(currentPattern, currentPart)];
  }
);
