import { CommunityBloggerRepository } from "@/domain/blog/app/repositories/community-blogger-repository";
import { CommunityBlogger } from "@/domain/blog/enterprise/entities/community-blogger";
import { Repository } from "typeorm";
import { CommunityBloggerEntity } from "../schemas/community-blogger";
import { ToTypeormCommunityBloggerMapper } from "../mappers/toTypeormCommunityBloggerMapper";

export class TypeormCommunityBloggerRepository
  implements CommunityBloggerRepository
{
  private typeormCommunityBloggerRepository: Repository<CommunityBloggerEntity>;

  async save(communityBlogger: CommunityBlogger): Promise<void> {
    this.typeormCommunityBloggerRepository.create(communityBlogger);
  }
  async getAllByBloggerId(bloggerId: string): Promise<CommunityBlogger[]> {
    const communityBloggers = await this.typeormCommunityBloggerRepository.find(
      {
        where: {
          bloggerId,
        },
      }
    );

    return communityBloggers.map((communityBlogger) =>
      ToTypeormCommunityBloggerMapper.toDomain(communityBlogger)
    );
  }
}
