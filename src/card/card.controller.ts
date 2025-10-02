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
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { RecipientAuthGuard } from "../guards/recipient-auth.guard";
import { AdminAuthGuard } from "../guards/admin-auth.guard";

@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(RecipientAuthGuard)
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.cardService.findAll();
  }

  @Get("recipient/:recipientId")
  @UseGuards(RecipientAuthGuard)
  findByRecipient(@Param("recipientId") recipientId: string) {
    return this.cardService.findByRecipient(+recipientId);
  }

  @Get(":id")
  @UseGuards(RecipientAuthGuard)
  findOne(@Param("id") id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(RecipientAuthGuard)
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(":id")
  @UseGuards(RecipientAuthGuard)
  remove(@Param("id") id: string) {
    return this.cardService.remove(+id);
  }
}
