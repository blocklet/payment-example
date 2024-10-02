import './app.css';

import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { ThemeProvider, create } from '@arcblock/ux/lib/Theme';
import { translations } from '@blocklet/payment-react';
import Header from '@blocklet/ui-react/lib/Header';
import { Container } from '@mui/material';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { SessionProvider } from './contexts/session';
import Checkout from './pages/checkout';
import Home from './pages/home';
import Subscription from './pages/subscription';
import Utils from './pages/utils';

const theme = create({
  // typography: {
  //   fontSize: 14,
  //   allVariants: {
  //     textTransform: 'none',
  //   },
  // },
  palette: {
    primary: {
      main: '#1DC1C7',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <Container className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/utils" element={<Utils />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider serviceHost="/">
        <LocaleProvider translations={translations}>
          <Router basename={basename}>
            <App />
          </Router>
        </LocaleProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
