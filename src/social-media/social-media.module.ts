import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { SocialMedia } from "./models/social-media.model";
import { SocialMediaService } from "./social-media.service";
import { SocialMediaController } from "./social-media.controller";
import { GuardsModule } from "../guards/guards.module";
import { AdminModule } from "../admin/admin.module";
import { RecipientModule } from "../recipient/recipient.module";

@Module({
  imports: [
    SequelizeModule.forFeature([SocialMedia]),
    GuardsModule,
    JwtModule,
    AdminModule,
    RecipientModule,
  ],
  providers: [SocialMediaService],
  controllers: [SocialMediaController],
})
export class SocialMediaModule {}
