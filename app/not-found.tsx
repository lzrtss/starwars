import Link from 'next/link';

import Container from '@/components/container';
import { ERROR_MESSAGES, LINKS, ROUTES, TITLES } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="h-screen">
      <Container className="flex flex-col justify-center bg-hero bg-top bg-cover bg-no-repeat">
        <div className="mb-20">
          <h2 className="mb-5 text-4xl text-center font-bold">
            {TITLES.NOT_FOUND}
          </h2>
          <p className="text-2xl text-center font-bold uppercase">
            {ERROR_MESSAGES.NOT_FOUND}
          </p>
        </div>

        <Link
          href={ROUTES.HOME}
          className="inline-block mx-auto px-4 py-2 text-black font-bold bg-white rounded-lg uppercase hover:bg-blue-200 transition duration-300 ease-in-out"
        >
          {LINKS.GO_HOME}
        </Link>
      </Container>
    </main>
  );
}
