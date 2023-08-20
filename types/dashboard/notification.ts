export interface DashboardNotification {
    type: 'others' | 'new' | 'removed' | 'completed' | 'pending' | 'processing';
    message: string;
    date: string;
    read: boolean;
}

export interface Notifications extends Array<Notification>{}

export interface Notification  {
    _id? : string;
    type : string;
    seenBy : Array<string>;
    details : NotificationDetails;
    createdAt : string;
    updatedAt : string;
}

export interface NotificationDetails {
    entityId? : string,
    entityName? : string,
    _id? : string
}