import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AlertError from '@/components/AlertError';
import CurrentWeather from '@/components/CurrentWeather';
import FavoriteCities from '@/components/FavoriteCities';
import HourlyTemprature from '@/components/HourlyTemprature';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';
import { useGeoLocation } from '@/hooks/use-geolocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertCircleIcon, MapPin, RefreshCcw } from 'lucide-react';
export default function WeatherDashboard() {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeoLocation();
    const weatherQuery = useWeatherQuery(coordinates);
    const foreCastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);
    // console.log(weatherQuery.data)
    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            weatherQuery.refetch();
            foreCastQuery.refetch();
            locationQuery.refetch();
        }
    };
    if (locationLoading) {
        return _jsx(LoadingSkeleton, {});
    }
    if (locationError) {
        return _jsx(AlertError, { locationError: locationError, getLocation: getLocation });
    }
    if (!coordinates) {
        return (_jsxs(Alert, { variant: "destructive", className: "max-w-md", children: [_jsx(AlertCircleIcon, { className: 'h-4 w-4' }), _jsx(AlertTitle, { children: "Location Required" }), _jsxs(AlertDescription, { className: 'flex flex-col gap-4', children: [_jsx("p", { children: "Please enable location access to see your local weather." }), _jsxs(Button, { onClick: getLocation, variant: "outline", className: 'w-fit', children: [_jsx(MapPin, { className: 'mr-2 h-4 w-4' }), "Enable Location"] })] })] }));
    }
    if (weatherQuery.error || foreCastQuery.error) {
        _jsxs(Alert, { variant: "destructive", className: "max-w-md", children: [_jsx(AlertCircleIcon, { className: 'h-4 w-4' }), _jsx(AlertTitle, { children: "Location Error" }), _jsxs(AlertDescription, { className: 'flex flex-col gap-4', children: [_jsx("p", { children: "Faild to fetch weather data. Please try again" }), _jsxs(Button, { onClick: handleRefresh, variant: "outline", className: 'w-fit', children: [_jsx(RefreshCcw, { className: 'mr-2 h-4 w-4' }), "retry"] })] })] });
    }
    if (weatherQuery.isLoading || foreCastQuery.isLoading) {
        return _jsx(LoadingSkeleton, {});
    }
    const locationName = locationQuery.data?.[0];
    return _jsx(_Fragment, { children: _jsxs("div", { className: 'space-y-4 ', children: [_jsx(FavoriteCities, {}), _jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("h1", { className: 'text-xl font-bold tracking-tight', children: "My Location" }), _jsx(Button, { variant: 'outline', size: "icon", onClick: handleRefresh, disabled: weatherQuery.isFetching || foreCastQuery.isFetching, className: 'cursor-pointer', children: _jsx(RefreshCcw, { className: `h-4 w-4  ${weatherQuery.isFetching ? "animate-spin" : null}` }) })] }), _jsxs("div", { className: 'grid gap-6 ', children: [_jsxs("div", { className: 'flex flex-col lg:flex-row gap-4 ', children: [_jsx(CurrentWeather, { locationName: locationName ?? { country: '', lat: 0, lon: 0, name: '', state: '' }, data: weatherQuery?.data ?? { coord: { lat: 0, lon: 0 }, weather: [], base: '', main: { temp: 0, pressure: 0, humidity: 0, temp_min: 0, temp_max: 0, feels_like: 0 }, wind: { speed: 0, deg: 0 }, clouds: { all: 0 }, name: '', sys: { sunrise: 0, sunset: 0, country: '' } } }), _jsx(HourlyTemprature, { data: foreCastQuery?.data ?? { list: [], city: { name: '', country: '', sunrise: 0, sunset: 0 } } })] }), _jsxs("div", { className: 'flex flex-col lg:flex-row gap-4', children: [_jsx(WeatherDetails, { data: weatherQuery?.data ?? { coord: { lat: 0, lon: 0 }, weather: [], base: '', main: { temp: 0, pressure: 0, humidity: 0, temp_min: 0, temp_max: 0, feels_like: 0 }, wind: { speed: 0, deg: 0 }, clouds: { all: 0 }, name: '', sys: { sunrise: 0, sunset: 0, country: '' } } }), _jsx(WeatherForecast, { data: foreCastQuery?.data ?? { list: [], city: { name: '', country: '', sunrise: 0, sunset: 0 } } })] })] })] }) });
}
