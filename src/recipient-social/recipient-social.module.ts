import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RecipientSocial } from "./models/recipient-social.model";
import { RecipientSocialService } from "./recipient-social.service";
import { RecipientSocialController } from "./recipient-social.controller";
import { GuardsModule } from "../guards/guards.module";
import { RecipientModule } from "../recipient/recipient.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    SequelizeModule.forFeature([RecipientSocial]),
    GuardsModule,
    RecipientModule,
    AdminModule,
  ],
  providers: [RecipientSocialService],
  controllers: [RecipientSocialController],
})
export class RecipientSocialModule {}
