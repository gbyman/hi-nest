import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';


@Controller()
export class AppController {
    @Get()
    home(){
        return "Welcom to my Movie API";
    }
}
