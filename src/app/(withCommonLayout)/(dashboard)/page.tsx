import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getSession();
    const user = session?.user;

    if (!user) redirect('/signin');

    console.log(user);

    return (
        <div>
            <h1>This is page component.</h1>
        </div>
    );
}
