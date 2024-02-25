import Searchbar from '../Searchbar';
import Icon from '../../assets/Icon';
import UserButton from '../UserButton';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './index.css';
import { Menu, X } from 'lucide-react';
import HamburgerMenu from '../HamburgerMenu';
import { useState } from 'react';

export default function Header() {
  const cookies = new Cookies();

  const loginStatus = cookies.get('loginStatus');

  const [isOpen, setOpen] = useState('h-0');

  const handleOpen = () => {
    if(isOpen === 'h-0') {
      setOpen('h-auto p-5');
    } else {
      setOpen('h-0');
    }
  };

  return (
    <header className="w-full-screen">
      <div className='w-full bg-blue-500 p-5'>
        <div className='flex gap-3 items-center justify-between'>
          <Icon className='w-1/3 max-w-32 sm:hidden' />
          <Searchbar />
          <div className='flex justify-center gap-3 sm:hidden'>
            {
              loginStatus ? 
                <UserButton />
                :
                (<>
                  <Link to="/login" className='hover:underline'>Login</Link>
                  <Link to="/register" className='hover:underline'>Register</Link>
                </>)
            }
          </div>
          <div className='md:hidden lg:hidden'>
            <button onClick={handleOpen}>
              {
                isOpen === 'h-0' ?
                  <Menu />
                  :
                  <X />
              }
            </button>
          </div>
        </div>
        <nav className='mt-3 w-auto flex justify-center lg:ml-10'>
          <ul className='flex gap-3 mx-auto'>
            <Link to="/products" className='hover:underline'>Products</Link>
            <Link to="/tags" className='hover:underline'>Tags</Link>
          </ul>
        </nav>
      </div>
      <HamburgerMenu className={isOpen} />
    </header>
  );
}