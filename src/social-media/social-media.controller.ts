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
import { SocialMediaService } from "./social-media.service";
import { CreateSocialMediaDto } from "./dto/create-social-media.dto";
import { UpdateSocialMediaDto } from "./dto/update-social-media.dto";
import { AdminAuthGuard } from "../auth/admin-auth.guard";

@Controller("social-media")
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Get(":id")
  @UseGuards(AdminAuthGuard)
  findOne(@Param("id") id: string) {
    return this.socialMediaService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AdminAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateSocialMediaDto: UpdateSocialMediaDto
  ) {
    return this.socialMediaService.update(+id, updateSocialMediaDto);
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  remove(@Param("id") id: string) {
    return this.socialMediaService.remove(+id);
  }
}
