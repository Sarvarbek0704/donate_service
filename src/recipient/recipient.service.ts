import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import { Recipient } from "./models/recipient.model";
import { AuthService } from "../auth/auth.service";
import { CreateRecipientDto } from "./dto/create-recipient.dto";
import { UpdateRecipientDto } from "./dto/update-recipient.dto";
import { LoginRecipientDto } from "./dto/login-recipient.dto";

@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient)
    private recipientModel: typeof Recipient,
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  async create(createRecipientDto: CreateRecipientDto): Promise<Recipient> {
    const existingRecipient = await this.recipientModel.findOne({
      where: { email: createRecipientDto.email },
    });

    if (existingRecipient) {
      throw new ConflictException("Recipient with this email already exists");
    }

    const hashedPassword = await this.authService.hashPassword(
      createRecipientDto.password
    );

    return await this.recipientModel.create({
      ...createRecipientDto,
      password: hashedPassword,
    } as any);
  }

  async findAll(): Promise<Recipient[]> {
    return await this.recipientModel.findAll();
  }

  async findById(id: number): Promise<Recipient> {
    const recipient = await this.recipientModel.findByPk(id);

    if (!recipient) {
      throw new NotFoundException("Recipient not found");
    }

    return recipient;
  }

  async update(
    id: number,
    updateRecipientDto: UpdateRecipientDto
  ): Promise<Recipient> {
    const recipient = await this.findById(id);

    const updateData: any = { ...updateRecipientDto };

    if (updateRecipientDto.password) {
      updateData.password = await this.authService.hashPassword(
        updateRecipientDto.password
      );
    }

    await recipient.update(updateData);
    return recipient;
  }

  async remove(id: number): Promise<void> {
    const recipient = await this.findById(id);
    await recipient.destroy();
  }

  async login(
    loginRecipientDto: LoginRecipientDto
  ): Promise<{ recipient: Recipient; token: string }> {
    const recipient = await this.recipientModel.findOne({
      where: { email: loginRecipientDto.email },
    });

    if (
      !recipient ||
      !(await this.authService.comparePasswords(
        loginRecipientDto.password,
        recipient.password
      ))
    ) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.jwtService.sign({
      sub: recipient.id,
      email: recipient.email,
    });

    await recipient.update({ token } as any);
    return { recipient, token };
  }

  async logout(id: number): Promise<void> {
    const recipient = await this.findById(id);
    await recipient.update({ token: null } as any);
  }
}
