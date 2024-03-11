import { useQuery } from '@tanstack/react-query';
import Header from '../../components/Header';
import getUser from '../../data/User/getUser';
import { Toaster, toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
import errorHandler from '../../utils/errorHandler';
import { z } from 'zod';
import axios from '../../services/axios';

interface UserInput {
  name: string;
  email: string;
  password: string;
}

const updateSchema = z.object({
  name: z.
    string().min(3, { message: 'Name must be greater than 3 characters!'}),
  email: z.
    string().email({ message: 'Insert a valid e-mail! '}),
  password: z.
    string().min(5, { message: 'The password must be greater than 5 characters!' })
});

export default function UserSettings() {
  const { register, handleSubmit } = useForm<UserInput>();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  const handleEdit: SubmitHandler<UserInput> = async (data) => {
    try {
      await updateSchema.parseAsync(data);

      const response = await axios.patch('/user/update', data);

      toast.success(response.data.message);
    } catch(err: unknown) {
      errorHandler(err);
    }
  };

  return (
    <>
      <Header />
      <div className='w-screen h-[calc(100vh-126px)] bg-blue-500'>
        <main className="w-screen h-full flex justify-center items-center">
          <form className='bg-white h-auto p-6 md:w-2/4 lg:w-2/4 sm:w-5/6 rounded-xl flex flex-col mx-auto max-w-lg justify-center gap-12' onSubmit={handleSubmit(handleEdit)}>
            <h1 className='font-bold text-lg text-center'>Edit your data</h1>
            {
              user && (
                <>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" className='max-w-full border-2 rounded p-2 shadow-sm' {... register('name')} value={user.name} />
                  </div>
                  <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" className='max-w-full border-2 rounded p-2 shadow-sm' {... register('email')} value={user.email} />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className='max-w-full border-2 rounded p-2 shadow-sm' {... register('password')} />
                  </div>
                </>
              )
            }
            <aside className='flex flex-col gap-3'>
              <button type='submit' className='bg-blue-700 py-3 max-w-32 rounded font-bold text-white'>
              Login
              </button>
            </aside>
          </form>
        </main>
      </div>
      <Toaster />
    </>
  );
}