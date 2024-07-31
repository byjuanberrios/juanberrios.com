export async function GET({}) {
  const LASTFM_USER = import.meta.env.LASTFM_USER ?? process.env.LASTFM_USER;
  const LASTFM_API_KEY =
    import.meta.env.LASTFM_API_KEY ?? process.env.LASTFM_API_KEY;

  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
  )
    .then((res) => res.json())
    .then((data) => data);

  return new Response(JSON.stringify(response));
}
