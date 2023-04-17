export interface Notificationobjects {
    id: string;
    recipientId: string;
    content: string;
    category: string;
    readAt: Date | null;
    createdAt: Date;
}