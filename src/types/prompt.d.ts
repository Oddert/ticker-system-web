export interface iPrompt {
    date: string;
    title: string;
    defaultDeferQuantity: number;
    defaultDeferPeriod: 'day' | 'month' | 'year';
}
