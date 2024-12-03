export default function getCalculateAdditionalCost(format: string): number {
    return format === 'PDF' || format === 'TIFF' ? 0.1 : 0;
}
