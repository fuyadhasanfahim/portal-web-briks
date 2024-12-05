export interface IOrder {
    userId: string;
    name: string;
    username: string;
    email: string;
    orderId: string;
    files: IFile[];
    title: string;
    metadata: string[];
    flatness: string;
    outputFormats: string[];
    backgroundOption: string;
    instructions: string;
    addOns: IAddOn[];
    deliveryTime: string;
    paymentStatus: string;
    paymentMethod: string;
    estimatedTotalPrice: number;
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
