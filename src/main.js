import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/context/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, //5 minute
            gcTime: 10 * 60 * 1000, // 10 minute
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    }
});
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsxs(ThemeProvider, { defaultTheme: 'dark', children: [_jsx(App, {}), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }) }) }) }));
