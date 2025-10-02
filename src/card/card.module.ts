import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Card } from "./models/card.model";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { GuardsModule } from "../guards/guards.module";
import { RecipientModule } from "../recipient/recipient.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Card]),
    GuardsModule,
    RecipientModule,
    AdminModule,
  ],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}
