export const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function api(
    path: string,
    options: RequestInit = {},
) {
    const response = await fetch(`${VITE_API_URL}${path}`, {
        ...options,
    });

    if(!response.ok) {
        // setError

        return null;
    }

    const result = await response.json();
    return result;
}