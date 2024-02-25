import { useForm, SubmitHandler } from 'react-hook-form';
import Icon from '../../assets/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { z } from 'zod';
import axios from '../../services/axios';
import errorHandler from '../../utils/errorHandler';

interface LoginInput {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.
    string().email({ message: 'Insert a valid e-mail! '}),
  password: z.
    string().min(5, { message: 'The password must be greater than 5 characters!' })
});

export default function Login() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const navigate = useNavigate();

  const loginRequest: SubmitHandler<LoginInput> = async (data) => {
    try {
      await loginSchema.parseAsync(data);

      const response = await axios.post('/token', data);

      toast.success(response.data.message);

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch(err: unknown) {
      errorHandler(err);
    }
  };

  return (
    <>
      <div className='w-screen h-screen bg-blue-500'>
        <main className="w-screen h-screen flex justify-center items-center">
          <Icon className='max-w-48 fixed left-1 top-4' />
          <form className='bg-white h-auto p-6 md:w-2/4 lg:w-2/4 sm:w-5/6 rounded-xl flex flex-col mx-auto max-w-lg justify-center gap-12' onSubmit={handleSubmit(loginRequest)}>
            <h1 className='font-bold text-lg text-center'>Login</h1>
            <div>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" className='max-w-full border-2 rounded p-2 shadow-sm' {... register('email')} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className='max-w-full border-2 rounded p-2 shadow-sm' {... register('password')} />
            </div>
            <aside className='flex flex-col gap-3'>
              <button type='submit' className='bg-blue-700 py-3 max-w-32 rounded font-bold text-white'>
              Login
              </button>
              <Link to="/register" className='text-sm mt-4'>
              Are you new here? Try to register now!
              </Link>
            </aside>
          </form>
        </main>
      </div>
      <Toaster />
    </>
  );
}