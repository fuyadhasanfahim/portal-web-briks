export async function getOrders(data: { userId: string; role: string }) {
    try {
        const queryString = new URLSearchParams(data).toString();
        const response = await fetch(
            `http://localhost:3000/api/orders/get-all-orders?${queryString}`,
        );

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const { success, data: orders, message } = await response.json();

        if (!success) {
            console.error(message);
            return null;
        }

        return orders;
    } catch (error) {
        console.log((error as Error).message);
        return null;
    }
}
