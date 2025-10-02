import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Recipient } from "../../recipient/models/recipient.model";

@Table({
  tableName: "cards",
  timestamps: true,
})
export class Card extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "card_type",
  })
  declare card_type: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "card_number",
  })
  declare card_number: number;

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
    field: "expiry_date",
  })
  declare expiry_date: string;

  @BelongsTo(() => Recipient)
  declare recipient: Recipient;
}
