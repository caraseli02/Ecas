export interface DashboardNotification {
    type: 'others' | 'new' | 'removed' | 'completed' | 'pending' | 'processing';
    message: string;
    date: string;
    read: boolean;
}

export interface Notifications extends Array<Notification>{}

export interface Notification  {
    id: string;
    title: string;
    description: string;
    seen: boolean;
    details: NotificationDetailsInterface;
    date : string;
}

export interface NotificationDetailsInterface {
    entityId? : string,
    entityName? : string,
    _id? : string
}


export enum NotificationsType { 
    PasswordChange =  "Password change",
    PasswordReset = "Reset password",
    News = "News",
    Other = "Others",
    Removed = "Removed",
    Complete = "Completed",
    Pending = "Pending",
}