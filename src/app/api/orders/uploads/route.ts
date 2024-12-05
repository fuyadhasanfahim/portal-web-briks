import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as Blob;
        const folder = formData.get('folder') as string;

        if (!file) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 },
            );
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);
        if (folder) {
            data.append('folder', folder);
        }

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: data,
            },
        );

        if (!response.ok) {
            throw new Error('Failed to upload to Cloudinary');
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json(
            { error: 'File upload failed' },
            { status: 500 },
        );
    }
}
