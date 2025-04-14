import { Notification } from "../../enterprise/notification";

export interface NotificationRepository {
  update(notification: Notification): Promise<void>;
  save(notification: Notification): Promise<void>;
  getById(notificationId: string): Promise<Notification | null>;
  delete(notification: Notification): Promise<void>;
  findManyByRecipient(recipientId: string): Promise<Notification[]>;
}
