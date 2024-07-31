export const GET = ({}) => {
  const LASTFM_USER = import.meta.env.LASTFM_USER ?? process.env.LASTFM_USER;
  const LASTFM_API_KEY =
    import.meta.env.LASTFM_API_KEY ?? process.env.LASTFM_API_KEY;

  return new Response(
    JSON.stringify({
      body: JSON.stringify({
        LASTFM_USER: LASTFM_USER,
        LASTFM_API_KEY: LASTFM_API_KEY,
      }),
    })
  );
};
