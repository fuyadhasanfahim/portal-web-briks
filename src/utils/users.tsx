export default async function getLoggedInUserInfo(userId: string) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/auth/get-logged-in-user/${userId}`,
            {
                method: 'GET',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            console.error('Failed to fetch user data');
            return null;
        }

        const { success, data, message } = await response.json();

        if (!success) {
            console.error(message);
            return null;
        }

        return data;
    } catch (error) {
        console.error('An error occurred while fetching user data:', error);
        return null;
    }
}
