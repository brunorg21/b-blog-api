import { Notification } from "../../enterprise/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface SendNotificationRequest {
  message: string;
  recipientId: string;
  senderId: string;
  readAt: Date | null;
}
interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute({
    message,
    recipientId,
    senderId,
    readAt,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      message,
      recipientId,
      readAt,
      senderId,
    });
    await this.notificationRepository.create(notification);

    return { notification };
  }
}
