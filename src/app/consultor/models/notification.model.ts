export interface Notificationobjects {
    senderId: string;
    offerId:string;
    recipientId: string;
    content: string;
    category: string;
    readAt: Date | null;
    createdAt: Date;
}