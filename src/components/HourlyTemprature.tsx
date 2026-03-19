import type { ForecastData } from '@/api/type'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from "date-fns"
interface HourlyTempratureProps {
    data: ForecastData,
}

export default function HourlyTemprature({ data }: HourlyTempratureProps) {

    const chartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like)
    }))

    return <>
        <Card className='flex-1'>
            <CardHeader>
                <CardTitle>Today's Tempertature</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='h-50 w-full'>
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                        <LineChart responsive data={chartData}>
                            <XAxis dataKey={"time"} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis dataKey={"temp"} stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}°`} />

                            <Tooltip content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (<div className='rounded-lg border bg-background p-2 shadow-sm'>
                                        <div className='grid grid-cols-2 gap-2'>
                                            <div  className='flex flex-col'>
                                                <span className='text-[0.70rem] uppercase text-muted-foreground'>Temprature</span>
                                                <span className='font-bold'>{payload[0].value}°</span>
                                            </div>

                                            <div className='flex flex-col'>
                                                <span className='text-[0.70rem] uppercase text-muted-foreground'>Feels_Like</span>
                                                <span className='font-bold'>{payload[1].value}°</span>
                                            </div>
                                        </div>
                                    </div>)
                                }
                                return null
                            }} />
                            <Line dataKey="temp" type={"monotone"} stroke='#2563eb' strokeWidth={2} dot={false} />
                            <Line dataKey="feels_like" type={"monotone"} stroke='#2563eb' strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>

        </Card>
    </>
}
