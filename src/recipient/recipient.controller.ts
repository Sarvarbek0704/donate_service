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
import { RecipientService } from "./recipient.service";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { UpdateRecipientDto } from "./dto/update-recipient.dto";
import { LoginRecipientDto } from "./dto/login-recipient.dto";
import { RecipientAuthGuard } from "../guards/recipient-auth.guard";
import { AdminAuthGuard } from "../guards/admin-auth.guard";

@Controller("recipient")
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post("register")
  create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientService.create(createRecipientDto);
  }

  @Post("login")
  login(@Body() loginRecipientDto: LoginRecipientDto) {
    return this.recipientService.login(loginRecipientDto);
  }

  @Post("logout/:id")
  @UseGuards(RecipientAuthGuard)
  logout(@Param("id") id: string) {
    return this.recipientService.logout(+id);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.recipientService.findAll();
  }

  @Get(":id")
  @UseGuards(RecipientAuthGuard)
  findOne(@Param("id") id: string) {
    return this.recipientService.findById(+id);
  }

  @Patch(":id")
  @UseGuards(RecipientAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateRecipientDto: UpdateRecipientDto
  ) {
    return this.recipientService.update(+id, updateRecipientDto);
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  remove(@Param("id") id: string) {
    return this.recipientService.remove(+id);
  }
}
