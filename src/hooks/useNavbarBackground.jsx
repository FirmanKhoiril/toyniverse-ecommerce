import { useState, useEffect } from 'react';

export const useNavbarBackground = () => {
  const [navbarBg, setNavbarBg] = useState('bg-transparent shadow-none');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) { 
        setNavbarBg('bg-white  shadow');
      } else {
        setNavbarBg('bg-transparent shadow-none');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return navbarBg;
};
