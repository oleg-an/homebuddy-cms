import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './globals.d.ts';
import 'shared/theme/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { ErrorBoundary } from 'react-error-boundary';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

import '@stripe/stripe-js';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';
import { QueryClientProviderWrapper } from './QueryClientProviderWrapper';
import { App } from './App';

function getBaseUrl() {
  return process.env.REACT_APP_API_BASE_URL;
}

axios.defaults.baseURL = getBaseUrl();

ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
    <StrictMode>
      <Router>
        <QueryClientProviderWrapper>
          <App />
        </QueryClientProviderWrapper>
      </Router>
    </StrictMode>
  </ErrorBoundary>,
  document.getElementById('root')
);
