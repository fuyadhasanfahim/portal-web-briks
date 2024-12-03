'use server';

import { cookies } from 'next/headers';

export default async function getAuthToken() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;
    return accessToken || refreshToken || null;
}
