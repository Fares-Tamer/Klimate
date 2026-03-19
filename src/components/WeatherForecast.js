import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';
export default function WeatherForecast({ data }) {
    const dailyForecasts = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt
            };
        }
        else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    }, {});
    const nextDays = Object.values(dailyForecasts).slice(0, 6);
    const formatTemp = (temp) => `${Math.round(temp)}°`;
    return _jsx(_Fragment, { children: _jsxs(Card, { className: 'flex-1', children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "5-Day Forecast" }) }), _jsx(CardContent, { children: _jsx("div", { className: 'grid gap-4', children: nextDays.map((day) => {
                            return (_jsxs("div", { className: 'grid grid-cols-2 sm:grid-cols-3 items-center gap-4 rounded-lg border p-4', children: [_jsxs("div", { children: [_jsx("p", { className: 'font-medium', children: format(new Date(day.date * 1000), "EEE,MMM, d") }), _jsx("p", { className: 'text-sm text-muted-foreground capitalize', children: day.weather.description })] }), _jsxs("div", { className: 'flex justify-center gap-4 ', children: [_jsxs("span", { className: 'flex items-center text-blue-500', children: [_jsx(ArrowDown, { className: 'mr-1 h-4 w-4' }), formatTemp(day.temp_min)] }), _jsxs("span", { className: 'flex text-red-500 items-center', children: [_jsx(ArrowUp, { className: 'mr-1 h-4 w-4' }), formatTemp(day.temp_max)] })] }), _jsxs("div", { className: 'flex justify-end gap-4', children: [_jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(Droplets, { className: 'h-4 w-4 text-blue-500' }), _jsxs("span", { className: 'text-sm', children: [day.humidity, "%"] })] }), _jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(Wind, { className: 'h-4 w-4 text-blue-500' }), _jsxs("span", { className: 'text-sm', children: [day.wind, "m/s"] })] })] })] }, day.date));
                        }) }) })] }) });
}
