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
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import Link from 'next/link';
import { signupUser } from '@/actions/user.action';
import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Signup() {
    const session = await getSession();
    const user = session?.user;
    if (user) redirect('/');

    return (
        <form className="space-y-10 my-20" action={signupUser}>
            <Image
                src={Logo}
                alt="company logo"
                height={100}
                className="h-10 w-auto mx-auto"
            />
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-medium">
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter a unique username"
                                autoComplete="username"
                                required
                            />
                        </div>
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
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="Enter your phone number"
                                autoComplete="tel"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                placeholder="Enter your company name"
                                autoComplete="organization"
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                name="country"
                                type="text"
                                placeholder="Enter your country"
                                autoComplete="country-name"
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
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 flex-1">
                    <div>
                        <p className="text-sm flex items-center gap-2 hover:underline">
                            {`Already have an account?`}
                            <Link href="/signin" className="text-blue-600">
                                Sign In
                            </Link>
                        </p>
                    </div>
                    <Button className="w-full" type="submit">
                        Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
