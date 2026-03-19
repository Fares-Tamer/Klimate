import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@/api/weather';
const WEATHER_KEYS = {
    weather: (coords) => ["weather", coords],
    foreCast: (coords) => ["forecast", coords],
    location: (coords) => ["location", coords],
    search: (query) => ["search", query],
};
export function useWeatherQuery(coordinates) {
    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
        enabled: !!coordinates,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}
export function useForecastQuery(coordinates) {
    return useQuery({
        queryKey: WEATHER_KEYS.foreCast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherApi.getForecast(coordinates) : null,
        enabled: !!coordinates,
    });
}
export function useReverseGeocodeQuery(coordinates) {
    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => coordinates ? weatherApi.reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    });
}
export function useLocationSearch(query) {
    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: () => weatherApi.searchLocations(query),
        enabled: query.length >= 3,
    });
}
