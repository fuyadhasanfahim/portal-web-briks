export default function getCalculateAdditionalCost(format: string): number {
    if (format === 'PSD' || format === 'TIFF') {
        return 0.1;
    }
    return 0;
}
