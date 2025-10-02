import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Card } from "./models/card.model";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card)
    private cardModel: typeof Card
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardModel.create(createCardDto as any);
  }

  async findAll(): Promise<Card[]> {
    return await this.cardModel.findAll();
  }

  async findByRecipient(recipientId: number): Promise<Card[]> {
    return await this.cardModel.findAll({
      where: { recipientId },
    });
  }

  async findOne(id: number): Promise<Card> {
    const card = await this.cardModel.findByPk(id);

    if (!card) {
      throw new NotFoundException("Card not found");
    }

    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.findOne(id);
    await card.update(updateCardDto as any);
    return card;
  }

  async remove(id: number): Promise<void> {
    const card = await this.findOne(id);
    await card.destroy();
  }
}
