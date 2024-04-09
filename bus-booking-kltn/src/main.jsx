import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStateProvider } from './component/common/globaleState.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen></ReactQueryDevtools>
        </QueryClientProvider>
      </BrowserRouter>
    </GlobalStateProvider>
  </React.StrictMode>,
)
