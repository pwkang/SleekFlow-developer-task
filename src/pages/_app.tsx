import {AppProps} from 'next/app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: true,
      // 10 minutes until data is considered stale
      staleTime: 10 * 60 * 1000,
      // 10 minutes cache time
      cacheTime: 10 * 60 * 1000,
    },
  },
});

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
