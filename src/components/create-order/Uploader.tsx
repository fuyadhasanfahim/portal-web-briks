import { UploadCloud } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import {
    DropzoneInputProps,
    DropzoneRootProps,
    useDropzone,
} from 'react-dropzone';
import { format } from 'date-fns';
import axios from 'axios';
import generateRandomCode from '@/utils/generateRandomCode';
import { toast } from 'react-hot-toast';

interface UploadUIProps {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
    isDragActive: boolean;
    value: File[];
}

function UploadUI({
    getRootProps,
    getInputProps,
    isDragActive,
    value,
}: UploadUIProps) {
    return (
        <div
            {...getRootProps()}
            className={`h-56 bg-white rounded-lg border-spacing-4 border-2 border-[#ececec] border-dashed flex items-center justify-center ${
                isDragActive ? 'border-[#ffa726]' : ''
            }`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center">
                <UploadCloud size={60} />
                {value?.length === 0 ? (
                    <div className="text-center">
                        <span className="text-[#424242] text-sm font-normal">
                            Drop files to upload files or <br />
                        </span>
                        <span className="text-[#ffa726] text-sm font-normal underline">
                            Click Here
                        </span>
                    </div>
                ) : (
                    <div className="text-center">{value?.length || 0}</div>
                )}
            </div>
        </div>
    );
}

interface UploaderProps {
    username: string;
    value: File[];
    setValue: Dispatch<SetStateAction<File[]>>;
}

export default function Uploader({ username, value, setValue }: UploaderProps) {
    const onDrop = async (acceptedFiles: File[]) => {
        const timestamp = format(new Date(), 'dd-MM-yyyy');
        const randomCode = generateRandomCode();
        const folder = `portal-web-briks-llc/${username}/${timestamp}-${randomCode}`;

        toast.promise(
            // Upload all files and wait for them to complete
            Promise.all(
                acceptedFiles.map(async (file) => {
                    const data = new FormData();
                    data.append('file', file);
                    data.append('folder', folder);

                    const response = await axios.post(
                        '/api/orders/uploads',
                        data,
                    );
                    return response.data;
                }),
            ).then((responses) => {
                // Update state with all uploaded files at once
                setValue((prevFiles) => [...prevFiles, ...responses]);
            }),
            {
                loading: `Uploading ${acceptedFiles.length} file${
                    acceptedFiles.length > 1 ? 's' : ''
                }...`,
                success: `Successfully uploaded ${acceptedFiles.length} file${
                    acceptedFiles.length > 1 ? 's' : ''
                }!`,
                error: 'Error uploading files.',
            },
        );
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true,
    });

    return (
        <UploadUI
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            value={value}
        />
    );
}
