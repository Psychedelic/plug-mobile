import { StringObject } from '@/interfaces/general';

// FONTS
export const Inter = 'Inter';

// WEIGHTS
export const REGULAR = 'Regular';
export const MEDIUM = 'Medium';
export const SEMIBOLD = 'SemiBold';

const REGULAR_WEIGHT = '400';
const MEDIUM_WEIGHT = '500';
const SEMIBOLD_WEIGHT = '600';

export const weights: StringObject = {
  [REGULAR]: REGULAR_WEIGHT,
  [SEMIBOLD]: SEMIBOLD_WEIGHT,
  [MEDIUM]: MEDIUM_WEIGHT,
};

// STYLES
export const NORMAL = 'Normal';
export const NORMAL_STYLE = 'normal';
