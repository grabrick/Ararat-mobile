import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Navigate } from './navigate';


const App = () => {
  return (
    <Provider store={store}>
      <Navigate />
    </Provider>
  );
};

export default App;