import { appDataSource } from "..";
import { Repository } from "typeorm";
import { NotificationEntity } from "../schemas/notification";

import { NotificationRepository } from "@/domain/notification/app/repositories/notification-repository";
import { Notification } from "@/domain/notification/enterprise/notification";
import { ToTypeormNotificationMapper } from "../mappers/toTypeormNotificationMapper";

export class TypeormNotificationRepository implements NotificationRepository {
  private typeormNotificationRepository: Repository<NotificationEntity>;

  constructor() {
    this.typeormNotificationRepository =
      appDataSource.getRepository(NotificationEntity);
  }

  async save(notification: Notification): Promise<void> {
    const typeormNotification =
      ToTypeormNotificationMapper.toNotificationEntity(notification);

    this.typeormNotificationRepository.create(typeormNotification);
  }
  async getById(id: string): Promise<Notification | null> {
    const notification = await this.typeormNotificationRepository.findOneBy({
      id,
    });

    if (!notification) {
      return null;
    }

    return ToTypeormNotificationMapper.toDomain(notification);
  }

  async update(notification: Notification): Promise<void> {
    await this.typeormNotificationRepository.save(notification);
  }

  async delete(notification: Notification): Promise<void> {
    await this.typeormNotificationRepository.remove(notification);
  }
}
