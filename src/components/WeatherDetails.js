import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { format } from 'date-fns';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
export default function WeatherDetails({ data }) {
    const { main, wind, sys } = data;
    const formatTime = (time) => {
        return format(new Date(time * 1000), "h:mm a");
    };
    const getWindDirection = (degree) => {
        const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return direction[index];
    };
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
    ];
    return _jsx(_Fragment, { children: _jsxs(Card, { className: 'sm:h-70', children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Weather Details" }) }), _jsx(CardContent, { children: _jsx("div", { className: 'grid gap-6 sm:grid-cols-2', children: details.map((detail) => {
                            return (_jsxs("div", { className: 'flex gap-3 items-center rounded-lg border p-4 sm:w-60', children: [_jsx(detail.icon, { className: `${detail.color} h-5 w-5` }), _jsxs("div", { children: [_jsx("h1", { className: 'text-sm font-medium leading-none', children: detail.title }), _jsx("p", { className: 'text-muted-foreground text-sm', children: detail.value })] })] }, detail.title));
                        }) }) })] }) });
}
