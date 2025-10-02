export class CreateAdminDto {
  readonly full_name: string;
  readonly email: string;
  readonly password: string;
  readonly is_creator?: boolean;
  readonly is_active?: boolean;
}
