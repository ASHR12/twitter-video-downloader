export const PLATFORMS = {
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
};

export const PLATFORM_CONFIG = {
  [PLATFORMS.TWITTER]: {
    id: PLATFORMS.TWITTER,
    name: 'X/Twitter',
    placeholder: 'Enter Twitter/X post URL...',
    icon: 'twitter',
  },
  [PLATFORMS.FACEBOOK]: {
    id: PLATFORMS.FACEBOOK,
    name: 'Facebook',
    placeholder: 'Enter Facebook post URL...',
    icon: 'facebook',
  },
  [PLATFORMS.INSTAGRAM]: {
    id: PLATFORMS.INSTAGRAM,
    name: 'Instagram',
    placeholder: 'Enter Instagram post URL...',
    icon: 'instagram',
  },
  [PLATFORMS.YOUTUBE]: {
    id: PLATFORMS.YOUTUBE,
    name: 'YouTube',
    placeholder: 'Enter YouTube video URL...',
    icon: 'youtube',
  },
};

export const PLATFORM_LIST = Object.values(PLATFORM_CONFIG);