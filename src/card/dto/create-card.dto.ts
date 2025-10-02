export class CreateCardDto {
  readonly card_type: string;
  readonly card_number: number;
  readonly recipientId: number;
  readonly expiry_date: string;
}
