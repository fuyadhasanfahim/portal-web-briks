'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchDialog } from './SearchDialog';

export default function OnSearchButton() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setSearchOpen(true)}
            >
                <Search className="w-5 h-5 text-gray-600" />
            </button>

            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}
