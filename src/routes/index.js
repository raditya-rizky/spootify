import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Discover } from './Discover';

const queryClient = new QueryClient()

export default function Routes() {
  // Here you'd return an array of routes
  return (
    <QueryClientProvider client={queryClient}>
      <Discover />
    </QueryClientProvider>
  )
}
