import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Recipient } from "./models/recipient.model";
import { RecipientService } from "./recipient.service";
import { RecipientController } from "./recipient.controller";
import { AuthModule } from "../auth/auth.module";
import { GuardsModule } from "../guards/guards.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Recipient]),
    AuthModule,
    GuardsModule,
    AdminModule,
  ],
  providers: [RecipientService],
  controllers: [RecipientController],
  exports: [RecipientService],
})
export class RecipientModule {}
