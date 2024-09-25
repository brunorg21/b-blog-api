import { randomUUID } from "node:crypto";

interface NotificationProps {
  message: string;
  senderId: string;
  recipientId: string;
  createdAt: Date;
  readAt: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get message() {
    return this.props.message;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get readAt() {
    return this.props.readAt;
  }

  get senderId() {
    return this.props.senderId;
  }
  get recipientId() {
    return this.props.recipientId;
  }

  set readAt(readAt: Date | null) {
    this.props.readAt = readAt;
  }

  static create(props: Omit<NotificationProps, "createdAt">, id?: string) {
    const notification = new Notification(
      {
        createdAt: new Date(),
        senderId: props.senderId,
        message: props.message,
        readAt: props.readAt,
        recipientId: props.recipientId,
      },
      id
    );

    return notification;
  }
}
