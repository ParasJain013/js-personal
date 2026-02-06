import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950">
            <div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 shadow-lg rounded-2xl px-6 py-4 flex items-center space-x-3">
                <Loader2 className="h-8 w-8 animate-spin text-gray-800 dark:text-gray-200" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                    Loading...
                </span>
            </div>
        </div>
    );
}
