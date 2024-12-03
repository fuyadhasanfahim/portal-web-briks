import { ReactNode } from 'react';
import AuthBackground from '@/assets/auth-background.jpg';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div
            className="w-full h-full mx-auto min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${AuthBackground.src})`,
            }}
        >
            {children}
        </div>
    );
}
