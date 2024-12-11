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

const orderSchema = new Schema<IOrder>({
    userId: { type: String, ref: 'user', required: true },
    name: { type: String, ref: 'user', required: true },
    username: { type: String, ref: 'user', required: true },
    email: { type: String, ref: 'user', required: true },
    orderId: { type: String, required: true },
    files: { type: [fileSchema], required: false },
    title: { type: String, required: true },
    dueDate: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
    },
    pricePerImage: { type: Number, required: true },
    metadata: { type: String },
    flatness: { type: String },
    outputFormat: { type: String, required: true },
    backgroundOption: { type: String, required: true },
    description: { type: String },
    addOns: { type: [addOnSchema] },
    deliveryTime: {
        type: String,
        enum: ['12-hours', '24-hours', '48-hours'],
        required: true,
    },
    paymentTerms: {
        type: String,
        enum: ['pay-now', 'pay-later'],
        required: true,
    },
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
    estimatedTotal: { type: String, required: true },
});

const orderModel = models?.Order || model('Order', orderSchema);
export default orderModel;
