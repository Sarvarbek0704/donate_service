import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Recipient } from "./models/recipient.model";
import { RecipientService } from "./recipient.service";
import { RecipientController } from "./recipient.controller";
import { AuthModule } from "../auth/auth.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Recipient]),
    AuthModule,
    JwtModule,
    AdminModule,
    RecipientModule,
  ],
  providers: [RecipientService],
  controllers: [RecipientController],
  exports: [RecipientService],
})
export class RecipientModule {}
