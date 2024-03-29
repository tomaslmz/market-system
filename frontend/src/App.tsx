import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FilterRoute from './routes/FilterRoute';
import Register from './pages/Register';
import UserSettings from './pages/UserSettings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<FilterRoute />}>
          <Route path="/login" element={<Login/>} /> 
        </Route>
        <Route path='/register' element={<FilterRoute />}>
          <Route path="/register" element={<Register />} /> 
        </Route>
        <Route path='/user/settings' element={<FilterRoute isClosed />}>
          <Route path="/user/settings" element={<UserSettings />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}