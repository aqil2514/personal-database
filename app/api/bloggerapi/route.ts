export async function GET() {
  try {
    const res = await fetch(process.env.BLOGGER_API ?? "");

    const api = process.env.BLOGGER_API;

    return Response.json({ api, res });
  } catch (error) {}
}
