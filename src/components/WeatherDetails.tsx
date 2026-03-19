import type { WeatherData } from '@/api/type'
import { format } from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface weatherDataProps {
    data: WeatherData
}

export default function WeatherDetails({ data }: weatherDataProps) {
    const { main, wind, sys } = data

    const formatTime = (time: number) => {
        return format(new Date(time * 1000), "h:mm a")
    }
    const getWindDirection = (degree: number) => {
        const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return direction[index]
    }
    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500",
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500",
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: "text-green-500",
        },
        {
            title: "Pressure",
            value: `${main.pressure} hpa`,
            icon: Gauge,
            color: "text-purple-500",
        }
    ]
    return <>
        <Card className='sm:h-70'>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>

            <CardContent>
                <div className='grid gap-6 sm:grid-cols-2'>
                    {
                        details.map((detail) => {
                            return(
                                <div key={detail.title} className='flex gap-3 items-center rounded-lg border p-4 sm:w-60'>
                                    <detail.icon className={`${detail.color} h-5 w-5`}/>
                                    <div >
                                        <h1 className='text-sm font-medium leading-none'>{detail.title}</h1>
                                        <p className='text-muted-foreground text-sm'>{detail.value}</p> 
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </CardContent>
        </Card>







    </>
}
