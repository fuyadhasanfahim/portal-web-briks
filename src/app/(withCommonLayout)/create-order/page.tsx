import CreateOrderMain from '@/components/dashboard/create-order/Main';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function CreateOrder() {
    const session = await getSession();
    const user = session?.user;

    if (!user) redirect('/signin');

    const { userId, username, email, name } = user;

    return <CreateOrderMain user={{ userId, username, email, name }} />;
}
