export interface iPrompt {
    checklist: string | null; // FK.checklist
    createdOn: string; // date
    criticality: 'severe' | 'default' | 'reminder' | 'reference';
    date: string;
    deferPeriod: 'day' | 'month' | 'year';
    deferQuantity: number;
    deferredCount: number; // number (default: 0)
    deleted: boolean; // boolean
    deletedOn: string | null; // date
    description: string | null; // str(2000)
    links: string[]; // [] FK.links
    promptId: string;// uuid
    status: 'open' | 'resolved' | 'archived' | 'deleted';
    title: string;
    updatedOn: string | null; // date
    userId: string,
}

// checklist (one to one prompt)

// checklist item (many to one checklist)

// links (many to one)