'use client';

import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import axios from 'axios';
import generateRandomCode from '@/utils/generateRandomCode';

export default function Uploader({
    username,
    files,
    setValue,
}: {
    username: string;
    files: File[];
    setValue: Dispatch<SetStateAction<File[]>>;
}) {
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const timestamp = format(new Date(), 'dd-MM-yyyy');
    const randomCode = generateRandomCode();

    const onDrop = async (acceptedFiles: File[]) => {
        setIsUploading(true);
        const folder = `portal-web-briks-llc/${username}/${timestamp}-${randomCode}`;

        for (const file of acceptedFiles) {
            const data = new FormData();
            data.append('file', file);
            data.append('folder', folder);

            try {
                const response = await axios.post('/api/uploads', data);
                setValue((prevFiles) => [...prevFiles, response.data]);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...previews]);

        setIsUploading(false);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    useEffect(() => {
        return () => {
            previewImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previewImages]);

    return (
        <div className="space-y-4 bg-white rounded-md">
            <div
                className={`${
                    isUploading || previewImages.length > 0 ? 'hidden' : 'grid'
                } w-full max-w-sm items-center gap-1.5`}
            >
                <div
                    {...getRootProps()}
                    className={`relative border-2 border-gray-300 border-dashed rounded-md p-6 cursor-pointer hover:border-gray-500 transition-all h-full min-h-screen ${
                        isDragActive ? 'border-yellow-500' : ''
                    }`}
                >
                    <input
                        {...getInputProps()}
                        name="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        multiple
                    />
                    <div className="flex flex-col items-center justify-center h-full">
                        <UploadCloud className="text-gray-500 mb-3 w-10 h-10" />
                        <p className="text-gray-600 text-center italic text-lg">
                            <span className="text-2xl font-extrabold">
                                {'> '}
                            </span>
                            <span className="text-2xl font-bold">
                                Drop files
                            </span>{' '}
                            to upload files <br />
                            <span>(or click)</span>
                        </p>
                    </div>
                </div>
            </div>

            {isUploading && (
                <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
                    <video
                        src="/uploading.webm"
                        autoPlay
                        loop
                        muted
                        className="w-40 h-40"
                    />
                    <p className="text-gray-600 text-center text-lg">
                        {files?.length > 0
                            ? `Uploaded ${files?.length}`
                            : 'Uploading...'}
                    </p>
                </div>
            )}

            {!isUploading && previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 border-2 p-4 rounded-md">
                    {previewImages.map((previewUrl, index) => (
                        <div key={index} className="w-auto h-20 relative">
                            <Image
                                src={previewUrl}
                                alt={`File preview ${index}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
