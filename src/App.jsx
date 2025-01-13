import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MapPage from './pages/MapPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactsContext from './contexts/ContactsContext';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9b59b6',
    },
  },
});


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path="/" element={<MapPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  const [contacts, setContacts] = useState([]);
  return(
    <ContactsContext.Provider value={[contacts, setContacts]}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ContactsContext.Provider>
  )
}

export default App
