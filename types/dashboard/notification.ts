export interface DashboardNotification {
  type: "others" | "new" | "removed" | "completed" | "pending" | "processing";
  message: string;
  date: string;
  read: boolean;
}
