import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [FileModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
