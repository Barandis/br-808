export function snap(number, increment, offset) {
  return Math.round(number / increment) * increment + offset;
}

export function stepKey(pattern, instrument, part, variation, step) {
  return `PATTERN_${pattern}-INSTRUMENT_${instrument}-${part}-${variation}-STEP_${step}`;
}

export function patternLengthKey(pattern, part) {
  return `PATTERN_${pattern}-${part}-LENGTH`;
}
