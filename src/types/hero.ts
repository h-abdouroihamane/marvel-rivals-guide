export type Role = 'vanguard' | 'duelist' | 'strategist';

export type Hero = {
  id: string;
  slug: string;
  name: string;
  // Most heroes have a single role. Deadpool has three (Vanguard,
  // Duelist, Strategist) because in-game he ships three variants —
  // each with its own ability set.
  roles: Role[];
  portraitUrl: string;
};

export const ROLE_LABEL: Record<Role, string> = {
  vanguard: 'Vanguard',
  duelist: 'Duelist',
  strategist: 'Strategist',
};

export const ROLE_LABEL_UPPER: Record<Role, string> = {
  vanguard: 'VANGUARD',
  duelist: 'DUELIST',
  strategist: 'STRATEGIST',
};
