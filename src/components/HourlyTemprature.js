import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from "date-fns";
export default function HourlyTemprature({ data }) {
    const chartData = data.list.slice(0, 8).map((item) => ({
        time: format(new Date(item.dt * 1000), "ha"),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like)
    }));
    return _jsx(_Fragment, { children: _jsxs(Card, { className: 'flex-1', children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Today's Tempertature" }) }), _jsx(CardContent, { children: _jsx("div", { className: 'h-50 w-full', children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { responsive: true, data: chartData, children: [_jsx(XAxis, { dataKey: "time", stroke: '#888888', fontSize: 12, tickLine: false, axisLine: false }), _jsx(YAxis, { dataKey: "temp", stroke: '#888888', fontSize: 12, tickLine: false, axisLine: false, tickFormatter: (value) => `${value}°` }), _jsx(Tooltip, { content: ({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (_jsx("div", { className: 'rounded-lg border bg-background p-2 shadow-sm', children: _jsxs("div", { className: 'grid grid-cols-2 gap-2', children: [_jsxs("div", { className: 'flex flex-col', children: [_jsx("span", { className: 'text-[0.70rem] uppercase text-muted-foreground', children: "Temprature" }), _jsxs("span", { className: 'font-bold', children: [payload[0].value, "\u00B0"] })] }), _jsxs("div", { className: 'flex flex-col', children: [_jsx("span", { className: 'text-[0.70rem] uppercase text-muted-foreground', children: "Feels_Like" }), _jsxs("span", { className: 'font-bold', children: [payload[1].value, "\u00B0"] })] })] }) }));
                                            }
                                            return null;
                                        } }), _jsx(Line, { dataKey: "temp", type: "monotone", stroke: '#2563eb', strokeWidth: 2, dot: false }), _jsx(Line, { dataKey: "feels_like", type: "monotone", stroke: '#2563eb', strokeWidth: 2, dot: false, strokeDasharray: "5 5" })] }) }) }) })] }) });
}
