'use server';

export async function handleSearch(formData: FormData) {
    const searchQuery = formData.get('searchQuery')?.toString() || '';

    console.log('Searching for:', searchQuery);

    // return { searchQuery };
}
