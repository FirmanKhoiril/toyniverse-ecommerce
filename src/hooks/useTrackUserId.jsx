import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { auth } from '../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setTrackUserId } from '../store/globalSlice';

export default function useTrackUserId() {
  const dispatch = useDispatch()
    const {userId} = useSelector((state) => state.global)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(setTrackUserId(user.uid))
          } else {
            dispatch(setTrackUserId(""))
          }
        });
    
        return () => unsubscribe();
      }, []);

      return userId
}
