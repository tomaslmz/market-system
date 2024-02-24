import Searchbar from '../Searchbar';
import Icon from '../../assets/Icon';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './index.css';

export default function Header() {
  const cookies = new Cookies();

  const loginStatus = cookies.get('loginStatus');

  return (
    <header className="w-full-screen bg-blue-500 p-5">
      <div className='flex gap-3 items-center'>
        <Icon className='w-1/3 max-w-32' />
        <Searchbar />
        <div className='flex justify-center gap-3'>
          {
            loginStatus ? 
              <User className='bg-white rounded-full user-icon p-3' />
              :
              (<>
                <Link to="/login" className='hover:underline'>Login</Link>
                <Link to="/register" className='hover:underline'>Register</Link>
              </>)
          }
        </div>
      </div>
      <nav className='mt-3'>
        <ul className='flex gap-3 justify-center'>
          <Link to="/products" className='hover:underline'>Products</Link>
          <Link to="/tags" className='hover:underline'>Tags</Link>
        </ul>
      </nav>
    </header>
  );
}