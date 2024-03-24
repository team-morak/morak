import { style } from '@vanilla-extract/css';

import { vars } from '@/styles';
import { sansBold16, sansBold20, sansRegular16 } from '@/styles/font.css';

const {
  grayscale50,
  grayscale100,
  grayscale200,
  grayscaleWhite,
  grayscaleBlack,
} = vars.color;

export const butonWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

export const code = style([
  sansBold16,
  {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    gap: '0.8rem',
    color: grayscale200,
    whiteSpace: 'nowrap',
  },
]);

export const codeString = style([
  sansRegular16,
  {
    paddingLeft: `0.8rem`,
    borderLeft: `2px solid ${grayscale100}`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
]);

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '0.8rem',
  border: `1px solid ${grayscale200}`,
  backgroundColor: grayscaleWhite,
  padding: '2rem 1.6rem',
  gap: '0.8rem',
  cursor: 'pointer',

  selectors: {
    [`&:hover`]: {
      backgroundColor: grayscale50,
    },
  },

  '@media': {
    'screen and (max-width:768px)': {
      padding: '1.2rem',
    },
  },
});

export const copyButton = style({
  display: 'flex',
  padding: '0.4rem',
  borderRadius: '50%',

  ':hover': {
    background: grayscale100,
  },
});

export const detail = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.4rem',
});

export const memberCount = style([
  sansRegular16,
  {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: grayscale200,
    marginLeft: '0.4rem',
  },
]);

export const nameWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const title = style([
  sansBold20,
  {
    color: grayscaleBlack,

    '@media': {
      'screen and (max-width:768px)': {
        fontSize: '1.6rem',
      },
    },
  },
]);

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.8rem',
});
