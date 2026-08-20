import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { imageUrl } from '@/lib/tmdb';

export type MovieCardProps = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
};

export default function MovieCard(movie: MovieCardProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  return (
    <Link href={`/movies/${movie.id}`} className="block min-w-0">
      <Card className="h-full w-full max-w-[220px] justify-self-center gap-3 overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      <div
        className="relative aspect-[2/3] w-full overflow-hidden bg-muted"
        style={{ position: 'relative' }}
      >
  <Image
    src={imageUrl(movie.poster_path, 'w500')!}
    alt={movie.title}
    fill
    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
    className="object-cover"
  />
</div>

        <CardContent className="px-3">
          <CardTitle className="text-base leading-tight line-clamp-1">
            {movie.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-1">
            {movie.overview || 'No description available.'}
          </CardDescription>
        </CardContent>

        <CardFooter className="px-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{releaseYear}</span>
          <Badge variant="outline" className="uppercase">
            {movie.original_language}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}