import { Blogger } from "@/domain/blog/enterprise/entities/blogger";

export interface AuthenticateRequestProps {
  email: string;
  password: string;
}

export interface BloggerControllerInterface {
  authenticate(data: AuthenticateRequestProps): Promise<Blogger>;
}
