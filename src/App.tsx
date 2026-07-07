import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch } from 'wouter';
import { trpc, getTRPCClient } from './lib/trpc';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { WikiListPage } from './pages/WikiListPage';
import { WikiArticlePage } from './pages/WikiArticlePage';
import { ClaimListPage } from './pages/ClaimListPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { RegulationsPage } from './pages/RegulationsPage';
import { DataRoomPage } from './pages/DataRoomPage';
import { DataRoomDetailPage } from './pages/DataRoomDetailPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AskAIPage } from './pages/AskAIPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
  }));
  const [trpcClient] = useState(() => getTRPCClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/wiki" component={WikiListPage} />
            <Route path="/wiki/:slug" component={WikiArticlePage} />
            <Route path="/claim-records" component={ClaimListPage} />
            <Route path="/claim/:slug" component={ClaimDetailPage} />
            <Route path="/regulations" component={RegulationsPage} />
            <Route path="/data-room" component={DataRoomPage} />
            <Route path="/data-room/:slug" component={DataRoomDetailPage} />
            <Route path="/documents" component={DocumentsPage} />
            <Route path="/ask" component={AskAIPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
