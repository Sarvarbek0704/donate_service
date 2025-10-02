import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminAuthGuard } from "./admin-auth.guard";
import { RecipientAuthGuard } from "./recipient-auth.guard";
import { AdminService } from "../admin/admin.service";
import { RecipientService } from "../recipient/recipient.service";
import { Admin } from "../admin/models/admin.model";
import { Recipient } from "../recipient/models/recipient.model";
import { AuthService } from "../auth/auth.service";

@Module({
  imports: [JwtModule, SequelizeModule.forFeature([Admin, Recipient])],
  providers: [
    AdminAuthGuard,
    RecipientAuthGuard,
    AdminService,
    RecipientService,
    AuthService,
  ],
  exports: [AdminAuthGuard, RecipientAuthGuard],
})
export class GuardsModule {}
