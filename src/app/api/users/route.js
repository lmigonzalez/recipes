export const GET = async (request) => {
  try {
    return new Response("Hello", { status: 200 });
  } catch (e) {
    return new Response("error", { status: 500 });
  }
};
