export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (response.ok) {
      return new Response(JSON.stringify(result.token.accessToken), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify(result), { status: response.status });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
