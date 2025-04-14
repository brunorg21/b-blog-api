import { ResourceNotFoundError } from "@/domain/blog/app/use-cases/@errors/resource-not-found-error";
import { NotificationRepository } from "../repositories/notification-repository";

interface DeleteNotificationUseCaseRequest {
  id: string;
}

export class DeleteNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute({ id }: DeleteNotificationUseCaseRequest): Promise<void> {
    const notification = await this.notificationRepository.getById(id);

    if (!notification) {
      throw new ResourceNotFoundError();
    }

    await this.notificationRepository.delete(notification);
  }
}
