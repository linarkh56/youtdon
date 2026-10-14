export type Provider='donationalerts'|'donatepay'|'mock'; export type OrderStatus='pending'|'validating'|'queued'|'playing'|'completed'|'rejected'|'interrupted'|'refunded';
export type DonationEvent={provider:Provider;providerDonationId:string;amountKopecks:number;currency:string;message:string;receivedAt:string;test:boolean};
export type Order=DonationEvent&{id:string;videoId:string;seconds:number;status:OrderStatus;createdAt:string;startedAt?:string;completedAt?:string;reason?:string};
