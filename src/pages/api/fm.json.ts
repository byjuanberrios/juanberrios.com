export async function GET(context: any) {
  const runtime = context.locals.runtime;
  const { LASTFM_USER, LASTFM_API_KEY } = runtime.env;

  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
  )
    .then((res) => res.json())
    .then((data) => data);

  return new Response(JSON.stringify(response));
}
