import { useAppDispatch } from '@/redux/hooks';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react'

const useUserMutation = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch();

    
  return 
}

export default useUserMutation