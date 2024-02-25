import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from '../../services/axios';
import { toast } from 'sonner';
import errorHandler from '../../utils/errorHandler';

interface HamburgerMenuProps {
  className: string;
}

export default function HamburgerMenu({ className }: HamburgerMenuProps) {
  const cookies = new Cookies();

  const loginStatus = cookies.get('loginStatus');

  const handleLogout = async () => {
    try {
      const response = await axios.delete('/token');

      toast.success(response.data.message);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch(err: unknown) {
      errorHandler(err);
    }
  };

  return (
    <div className={`w-full bg-blue-800 flex items-center justify-around overflow-hidden menu ${className}`}>
      {
        loginStatus ? 
          <>
            {
              cookies.get('photo') !== 'undefined' ?
                <img src={cookies.get('photo')} alt="" className='user-icon rounded-full border-2' />
                :
                <User className='bg-white rounded-full user-icon p-3' />
            }
            <div className='flex flex-col gap-5'>
              <Link className='hover:underline w-auto text-white hover:bg-slate-300' to='/user/settings'>
            User settings
              </Link>
              <button className='hover:underline w-auto text-white hover:bg-slate-300' onClick={handleLogout}>
            Logout
              </button>
            </div>
          </>
          :
          (
            <div className='flex flex-col gap-5 items-center justify-center w-full'>
              <Link to="/login" className='hover:underline text-white'>Login</Link>
              <Link to="/register" className='hover:underline text-white'>Register</Link>
            </div>
          )
      }
    </div>
  );
}