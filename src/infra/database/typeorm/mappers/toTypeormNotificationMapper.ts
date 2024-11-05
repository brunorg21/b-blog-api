import { Notification } from "@/domain/notification/enterprise/notification";
import { NotificationEntity } from "../schemas/notification";

export class ToTypeormNotificationMapper {
  static toNotificationEntity(notification: Notification): NotificationEntity {
    return {
      id: notification.id,
      createdAt: notification.createdAt,
      message: notification.message,
      readAt: notification.readAt,
      recipientId: notification.recipientId,
      senderId: notification.senderId,
    };
  }

  static toDomain(notificationEntity: NotificationEntity): Notification {
    return Notification.create(
      {
        message: notificationEntity.message,
        readAt: notificationEntity.readAt,
        recipientId: notificationEntity.recipientId,
        senderId: notificationEntity.senderId,
      },
      notificationEntity.id
    );
  }
}
