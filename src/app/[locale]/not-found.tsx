import Link from "next/link";

export default function NotFound() {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold tracking-widest">404</h1>
                <p className="text-2xl mt-4">Oops! The page you're looking for doesn't exist.</p>
                <Link href="/" className="mt-6 inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">Go Home</Link>
            </div>
        </div>
    );
}