import type { Metadata } from 'next';

import { HomeClient } from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Search thousands of recipes or discover a random meal.',
};

export default function Page() {
  return <HomeClient />;
}
