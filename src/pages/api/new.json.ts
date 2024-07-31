export const GET = ({}) => {
  return new Response(
    JSON.stringify({
      body: JSON.stringify({
        message: "This was a GET!",
      }),
    })
  );
};
