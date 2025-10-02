import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { GuardsModule } from "./guards/guards.module";
import { AdminModule } from "./admin/admin.module";
import { RecipientModule } from "./recipient/recipient.module";
import { CardModule } from "./card/card.module";
import { SocialMediaModule } from "./social-media/social-media.module";
import { RecipientSocialModule } from "./recipient-social/recipient-social.module";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: "your-super-secret-key-12345-change-in-production",
      signOptions: { expiresIn: "24h" },
    }),
    AuthModule,
    GuardsModule,
    AdminModule,
    RecipientModule,
    CardModule,
    SocialMediaModule,
    RecipientSocialModule,
  ],
})
export class AppModule {}
