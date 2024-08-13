export interface iPrompt {
    date: string;
    title: string;
    defaultDeferQuantity: number;
    defaultDeferPeriod: 'day' | 'month' | 'year';
    id: string;// uuid
    description: string | null; // str(2000)
    checklist: string | null; // FK.checklist
    links: string[]; // [] FK.links
    createdOn: string; // date
    updatedOn: string | null; // date
    deletedOn: string | null; // date
    deleted: boolean; // boolean
    status: 'open' | 'resolved' | 'archived' | 'deleted';
    deferredCount: number; // number (default: 0)
    criticality: 'severe' | 'default' | 'reminder' | 'reference';
}

// checklist (one to one prompt)

// checklist item (many to one checklist)

// links (many to one)