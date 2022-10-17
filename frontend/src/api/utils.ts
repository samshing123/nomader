export async function fetchJson<T = unknown>(
    input: RequestInfo | URL,
    init?: RequestInit
) {
    const resp = await fetch(input, init);

    const data = await resp.json();

    if (resp.ok) {
        return data as T;
    } else {
        console.log(new APIError(resp.status, data.message));
        throw new APIError(resp.status, data.message);
    }
}

export class APIError extends Error {
    constructor(public httpStatus: number, message?: string) {
        super(message ?? "error message");

        Object.setPrototypeOf(this, APIError.prototype);
    }
}
