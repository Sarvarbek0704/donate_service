import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Card } from "../../card/models/card.model";
import { RecipientSocial } from "../../recipient-social/models/recipient-social.model";

@Table({
  tableName: "recipient",
  timestamps: true,
})
export class Recipient extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "full_name",
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare token: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @HasMany(() => Card)
  declare cards: Card[];

  @HasMany(() => RecipientSocial)
  declare socials: RecipientSocial[];
}
