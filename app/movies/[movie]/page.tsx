import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';
import { getMovieDetails, imageUrl } from '@/lib/tmdb';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import MoviePlayer from '@/components/web-ui/movie-player';

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const { movie: movieId } = await params;
  const movie = await getMovieDetails(movieId);
  
  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  const cast = movie.credits?.cast?.slice(0, 10) ?? [];
  const backdrops = movie.images?.backdrops?.slice(0, 6) ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Backdrop hero */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-video md:aspect-[21/9]"
        style={{ position: 'relative' }}
      >
        {movie.backdrop_path ? (
          <Image
            src={imageUrl(movie.backdrop_path, 'original')!}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <main className="relative z-10 mx-auto -mt-20 w-full max-w-6xl px-4 pb-12 sm:-mt-28 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          {/* Poster */}
          <div
            className="relative mx-auto aspect-[2/3] w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl ring-1 ring-foreground/10 sm:w-48 md:mx-0 md:w-56"
            style={{ position: 'relative' }}
          >
            {movie.poster_path ? (
              <Image
                src={imageUrl(movie.poster_path, 'w500')!}
                alt={movie.title}
                fill
                sizes="224px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 pb-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{movie.title}</h1>
            {movie.tagline && (
              <p className="mt-2 text-sm italic text-muted-foreground sm:text-base">
                {movie.tagline}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground md:justify-start">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <strong className="text-foreground">{movie.vote_average?.toFixed(1)}</strong>
                <span>({movie.vote_count} votes)</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {movie.release_date}
              </span>
              {movie.runtime > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {movie.runtime} min
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {movie.genres?.map((g: any) => (
                <Badge key={g.id} variant="secondary">
                  {g.name}
                </Badge>
              ))}
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {movie.overview}
            </p>
          </div>
        </div>

        <MoviePlayer movieId={movie.id} movieTitle={movie.title} />

        {/* Trailer */}
        {trailer && (
          <section className="mt-10">
            <h2 className="mb-3 text-xl font-semibold">Trailer</h2>
            <div className="aspect-video overflow-hidden rounded-xl border bg-black shadow-sm">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allowFullScreen
                 sandbox="allow-scripts allow-same-origin allow-presentation"
              />
            </div>
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xl font-semibold">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {cast.map((person: any) => (
                <Card key={person.cast_id ?? person.id} className="w-28 flex-shrink-0 py-0 overflow-hidden">
                  <div
                    className="relative aspect-[2/3] bg-muted"
                    style={{ position: 'relative' }}
                  >
                    {person.profile_path ? (
                      <Image
                        src={imageUrl(person.profile_path, 'w185')!}
                        alt={person.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs font-medium line-clamp-1">{person.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {person.character}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {backdrops.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-xl font-semibold">Gallery</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {backdrops.map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-md overflow-hidden"
                  style={{ position: 'relative' }}
                >
                  <Image
                    src={imageUrl(img.file_path, 'w500')!}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}