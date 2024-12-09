import CreateOrderForm from '@/components/create-order/CreateOrderForm';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await getSession();
    const user = session?.user;

    if (!user) redirect('/signin');

    return (
        <div>
            <CreateOrderForm user={user} />
        </div>
    );
}
