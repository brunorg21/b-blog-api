import { Blogger } from "@/domain/blog/enterprise/entities/blogger";
import { BloggerEntity } from "../schemas/blogger";

export class ToTypeormBloggerMapper {
  static toBloggerEntity(blogger: Blogger): BloggerEntity {
    return {
      id: blogger.id,
      name: blogger.name,
      email: blogger.email,
      password: blogger.password,
      createdAt: blogger.createdAt,
      updatedAt: blogger.updatedAt,
      avatarUrl: blogger.avatarUrl,
      role: blogger.role,
    };
  }

  static toDomain(bloggerEntity: BloggerEntity): Blogger {
    return Blogger.create(
      {
        avatarUrl: bloggerEntity.avatarUrl,
        email: bloggerEntity.email,
        name: bloggerEntity.name,
        password: bloggerEntity.password,
        role: bloggerEntity.role as "ADMIN" | "COMMON",
      },
      bloggerEntity.id
    );
  }
}
