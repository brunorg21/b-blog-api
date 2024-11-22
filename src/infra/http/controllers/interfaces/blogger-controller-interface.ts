import { Blogger } from "@/domain/blog/enterprise/entities/blogger";

export interface AuthenticateRequestProps {
  email: string;
  password: string;
}

export interface UpdateBloggerRequestProps {
  id: string;
  avatarUrl: string | null;
  email: string;
  name: string;
  role: "ADMIN" | "COMMON";
}

export interface BloggerControllerInterface {
  authenticate(data: AuthenticateRequestProps): Promise<Blogger>;
  updateBlogger(data: UpdateBloggerRequestProps): Promise<void>;
}
