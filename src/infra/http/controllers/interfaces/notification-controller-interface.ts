import { Notification } from "@/domain/notification/enterprise/notification";

export interface GetNotificationsByRecipientProps {
  recipientId: string;
}

export interface NotificationControllerInterface {
  getNotificationsByRecipient(
    data: GetNotificationsByRecipientProps
  ): Promise<Notification[]>;

  delete(id: string): Promise<void>;
}
