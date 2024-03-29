import { Search } from 'lucide-react';
import './index.css';

export default function Searchbar() {
  return (
    <div className="flex flex-row items-center md:mx-auto">
      <input type="text" className='rounded-l-xl p-1 sm:w-full md:w-96' />
      <Search className='icon bg-white hover:cursor-pointer p-1 rounded-r-xl border-l hover:bg-slate-200' id='icon' />
    </div>
  );
}