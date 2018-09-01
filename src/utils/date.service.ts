import { Injectable } from '@nestjs/common';

import * as moment from 'moment-timezone';
import { ConfigService } from '../config/config.service';

@Injectable()
export class DateService {

    private timezone: string;

    constructor(private readonly configService: ConfigService) {
        this.timezone = this.configService.get('TIMEZONE');
    }

    getNowString() {
        return moment.tz(new Date().toISOString(), this.timezone).format();
    }

}
