import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "./models/admin.model";
import { AuthService } from "../auth/auth.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin,
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminModel.findOne({
      where: { email: createAdminDto.email },
    });
    if (existingAdmin) {
      throw new ConflictException("Admin with this email already exists");
    }

    const hashedPassword = await this.authService.hashPassword(
      createAdminDto.password
    );

    return await this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    } as any);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminModel.findAll();
  }

  async findById(id: number): Promise<Admin> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException("Admin not found");
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findById(id);

    const updateData: any = { ...updateAdminDto };

    if (updateAdminDto.password) {
      updateData.password = await this.authService.hashPassword(
        updateAdminDto.password
      );
    }

    await admin.update(updateData);
    return admin;
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findById(id);
    await admin.destroy();
  }

  async login(
    loginAdminDto: LoginAdminDto
  ): Promise<{ admin: Admin; token: string }> {
    const admin = await this.adminModel.findOne({
      where: { email: loginAdminDto.email },
    });

    if (
      !admin ||
      !(await this.authService.comparePasswords(
        loginAdminDto.password,
        admin.password
      ))
    ) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!admin.is_active) {
      throw new UnauthorizedException("Admin account is not active");
    }

    const token = this.jwtService.sign({
      sub: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    });

    await admin.update({ token } as any);
    return { admin, token };
  }

  async logout(id: number): Promise<void> {
    const admin = await this.findById(id);
    await admin.update({ token: null } as any);
  }
}
