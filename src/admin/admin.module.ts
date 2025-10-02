import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { AuthModule } from "../auth/auth.module";
import { GuardsModule } from "../guards/guards.module";

@Module({
  imports: [SequelizeModule.forFeature([Admin]), AuthModule, GuardsModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
