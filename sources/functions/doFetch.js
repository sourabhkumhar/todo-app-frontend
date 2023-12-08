export const host =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1000"
    : "https://todo-app-backend-api.vercel.app";

// Fetch function
const doFetch = async (path, method, body, options = {}) => {
  try {
    const res = await fetch(`${host}/api/${path}`, {
      ...options,
      method: method || "GET",
      body: typeof body === "object" ? JSON.stringify(body) : body,
      credentials: options.credentials || "include",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default doFetch;
