export const clientEnv = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? '',
} as const;
