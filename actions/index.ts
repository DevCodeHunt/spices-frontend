'use server'

import { axiosInstance } from '@/lib/axios';
import { revalidatePath } from 'next/cache';
import { revalidateTag } from 'next/cache'

export const addBanner = async (formData: FormData) => {
    await axiosInstance.post("/banners", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    revalidatePath("/admin/banners")
}