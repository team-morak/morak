import { style } from '@vanilla-extract/css';

export const background = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(14, 31, 24, 0.05)',
  backdropFilter: 'blur(0.1rem)',
});

export const buttonArea = style({
  display: 'flex',
  justifyContent: 'stretch',
  gap: '1.6rem',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  top: '50%',
  left: '50%',
  minHeight: '20rem',
  minWidth: '32rem',
  padding: '1.6rem',
  borderRadius: '0.8rem',
  boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.25)',
  transform: 'translate(-50%, -50%)',
});

export const inputArea = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '0.8rem',
  flexGrow: 1,
});

export const textArea = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.8rem',
});
