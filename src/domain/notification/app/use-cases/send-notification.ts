import { Notification } from "../../enterprise/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface SendNotificationRequest {
  message: string;
  recipientId: string;
  senderId: string;
  readAt: Date | null;
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
  }: SendNotificationRequest): Promise<void> {
    const notification = Notification.create({
      message,
      recipientId,
      readAt,
      senderId,
    });
    await this.notificationRepository.create(notification);
  }
}
