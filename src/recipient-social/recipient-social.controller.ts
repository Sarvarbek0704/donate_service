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
import { RecipientSocialService } from "./recipient-social.service";
import { CreateRecipientSocialDto } from "./dto/create-recipient-social.dto";
import { UpdateRecipientSocialDto } from "./dto/update-recipient-social.dto";
import { RecipientAuthGuard } from "../auth/recipient-auth.guard";
import { AdminAuthGuard } from "../auth/admin-auth.guard";

@Controller("recipient-social")
export class RecipientSocialController {
  constructor(
    private readonly recipientSocialService: RecipientSocialService
  ) {}

  @Post()
  @UseGuards(RecipientAuthGuard)
  create(@Body() createRecipientSocialDto: CreateRecipientSocialDto) {
    return this.recipientSocialService.create(createRecipientSocialDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.recipientSocialService.findAll();
  }

  @Get("recipient/:recipientId")
  @UseGuards(RecipientAuthGuard)
  findByRecipient(@Param("recipientId") recipientId: string) {
    return this.recipientSocialService.findByRecipient(+recipientId);
  }

  @Get(":id")
  @UseGuards(RecipientAuthGuard)
  findOne(@Param("id") id: string) {
    return this.recipientSocialService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(RecipientAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateRecipientSocialDto: UpdateRecipientSocialDto
  ) {
    return this.recipientSocialService.update(+id, updateRecipientSocialDto);
  }

  @Delete(":id")
  @UseGuards(RecipientAuthGuard)
  remove(@Param("id") id: string) {
    return this.recipientSocialService.remove(+id);
  }
}
