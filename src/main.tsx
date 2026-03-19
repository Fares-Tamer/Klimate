import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/context/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:5*60*1000,//5 minute
      gcTime:10*60*1000, // 10 minute
      retry:false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }
})
createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>


        <ThemeProvider defaultTheme='dark'>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
          
        </ThemeProvider>



      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
) 
