import { Blogger } from "@/domain/blog/enterprise/entities/blogger";

export class BloggerPresenter {
  static toHTTP(blogger: Blogger) {
    return {
      id: blogger.id,
      email: blogger.email,
      name: blogger.name,
      role: blogger.role,
    };
  }
}
