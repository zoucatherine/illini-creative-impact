// Open roles shown on the Our Work page. Remove a role when it's filled.
export interface OpenRole {
  title: string;
  /** Who the work is for. */
  forWho: string;
  description: string;
  /** Where "I'm interested" goes. */
  href: string;
  projectSlug?: string;
}

export const openRoles: OpenRole[] = [
  {
    title: 'Grant writers',
    forWho: 'Trinity Community Food Pantry',
    description:
      'Help the pantry research grants and write the applications that keep its shelves stocked.',
    href: '/get-involved?interest=projects&project=trinity-community-food-pantry#join',
    projectSlug: 'trinity-community-food-pantry',
  },
];
