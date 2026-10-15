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
      'Help the pantry research grants and write the applications that keep its shelves stocked. No experience needed: you can learn alongside UIUC’s Effective Grant Writing course and apply each lesson to the pantry’s real grants.',
    href: '/get-involved?interest=projects&project=trinity-community-food-pantry#join',
    projectSlug: 'trinity-community-food-pantry',
  },
  {
    title: 'Art market team',
    forWho: 'Student Art Markets',
    description:
      'Help run our art markets, starting with the Hallo-Eve Art Mart: recruit artists, plan logistics, promote, and staff the day.',
    href: '/get-involved?interest=projects&project=art-markets#join',
    projectSlug: 'art-markets',
  },
];
