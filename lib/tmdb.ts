
const BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbFetch(path: string, params: Record<string, string> = {},retries:number = 3) {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
 for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          accept: 'application/json',
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        throw new Error(`TMDB error ${res.status}: ${await res.text()}`);
      }
      return res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1))); // small backoff
    }
  }
}
export function imageUrl(path: string | null, size: string = 'w500') {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}


export async function getRandomMovies(count: number , adult:boolean = false) {
  const randomPage = Math.floor(Math.random() * 20) + 1; 
  const data = await tmdbFetch('/discover/movie', {
    sort_by: 'popularity.desc',
    page: String(randomPage),
    include_adult: String(adult),
  });

  
  const shuffled = [...data.results].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function getMovieDetails(id: string) {
  return tmdbFetch(`/movie/${id}`, {
    append_to_response: 'videos,images,credits,recommendations',
  });
}