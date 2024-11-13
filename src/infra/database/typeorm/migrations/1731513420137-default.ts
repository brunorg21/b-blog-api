import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1731513420137 implements MigrationInterface {
    name = 'Default1731513420137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "authorId" uuid NOT NULL, "likeCount" integer NOT NULL DEFAULT '0', "postId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "slug" text NOT NULL, CONSTRAINT "UQ_97c66ab0029f49fde30517f8199" UNIQUE ("slug"), CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_topics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "postId" uuid NOT NULL, "topicId" uuid NOT NULL, CONSTRAINT "PK_35cd4edaae59b7010eeb8a71a60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "content" character varying(500) NOT NULL, "likeCount" integer NOT NULL DEFAULT '0', "authorId" uuid NOT NULL, "bloggerCommunityId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "senderId" uuid NOT NULL, "recipientId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "readAt" date, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogger" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL DEFAULT 'COMMON', "avatarUrl" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_ce74700c44ec24ace667645c905" UNIQUE ("email"), CONSTRAINT "PK_b1829590b7ce301d88194a1978b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogger_communities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "slug" text NOT NULL, "description" text NOT NULL, "authorId" uuid NOT NULL, "avatarUrl" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_8a61adc61598fa74cb5ffad35af" UNIQUE ("slug"), CONSTRAINT "PK_46acdf6ce66d4e8b8217bf47a7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "community_bloggers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bloggerCommunityId" uuid NOT NULL, "bloggerId" uuid NOT NULL, CONSTRAINT "PK_2ce82613e2911b11d626b6dfbe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "blogger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_topics" ADD CONSTRAINT "FK_582cdf866fe5819a931d2a3fedb" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_topics" ADD CONSTRAINT "FK_fbd7fdafda761da64352a40bb7f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "blogger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_a78f21d08d4acf7fb84e8de5477" FOREIGN KEY ("bloggerCommunityId") REFERENCES "blogger_communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_ddb7981cf939fe620179bfea33a" FOREIGN KEY ("senderId") REFERENCES "blogger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_db873ba9a123711a4bff527ccd5" FOREIGN KEY ("recipientId") REFERENCES "blogger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blogger_communities" ADD CONSTRAINT "FK_5bad045e02b79260118898cdf09" FOREIGN KEY ("authorId") REFERENCES "blogger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "community_bloggers" ADD CONSTRAINT "FK_4a4355d231f6661c2d630a4de20" FOREIGN KEY ("bloggerCommunityId") REFERENCES "blogger_communities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "community_bloggers" ADD CONSTRAINT "FK_c470587fded301f77a435827e4e" FOREIGN KEY ("bloggerId") REFERENCES "blogger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "community_bloggers" DROP CONSTRAINT "FK_c470587fded301f77a435827e4e"`);
        await queryRunner.query(`ALTER TABLE "community_bloggers" DROP CONSTRAINT "FK_4a4355d231f6661c2d630a4de20"`);
        await queryRunner.query(`ALTER TABLE "blogger_communities" DROP CONSTRAINT "FK_5bad045e02b79260118898cdf09"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_db873ba9a123711a4bff527ccd5"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_ddb7981cf939fe620179bfea33a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_a78f21d08d4acf7fb84e8de5477"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
        await queryRunner.query(`ALTER TABLE "post_topics" DROP CONSTRAINT "FK_fbd7fdafda761da64352a40bb7f"`);
        await queryRunner.query(`ALTER TABLE "post_topics" DROP CONSTRAINT "FK_582cdf866fe5819a931d2a3fedb"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`DROP TABLE "community_bloggers"`);
        await queryRunner.query(`DROP TABLE "blogger_communities"`);
        await queryRunner.query(`DROP TABLE "blogger"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "post_topics"`);
        await queryRunner.query(`DROP TABLE "topics"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
