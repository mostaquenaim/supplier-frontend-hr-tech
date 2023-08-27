import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexCheck () {

  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('email');
    console.log(session)

    if (session) {
      router.push('/supplier/updateProfile');
    }
    else{
      router.push('/supplier/login');
    }
    
  }, []);

  return null;
};

