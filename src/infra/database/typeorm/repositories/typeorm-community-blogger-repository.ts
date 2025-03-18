import { CommunityBloggerRepository } from "@/domain/blog/app/repositories/community-blogger-repository";
import { CommunityBlogger } from "@/domain/blog/enterprise/entities/community-blogger";
import { Repository } from "typeorm";
import { CommunityBloggerEntity } from "../schemas/community-blogger";
import { ToTypeormCommunityBloggerMapper } from "../mappers/toTypeormCommunityBloggerMapper";
import { appDataSource } from "..";

export class TypeormCommunityBloggerRepository
  implements CommunityBloggerRepository
{
  private typeormCommunityBloggerRepository: Repository<CommunityBloggerEntity>;

  constructor() {
    this.typeormCommunityBloggerRepository = appDataSource.getRepository(
      CommunityBloggerEntity
    );
  }

  async save(communityBlogger: CommunityBlogger): Promise<void> {
    const communityBloggerEntity =
      ToTypeormCommunityBloggerMapper.toCommunityBloggerEntity(
        communityBlogger
      );

    this.typeormCommunityBloggerRepository.save(communityBloggerEntity);
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
