const apiUrl = `http://${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT}/api/products`;

export async function GET(req: Request) {
  const res = await fetch(apiUrl);
  if (!res.ok) {
    return new Response(
      JSON.stringify({ message: "Error fetching products" }),
      {
        status: 500,
      }
    );
  }
  const products = await res.json();
  return new Response(JSON.stringify(products), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    return new Response(JSON.stringify({ message: "Error creating product" }), {
      status: 500,
    });
  }
  const product = await res.json();
  return new Response(JSON.stringify(product), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const res = await fetch(`${apiUrl}/${body.id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    return new Response(JSON.stringify({ message: "Error updating product" }), {
      status: 500,
    });
  }
  const product = await res.json();
  return new Response(JSON.stringify(product), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const res = await fetch(`${apiUrl}/${body.id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return new Response(JSON.stringify({ message: "Error deleting product" }), {
      status: 500,
    });
  }
  const product = await res.json();
  return new Response(JSON.stringify(product), {
    headers: {
      "content-type": "application/json",
    },
  });
}
