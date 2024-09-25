import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";
import { NotificationRepository } from "../repositories/notification-repository";

interface ReadNotificationRequest {
  notificationId: string;
}

export class ReadNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute({ notificationId }: ReadNotificationRequest): Promise<void> {
    const notification = await this.notificationRepository.getById(
      notificationId
    );

    if (!notification) {
      throw new ResourceNotFoundError();
    }

    notification.readAt = new Date();

    await this.notificationRepository.save(notification);
  }
}
