import { NotificationRepository } from "../repositories/notification-repository";
import { Notification } from "../../enterprise/notification";

interface GetNotificationsByRecipientUseCaseRequest {
  recipientId: string;
}

interface GetNotificationsByRecipientUseCaseResponse {
  notifications: Notification[];
}

export class GetNotificationsByRecipientUseCase {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}
  async execute({
    recipientId,
  }: GetNotificationsByRecipientUseCaseRequest): Promise<GetNotificationsByRecipientUseCaseResponse> {
    const notifications = await this.notificationRepository.findManyByRecipient(
      recipientId
    );

    return { notifications };
  }
}
