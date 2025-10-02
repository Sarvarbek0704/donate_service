import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { AdminAuthGuard } from "../guards/admin-auth.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("register")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post("login")
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.login(loginAdminDto);
  }

  @Post("logout/:id")
  @UseGuards(AdminAuthGuard)
  logout(@Param("id") id: string) {
    return this.adminService.logout(+id);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @UseGuards(AdminAuthGuard)
  findOne(@Param("id") id: string) {
    return this.adminService.findById(+id);
  }

  @Patch(":id")
  @UseGuards(AdminAuthGuard)
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
