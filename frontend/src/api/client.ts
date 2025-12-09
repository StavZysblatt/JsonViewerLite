const BASE_URL = import.meta.env.VITE_API_BASE; //Getting the url from the .env file

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> { //RequestInit = predefined dict that holds different props that can be passed from a fetch call
  const url = `${BASE_URL}${path}`;
  const headers = new Headers(options.headers);
  const body = options.body;

  const isFormData = body instanceof FormData; //check if body is formData and store the answer
                                               //Sometimes we recieve FormData but sometimes we dont, /compare uses a json

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options, //Spreader function - takes all the keys inside options and copies them to a new object
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API Error ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}
