import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { ZodError } from 'zod';

export default function errorHandler(err: unknown) {
  if(err instanceof AxiosError) {
    toast.error(err.response?.data.message);
  } else if(err instanceof ZodError) {
    err.issues.map((issue) => toast.error(issue.message));
  } else {
    console.log(err);
  }
} 