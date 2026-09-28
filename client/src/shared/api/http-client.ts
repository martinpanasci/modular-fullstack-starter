import { clientEnv } from '@/shared/config/client-env';

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export async function httpClient<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(`${clientEnv.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `HTTP request failed: ${response.status}`,
    );
  }

  return (await response.json()) as TResponse;
}
