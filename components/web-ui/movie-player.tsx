'use client';

import { useState } from 'react';

type MoviePlayerProps = {
  movieId: number;
  movieTitle: string;
};

type Player = 'vaplayer' | 'vidsrc';

export default function MoviePlayer({ movieId, movieTitle }: MoviePlayerProps) {
  const [player, setPlayer] = useState<Player>('vaplayer');

  const players = {
    vaplayer: {
      label: 'Player 1',
      src: `https://vaplayer.ru/embed/movie/${movieId}`,
    },
    vidsrc: {
      label: 'Player 2',
      src: `https://vidsrc.sbs/embed/movie/${movieId}`,
    },
  };

  return (
    <section className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <h2 className="font-semibold">Watch {movieTitle}</h2>
          <p className="text-sm text-muted-foreground">Choose a player to start watching.</p>
        </div>
        <div className="flex rounded-md border bg-muted p-1" role="group" aria-label="Choose video player">
          {(Object.keys(players) as Player[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPlayer(key)}
              aria-pressed={player === key}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                player === key
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {players[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="aspect-video w-full bg-black">
        <iframe
          key={player}
          src={players[player].src}
          title={`${movieTitle} - ${players[player].label}`}
          className="h-full w-full border-0"
          allowFullScreen
        />
      </div>
    </section>
  );
}
