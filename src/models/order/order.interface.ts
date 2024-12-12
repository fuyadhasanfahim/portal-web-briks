export interface IOrder {
    userId: string;
    name: string;
    username: string;
    email: string;
    profileImage: string;
    orderId: string;
    files?: IFile[];
    title: string;
    dueDate: { from: Date; to: Date };
    pricePerImage: number;
    metadata?: string;
    flatness?: string;
    outputFormat: string;
    backgroundOption: string;
    description?: string;
    addOns?: IAddOn[];
    deliveryTime: '12-hours' | '24-hours' | '48-hours';
    paymentTerms: 'pay-now' | 'pay-later';
    status: string;
    estimatedTotal: string;
    paymentStatus: string;
}

export interface IFile {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    asset_folder: string;
    display_name: string;
    original_filename: string;
}

export interface IAddOn {
    service: string;
    sub: string;
    price: number;
}
