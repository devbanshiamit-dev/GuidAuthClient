export const apiRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {

    const response = await fetch(url, options);
    let data: unknown = null;

    try {
        data = await response.json();
    } catch {
        // If the response is not JSON, we can ignore this error
    }

    if (!response.ok) {
        if (
            typeof data === 'object' &&
            data !== null &&
            'message' in data &&
            typeof data.message === 'string'
        ) {
            throw new Error(data.message);
        }
        throw new Error(`Request failed with status ${response.status}`);
    }

    return data as T;
};
