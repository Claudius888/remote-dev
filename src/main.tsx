import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('GLOBAL', error.message);
      // if (query.state.data !== undefined) {
      toast.error(`Something went wrong: ${error.message}`);
      // }
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-right' />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
