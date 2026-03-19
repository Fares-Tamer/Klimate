import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useFavorites } from '@/hooks/use-favorite';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useWeatherQuery } from '@/hooks/use-weather';
import { Button } from './ui/button';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
export default function FavoriteCities() {
    const { favorites, removeFavorite } = useFavorites();
    if (!favorites.length)
        return null;
    function FavoriteCityTablet({ id, name, lat, lon, onRemove, }) {
        const navigate = useNavigate();
        const { data: weather, isLoading } = useWeatherQuery({ lat, lon });
        const handleClick = () => {
            navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
        };
        return (_jsxs("div", { onClick: handleClick, className: "relative flex min-w-60 cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md", role: "button", tabIndex: 0, children: [_jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-1 top-1 h-6 w-6 rounded-full p-0  hover:text-destructive group-hover:opacity-100 cursor-pointer", onClick: (e) => {
                        e.stopPropagation();
                        onRemove(id);
                        toast.error(`Removed ${name} from Favorites`);
                    }, children: _jsx(X, { className: "h-4 w-4" }) }), isLoading ? (_jsx("div", { className: "flex h-8 items-center justify-center", children: _jsx(Loader2, { className: "h-4 w-4 animate-spin" }) })) : weather ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`, alt: weather.weather[0].description, className: "h-8 w-8" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: name }), _jsx("p", { className: "text-xs text-muted-foreground", children: weather.sys.country })] })] }), _jsxs("div", { className: "ml-auto text-right", children: [_jsxs("p", { className: "text-xl font-bold", children: [Math.round(weather.main.temp), "\u00B0"] }), _jsx("p", { className: "text-xs capitalize text-muted-foreground", children: weather.weather[0].description })] })] })) : null] }));
    }
    return _jsxs(_Fragment, { children: [_jsx("h1", { className: 'text-xl font-bold tracking-tight', children: "Favorites" }), _jsxs(ScrollArea, { className: 'w-full pb-4', children: [_jsx("div", { className: 'flex gap-4', children: favorites.map((city) => (_jsx(FavoriteCityTablet, { ...city, onRemove: () => removeFavorite.mutate(city.id) }, city.id))) }), _jsx(ScrollBar, { orientation: "horizontal", className: "mt-2" })] })] });
}
