export const GET = (context: any) => {
  const runtime = context.locals.runtime;
  const { LASTFM_USER, LASTFM_API_KEY } = runtime.env;

  //   const LASTFM_USER = import.meta.env.LASTFM_USER;
  //   const LASTFM_API_KEY = import.meta.env.LASTFM_API_KEY;

  return new Response(
    JSON.stringify({
      body: JSON.stringify({
        LASTFM_USER: LASTFM_USER,
        LASTFM_API_KEY: LASTFM_API_KEY,
      }),
    })
  );
};
