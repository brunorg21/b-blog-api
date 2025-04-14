import { GetNotificationsByRecipientUseCase } from "@/domain/notification/app/use-cases/get-notifications-by-recipient";
import { NotificationRepository } from "@/domain/notification/app/repositories/notification-repository";
import {
  GetNotificationsByRecipientProps,
  NotificationControllerInterface,
} from "./interfaces/notification-controller-interface";
import { Notification } from "@/domain/notification/enterprise/notification";
import { DeleteNotificationUseCase } from "@/domain/notification/app/use-cases/delete-notification-use-case";

export class NotificationController implements NotificationControllerInterface {
  private readonly getNotificationsByRecipientUseCase: GetNotificationsByRecipientUseCase;
  private readonly deleteNotificationUseCase: DeleteNotificationUseCase;

  constructor(notificationRepository: NotificationRepository) {
    this.getNotificationsByRecipientUseCase =
      new GetNotificationsByRecipientUseCase(notificationRepository);

    this.deleteNotificationUseCase = new DeleteNotificationUseCase(
      notificationRepository
    );
  }
  async delete(id: string): Promise<void> {
    await this.deleteNotificationUseCase.execute({ id });
  }
  async getNotificationsByRecipient(
    data: GetNotificationsByRecipientProps
  ): Promise<Notification[]> {
    const { notifications } =
      await this.getNotificationsByRecipientUseCase.execute(data);

    return notifications;
  }
}
