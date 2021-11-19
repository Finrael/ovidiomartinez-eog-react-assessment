import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { store } from './redux/store';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import MainComponent from './components/MainComponent';
import { client } from './GraphQL/client';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <Header />
          <MainComponent />
          <ToastContainer />
        </Wrapper>
      </MuiThemeProvider>
    </ApolloProvider>
  </Provider>
);

export default App;
