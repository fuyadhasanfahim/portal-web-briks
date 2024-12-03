import Link from 'next/link';
import Notfound from '@/assets/not-found.gif';

export default function NotFound() {
    return (
        <section className="py-10 bg-white flex items-center justify-center h-screen">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-10 col-sm-offset-1 text-center">
                            <div
                                className="h-[400px] bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${Notfound?.src})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                <h1 className="text-center text-8xl">404</h1>
                            </div>
                            <div className="-mt-12">
                                <h3 className="text-4xl">{`Looks like you're lost`}</h3>
                                <p>
                                    The page you are looking for is not
                                    available!
                                </p>
                                <Link
                                    href="/"
                                    className="text-white bg-green-500 my-5 inline-block py-3 px-6 rounded hover:bg-green-600"
                                >
                                    Go to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
