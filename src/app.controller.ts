import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello-world')
  getHello() {
    const a = 'opa';
    a.toLocaleUpperCase();
    return {
      helloWorld: this.appService.getHello(),
    };
  }

  @Post('body')
  @HttpCode(200)
  displayBody(@Body() body: any) {
    return body;
  }
}
