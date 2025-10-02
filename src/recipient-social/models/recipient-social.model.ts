import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";
import { SocialMedia } from "../../social-media/models/social-media.model";

@Table({
  tableName: "recipient_social",
  timestamps: true,
})
export class RecipientSocial extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => SocialMedia)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "socialid",
  })
  declare socialid: number;

  @ForeignKey(() => Recipient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "recipientId",
  })
  declare recipientId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "social_url",
  })
  declare social_url: string;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;

  @BelongsTo(() => SocialMedia)
  declare socialMedia: SocialMedia;
}
