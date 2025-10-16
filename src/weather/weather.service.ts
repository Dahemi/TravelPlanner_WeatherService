import { Injectable } from '@nestjs/common';
import {Logger} from '@nestjs/common';

@Injectable()
export class WeatherService {

      private readonly logger = new Logger(WeatherService.name);

    private weatherData = {
        BKK:[
            { date: '2025-12-10',minTemp:25,maxTemp:31,condition:'Sunny' },
            { date: '2025-12-11',minTemp:24,maxTemp:30,condition:'Partly Cloudy' },
            { date: '2025-12-12',minTemp:23,maxTemp:29,condition:'Rainy' },
            { date: '2025-12-13',minTemp:24,maxTemp:30,condition:'Sunny' },
            { date: '2025-12-14',minTemp:25,maxTemp:31,condition:'Sunny' },
            { date: '2025-12-15',minTemp:24,maxTemp:30,condition:'Partly Cloudy' },
            { date: '2025-12-16',minTemp:23,maxTemp:29,condition:'Rainy' }
        ],
        CMB:[
            { date: '2025-12-10',minTemp:26,maxTemp:32,condition:'Sunny' },
            { date: '2025-12-11',minTemp:25,maxTemp:31,condition:'Partly Cloudy' },
            { date: '2025-12-12',minTemp:24,maxTemp:30,condition:'Rainy' },
            { date: '2025-12-13',minTemp:25,maxTemp:31,condition:'Sunny' },
        ]
    }


    async getWeather(city:string){
    const delayMS = process.env.WEATHER_DELAY_MS;
    const failRate = process.env.WEATHER_FAIL_RATE;

    this.logger.log(`[Weather] Configured: delay=${delayMS}ms, failRate=${failRate}`);

    await new Promise((res) => setTimeout(res,Number(delayMS)));

    if(Math.random() < Number(failRate)){
        this.logger.log('[Weather] Simulating failure!');
        throw new Error('Weather service simulated failure');
    }

    return { weather: this.weatherData[city] ?? []};
}
}
