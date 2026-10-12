// Community partners. Only list confirmed partnerships as 'active'.
export interface Partner {
  name: string;
  status: 'active' | 'in-development';
  description: string;
  projectSlug?: string;
  /** Optional logo; only add with the partner's permission. */
  logo?: string;
  url?: string;
}

export const partners: Partner[] = [
  {
    name: 'Trinity Community Food Pantry',
    status: 'active',
    description: 'Students handle branding, posters, signage, and promotional materials for the pantry.',
    projectSlug: 'trinity-community-food-pantry',
  },
  {
    name: 'Visionary Arts',
    status: 'active',
    description:
      'An art academy and creative leadership studio in San Jose, California. Together we ran the Earth Day Every Day art contest and exhibition.',
    projectSlug: 'earth-day-every-day',
    url: 'https://visionaryarts.net',
  },
  {
    name: 'Noshbox',
    status: 'in-development',
    description: 'Exploring creative events for the community together. Details are still being planned.',
    projectSlug: 'noshbox',
  },
];
