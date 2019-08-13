import { gray, darkGray } from 'theme/colors';

const titleFont = {
  fontFamily: 'AndroclesOpti',
  fontStyle: 'normal',
  fontWeight: 'normal',
  src: "url('AndroclesOpti-Regular.otf') format('otf')"
}

export const fontFamily = 'Arial, sans-serif';
export const fontWeight = 'bold';
export const titleFontFamily = [titleFont, 'sans-serif'];
export const titleFontWeight = 'normal';
export const xsmall = '9px';
export const small = '11px';
export const normal = '13px';
export const large = '15px';
export const xlarge = '27px';
export const letterSpacing = '-0.2px';
export const textAlign = 'center';

export const unselectableText = {
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  msUserSelect: 'none',
};

export const defaultCursor = {
  cursor: 'default',
};

export const autoCursor = {
  cursor: 'auto',
};

const basePreset = {
  fontFamily,
  fontWeight,
  textAlign,
  letterSpacing,
  ...unselectableText,
  ...defaultCursor,
};

const titlePreset = {
  fontFamily: titleFontFamily,
  fontWeight: titleFontWeight,
  textAlign,
  letterSpacing,
  ...unselectableText,
  ...defaultCursor,
};

export const labelGrayNormal = {
  ...basePreset,
  fontSize: normal,
  color: gray,
};

export const labelGrayLarge = {
  ...basePreset,
  fontSize: large,
  color: gray,
};

export const labelGrayXlarge = {
  ...basePreset,
  fontSize: xlarge,
  color: gray,
  letterSpacing: '-1px',
  padding: 2,
};

export const labelGraySmall = {
  ...basePreset,
  fontSize: small,
  color: gray,
};

export const labelGrayXsmall = {
  ...basePreset,
  fontSize: xsmall,
  color: gray,
};

export const labelGrayTitle = {
  ...titlePreset,
  fontSize: 50,
  color: gray,
};

export const labelDarkGray = {
  ...basePreset,
  fontSize: normal,
  color: darkGray,
  fontWeight: 'normal',
};

export const labelText = {
  userSelect: 'none',
  cursor: 'default',
};

export const ring = (size, color) => ({
  position: 'absolute',
  width: size,
  height: size,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: 'auto',
  borderRadius: '50%',
  backgroundColor: color,
});
