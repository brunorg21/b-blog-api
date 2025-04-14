import { Notification } from "@/domain/notification/enterprise/notification";

export class NotificationPresenter {
  static toWS(notification: Notification) {
    return {
      id: notification.id,
      message: notification.message,
      readtAt: notification.readAt,
      recipientId: notification.recipientId,
      senderId: notification.senderId,
      createdAt: notification.createdAt,
    };
  }
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      message: notification.message,
      readtAt: notification.readAt,
      recipientId: notification.recipientId,
      senderId: notification.senderId,
      createdAt: notification.createdAt,
    };
  }
}
