import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "../admin/models/admin.model";
import { Recipient } from "../recipient/models/recipient.model";
import { Card } from "../card/models/card.model";
import { SocialMedia } from "../social-media/models/social-media.model";
import { RecipientSocial } from "../recipient-social/models/recipient-social.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "donate_system",
      models: [Admin, Recipient, Card, SocialMedia, RecipientSocial],
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
