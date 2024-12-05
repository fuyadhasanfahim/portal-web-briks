import { model, models, Schema } from 'mongoose';
import { IAddOn, IFile, IOrder } from './order.interface';

const addOnSchema = new Schema<IAddOn>(
    {
        service: { type: String, required: true },
        sub: { type: String, required: true },
        price: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

const fileSchema = new Schema<IFile>(
    {
        asset_id: { type: String, required: true },
        public_id: { type: String, required: true },
        version: { type: Number, required: true },
        version_id: { type: String, required: true },
        signature: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        format: { type: String, required: true },
        resource_type: { type: String, required: true },
        created_at: { type: String, required: true },
        tags: { type: [String], default: [] },
        bytes: { type: Number, required: true },
        type: { type: String, required: true },
        etag: { type: String, required: true },
        placeholder: { type: Boolean, required: true },
        url: { type: String, required: true },
        secure_url: { type: String, required: true },
        asset_folder: { type: String, required: true },
        display_name: { type: String, required: true },
        original_filename: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const orderSchema = new Schema<IOrder>(
    {
        userId: { type: String, required: true, ref: 'User' },
        name: { type: String, required: true, ref: 'User' },
        username: { type: String, required: true, ref: 'User' },
        email: { type: String, required: true, ref: 'User' },
        orderId: { type: String, required: true },
        files: { type: [fileSchema], required: true },
        title: { type: String, required: true },
        metadata: { type: [String], required: true },
        flatness: { type: String, required: true },
        outputFormats: { type: [String], required: true },
        backgroundOption: { type: String, required: true },
        instructions: { type: String, required: true },
        addOns: { type: [addOnSchema], required: true },
        deliveryTime: { type: String, required: true },
        paymentStatus: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        estimatedTotalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: [
                'pending',
                'in-progress',
                'completed',
                'delivered',
                'review',
                'finished',
            ],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    },
);

const orderModel = models?.Order || model('Order', orderSchema);
export default orderModel;
