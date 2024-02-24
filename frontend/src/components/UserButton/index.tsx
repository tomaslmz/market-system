import { User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import errorHandler from '../../utils/errorHandler';
import axios from '../../services/axios';
import { toast } from 'sonner';
import Cookies from 'universal-cookie';

export default function UserButton() {
  const [isVisible, setVisible] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const cookies = new Cookies();

  useEffect(() => {
    window.addEventListener('click', (ev: MouseEvent) => {
      if(button.current && button.current.contains(ev.target as Node)) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  });

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
    <>
      <button ref={button}>
        { cookies.get('photo') !== 'undefined' ?
          <img src={cookies.get('photo')} alt="" className='user-icon rounded-full border-2' />
          :
          <User className='bg-white rounded-full user-icon p-3' />
        }
      </button>
      { isVisible && (
        <div className='w-auto h-auto bg-white fixed top-16 right-4 rounded flex justify-center border items-center flex-col p-3'>
          <Link className='hover:underline w-full hover:bg-slate-300 border-b-2' to='/user/settings'>
            User settings
          </Link>
          <button className='hover:underline w-full hover:bg-slate-300' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}