import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useDispatch } from 'react-redux';
import { setTrackUserId, setUserProfile } from '../store/globalSlice';

export const useAuthRedirect = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUserProfile(JSON.parse(storedUser)));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate(path);
      }
      dispatch(setTrackUserId(user.uid))
      
    });

    return () => unsubscribe();
  }, [navigate, path, dispatch]);
};
