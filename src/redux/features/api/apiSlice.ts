import getAuthToken from '@/utils/getAuthToken';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders: async (headers) => {
            const token = await getAuthToken() || "";
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (_builder) => ({}),
});
