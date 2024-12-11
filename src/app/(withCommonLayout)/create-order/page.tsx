import CreateOrderForm from '@/components/create-order/CreateOrderForm';
import { getSession } from '@/lib/getSession';
import getLoggedInUserInfo from '@/utils/users';
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await getSession();
    const userId = session?.user?.userId;

    if (!userId) redirect('/signin');

    const user = await getLoggedInUserInfo(userId);

    return (
        <div>
            <CreateOrderForm user={user} />
        </div>
    );
}
