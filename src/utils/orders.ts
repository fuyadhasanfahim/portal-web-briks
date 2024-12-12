'use server';

import { getLoggedInUserInfo, getUserId } from './users';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function getOrders() {
    const userId = await getUserId();

    const user = await getLoggedInUserInfo(userId);

    try {
        if (!user) {
            console.error('User is not available');
            return null;
        }

        const queryString = new URLSearchParams({
            userId: userId as string,
            role: user?.role as string,
        }).toString();

        const response = await fetch(
            `${BASE_URL}/api/orders/get-all-orders?${queryString}`,
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const { success, data: orders, message } = await response.json();

        if (!success) {
            console.error(message);
            return null;
        }

        return orders;
    } catch (error) {
        console.error('Error fetching orders:', (error as Error).message);
        return null;
    }
}

export async function getPaginatedOrders({
    page,
    limit,
}: {
    page: number;
    limit: number;
}) {
    try {
        const userId = await getUserId();

        const user = await getLoggedInUserInfo(userId);

        if (!user) {
            console.log(user);
            return null;
        }

        const queryString = new URLSearchParams({
            userId: user?.userId,
            role: user?.role,
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const response = await fetch(
            `${BASE_URL}/api/orders/get-paginated-orders?${queryString}`,
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch paginated orders: ${response.status} ${response.statusText}`,
            );
        }

        const {
            success,
            data: orders,
            message,
            pagination,
        } = await response.json();

        if (!success) {
            console.error(message);
            return null;
        }

        return { orders, pagination };
    } catch (error) {
        console.error(
            'Error fetching paginated orders:',
            (error as Error).message,
        );
        return null;
    }
}

export async function getPaginatedOrdersByStatus({
    status,
    page,
    limit,
}: {
    status: string;
    page: number;
    limit: number;
}) {
    try {
        const userId = await getUserId();
        const user = await getLoggedInUserInfo(userId);

        if (!user) {
            console.error('User information not found');
            return { success: false, message: 'User not found', data: null };
        }

        const queryString = new URLSearchParams({
            userId: user.userId,
            role: user.role,
            status,
            page: page.toString(),
            limit: limit.toString(),
        }).toString();

        const response = await fetch(
            `${BASE_URL}/api/orders/get-paginated-orders-by-status?${queryString}`,
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch paginated orders by status: ${response.status} ${response.statusText}`,
            );
        }

        const { success, data, message } = await response.json();

        if (!success) {
            console.error('Backend returned an error:', message);
            return { success: false, message, data: null };
        }

        return { success: true, ...data };
    } catch (error) {
        console.error(
            'Error fetching paginated orders by status:',
            (error as Error).message,
        );
        return {
            success: false,
            message: 'Failed to fetch orders',
            data: null,
        };
    }
}
