import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { RecipientSocial } from "../../recipient-social/models/recipient-social.model";

@Table({
  tableName: "social_media",
  timestamps: true,
})
export class SocialMedia extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "social_media",
  })
  declare social_media: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "iconic_url",
  })
  declare iconic_url: string;

  @HasMany(() => RecipientSocial)
  declare recipientSocials: RecipientSocial[];
}
