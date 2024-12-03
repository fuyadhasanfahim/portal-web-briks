import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: '/auth/signup',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        userLoggedIn({
                            user: data.user,
                        }),
                    );
                } catch (error) {
                    throw new Error((error as Error).message);
                }
            },
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: '/auth/signin',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        userLoggedIn({
                            user: data.user,
                        }),
                    );
                } catch (error) {
                    throw new Error((error as Error).message);
                }
            },
        }),
        fetchSignedInUser: builder.query({
            query: () => ({
                url: '/auth/get-signed-in-user-info',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(
                        userLoggedIn({
                            user: data.user,
                        }),
                    );
                } catch (error) {
                    throw new Error((error as Error).message);
                }
            },
        }),
    }),
});

export const {
    useSignupMutation,
    useSigninMutation,
    useFetchSignedInUserQuery,
} = authApi;
