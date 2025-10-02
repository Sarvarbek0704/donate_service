import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SocialMedia } from "./models/social-media.model";
import { CreateSocialMediaDto } from "./dto/create-social-media.dto";
import { UpdateSocialMediaDto } from "./dto/update-social-media.dto";

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectModel(SocialMedia)
    private socialMediaModel: typeof SocialMedia
  ) {}

  async create(
    createSocialMediaDto: CreateSocialMediaDto
  ): Promise<SocialMedia> {
    return await this.socialMediaModel.create(createSocialMediaDto as any);
  }

  async findAll(): Promise<SocialMedia[]> {
    return await this.socialMediaModel.findAll();
  }

  async findOne(id: number): Promise<SocialMedia> {
    const socialMedia = await this.socialMediaModel.findByPk(id);

    if (!socialMedia) {
      throw new NotFoundException("Social media not found");
    }

    return socialMedia;
  }

  async update(
    id: number,
    updateSocialMediaDto: UpdateSocialMediaDto
  ): Promise<SocialMedia> {
    const socialMedia = await this.findOne(id);
    await socialMedia.update(updateSocialMediaDto as any);
    return socialMedia;
  }

  async remove(id: number): Promise<void> {
    const socialMedia = await this.findOne(id);
    await socialMedia.destroy();
  }
}
