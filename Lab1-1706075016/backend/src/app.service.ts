import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'Hello world!';
  }

  getSum(a: number, b: number): { a: number; b: number; hasil: number } {
    const hasil = a + b;
    return { a, b, hasil };
  }
}
