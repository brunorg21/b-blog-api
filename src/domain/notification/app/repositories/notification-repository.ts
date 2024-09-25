import { Notification } from "../../enterprise/notification";

export interface NotificationRepository {
  create(notification: Notification): Promise<void>;
  save(notification: Notification): Promise<void>;
  getById(notificationId: string): Promise<Notification | null>;
}
