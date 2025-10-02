import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RecipientSocial } from "./models/recipient-social.model";
import { CreateRecipientSocialDto } from "./dto/create-recipient-social.dto";
import { UpdateRecipientSocialDto } from "./dto/update-recipient-social.dto";

@Injectable()
export class RecipientSocialService {
  constructor(
    @InjectModel(RecipientSocial)
    private recipientSocialModel: typeof RecipientSocial
  ) {}

  async create(
    createRecipientSocialDto: CreateRecipientSocialDto
  ): Promise<RecipientSocial> {
    return await this.recipientSocialModel.create(
      createRecipientSocialDto as any
    );
  }

  async findAll(): Promise<RecipientSocial[]> {
    return await this.recipientSocialModel.findAll();
  }

  async findByRecipient(recipientId: number): Promise<RecipientSocial[]> {
    return await this.recipientSocialModel.findAll({
      where: { recipientId },
    });
  }

  async findOne(id: number): Promise<RecipientSocial> {
    const recipientSocial = await this.recipientSocialModel.findByPk(id);

    if (!recipientSocial) {
      throw new NotFoundException("Recipient social not found");
    }

    return recipientSocial;
  }

  async update(
    id: number,
    updateRecipientSocialDto: UpdateRecipientSocialDto
  ): Promise<RecipientSocial> {
    const recipientSocial = await this.findOne(id);
    await recipientSocial.update(updateRecipientSocialDto as any);
    return recipientSocial;
  }

  async remove(id: number): Promise<void> {
    const recipientSocial = await this.findOne(id);
    await recipientSocial.destroy();
  }
}
