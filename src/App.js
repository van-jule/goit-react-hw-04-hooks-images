import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageStateCar from './components/ImageStateCar';

const App = () => {
  const [queryValue, setQueryValue] = useState('');

  const handleFormSubmit = queryValue => setQueryValue(queryValue);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageStateCar queryValue={queryValue} page={1} />
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
