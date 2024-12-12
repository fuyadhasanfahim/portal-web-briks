'use server';

import { getSession } from '@/lib/getSession';
import getLoggedInUserInfo from './users';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL! || 'http://localhost:3000';

const session = await getSession();
const userId = session?.user?.userId as string;
const user = await getLoggedInUserInfo(userId);

export async function getOrders() {
    try {
        if (!user) {
            console.error('User is not available');
            return null;
        }

        const response = await fetch(`${BASE_URL}/api/orders/get-all-orders`);

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
