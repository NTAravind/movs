import { getRandomMovies } from '@/lib/tmdb';
import MovieCard, { type MovieCardProps } from '@/components/web-ui/moviecard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const movies = await getRandomMovies(12);

  return (
    <div >
      {/* Hero */}
      <section className="py-6 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          Discover something new to watch, picked at random.
        </p>
      </section>

      {/* Movie grid */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 pb-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie: MovieCardProps) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}