import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store'; // Ваше хранилище
import MainPage from './src/pages/MainPage/MainPage';

const App = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default App;