export type Role = 'vanguard' | 'duelist' | 'strategist' | 'flex';

export type Hero = {
  id: string;
  slug: string;
  name: string;
  role: Role;
  portraitUrl: string;
};

export const ROLE_LABEL: Record<Role, string> = {
  vanguard: 'Vanguard',
  duelist: 'Duelist',
  strategist: 'Strategist',
  flex: 'Flex',
};

export const ROLE_LABEL_UPPER: Record<Role, string> = {
  vanguard: 'VANGUARD',
  duelist: 'DUELIST',
  strategist: 'STRATEGIST',
  flex: 'FLEX',
};
