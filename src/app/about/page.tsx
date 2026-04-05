import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
};

const team = [
  {
    name: 'Julia Chepkemboi',
    role: 'Head Chef',
    image: '/images/chef1.jpg',
  },
  {
    name: 'Jeffrey Misigo',
    role: 'Recipe Curator',
    image: '/images/chef2.jpg',
  },
  {
    name: 'James Mukuvi',
    role: 'Nutrition Expert',
    image: '/images/chef3.jpg',
  },
];

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-balance text-3xl tracking-tight sm:text-4xl">
          About RecipeFinder
        </h1>
        <p className="mt-4 text-pretty text-text-muted">
          RecipeFinder helps home cooks discover new recipes from around the
          world  whether you’re searching for something specific or just want a
          great surprise.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="font-display text-lg tracking-tight">Our Mission</h2>
          <p className="mt-3 leading-relaxed text-text-muted">
            Make cooking feel approachable and inspiring by pairing a calm,
            modern interface with a deep catalog of meal ideas.
          </p>
          <p className="mt-3 leading-relaxed text-text-muted">
            Recipes are sourced from TheMealDB API.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="font-display text-lg tracking-tight">What You Can Do</h2>
          <ul className="mt-3 space-y-2 text-text-muted">
            <li>Search recipes by name</li>
            <li>Generate a random meal</li>
            <li>Browse categories and explore meals</li>
            <li>View step-by-step instructions and ingredients</li>
          </ul>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-center text-2xl tracking-tight">
          Meet the Team
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="text-base font-semibold">{member.name}</div>
                <div className="mt-1 text-sm text-secondary">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
