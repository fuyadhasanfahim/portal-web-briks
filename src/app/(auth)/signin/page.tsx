import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { signinUser } from '@/actions/user.action';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Signin() {
    const session = await getSession();
    const user = session?.user;
    if (user) redirect('/');

    return (
        <form className="space-y-10" action={signinUser}>
            <Image
                src={Logo}
                alt="company logo"
                height={40}
                className="mx-auto"
            />
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-medium">
                        Sign In
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="password"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 flex-1">
                    <div>
                        <p className="text-sm flex items-center gap-2 hover:underline">
                            {`Don't have any account?`}
                            <Link href="/signup" className="text-blue-600">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    <Button className="w-full" type="submit">
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
