import { style } from '@vanilla-extract/css';

import { fontStyle, vars } from '@/styles';

const { grayscaleBlack, grayscale500, morakRed } = vars.color;
const { sansBold24, sansRegular16 } = fontStyle;

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  maxWidth: '80rem',
  gap: '4rem',
});

export const groupHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const groupMember = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
});

export const groupPeopleNumber = style([
  sansRegular16,
  {
    color: grayscale500,
  },
]);

export const groupTitle = style([
  sansBold24,
  {
    maxWidth: '40rem',
    color: grayscaleBlack,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
]);

export const groupTitleContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

const deleteButton = style({
  display: 'none',
  fill: morakRed,
  selectors: {
    [`${groupMember}:hover &`]: {
      display: 'block',
    },
  },
});

export const memberContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// eslint-disable-next-line sort-exports/sort-exports
export { deleteButton };
