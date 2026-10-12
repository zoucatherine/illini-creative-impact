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
    // TODO: describe what ICI and Visionary Arts do together.
    name: 'Visionary Arts',
    status: 'active',
    description: 'A local art studio we partner with.',
  },
  {
    // TODO: confirm full name and describe the collaboration.
    name: 'College of Fine + Applied Arts (FAA)',
    status: 'active',
    description: 'The University of Illinois college for art, design, and the creative disciplines.',
  },
  {
    name: 'Noshbox',
    status: 'in-development',
    description: 'Exploring creative events for the community together. Details are still being planned.',
    projectSlug: 'noshbox',
  },
];
