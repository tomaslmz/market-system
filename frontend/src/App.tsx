import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FilterRoute from './routes/FilterRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<FilterRoute />}>
          <Route path="/login" element={<Login/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}