import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles';
import { sansRegular14 } from '@/styles/font.css';

const { morakGreen, grayscale100, grayscale200 } = vars.color;

export const container = style([
  sansRegular14,
  { display: 'flex', gap: '0.4rem', alignItems: 'center' },
]);

globalStyle('input[type="radio"]', {
  position: 'relative',
  verticalAlign: 'middle',
  appearance: 'none',
  border: `0.2rem solid ${grayscale200}`,
  borderRadius: '50%',
  width: '2.4rem',
  height: '2.4rem',
});

globalStyle('input[type="radio"]:checked', {
  border: `0.2rem solid ${morakGreen}`,
});

globalStyle('input[type="radio"]:checked::after', {
  content: '',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '50%',
  height: '50%',
  margin: 'auto',
  position: 'absolute',
  borderRadius: '50%',
  background: morakGreen,
});

globalStyle('input[type="radio"]:hover', {
  boxShadow: `0 0 0 0.2rem ${grayscale100}`,
  cursor: 'pointer',
});

globalStyle('input[type="radio"]:focus-visible', {
  outline: '0.2rem dotted tomato',
  outlineOffset: '0.2rem',
});

globalStyle('input[type="radio"]:hover', {
  boxShadow: `0 0 0 0.2rem ${grayscale100}`,
  cursor: 'pointer',
});
