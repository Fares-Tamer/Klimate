import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from './ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command';
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useLocationSearch } from '@/hooks/use-weather';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use-search-history';
import { format } from 'date-fns';
import { useFavorites } from '@/hooks/use-favorite';
const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { favorites } = useFavorites();
    const navigate = useNavigate();
    const { data: locations, isLoading } = useLocationSearch(query);
    const { addToHistory, clearHistory, history } = useSearchHistory();
    // console.log(locations)
    const handleSelect = (cityData) => {
        const [lat, lon, name, country] = cityData.split('|');
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
        setOpen(false);
    };
    return _jsxs(_Fragment, { children: [_jsxs(Button, { variant: 'outline', onClick: () => setOpen(true), className: 'relative  justify-start text-sm text-muted-foreground sm:pr-12 w-40 lg:w-64 ', children: [_jsx(Search, { className: 'mr-2 h-4 w-4' }), " Search Cities..."] }), _jsxs(CommandDialog, { open: open, onOpenChange: setOpen, children: [_jsx(CommandInput, { placeholder: "Search Cities", value: query, onValueChange: setQuery }), _jsxs(CommandList, { children: [query.length > 2 && !isLoading && _jsx(CommandEmpty, { children: "No Cities found." }), favorites.length > 0 && (_jsx(CommandGroup, { heading: "Favorites", children: favorites.map((location) => {
                                    return _jsxs(CommandItem, { value: `${location.lat}|${location.lon}|${location.name}|${location.country}`, onSelect: handleSelect, children: [_jsx(Star, { className: 'mr-2 h-4 w-4 text-yellow-500' }), _jsx("span", { children: location.name }), location.state && (_jsxs("span", { className: 'text-muted-foreground text-sm', children: [", ", location.state] })), _jsxs("span", { className: 'text-sm text-muted-foreground', children: [", ", location.country] })] }, location.id);
                                }) })), history.length > 0 && (_jsxs(_Fragment, { children: [_jsx(CommandSeparator, {}), _jsxs(CommandGroup, { children: [_jsxs("div", { className: 'flex items-center justify-between px-2 my-2', children: [_jsx("p", { className: 'text-xs text-muted-foreground', children: "Recent Searches" }), _jsxs(Button, { variant: 'ghost', size: 'sm', onClick: () => clearHistory.mutate(), className: 'hover:text-red-500', children: [_jsx(XCircle, { className: 'h-4 w-4' }), "Clear"] })] }), history.map((location) => {
                                                return _jsxs(CommandItem, { value: `${location.lat}|${location.lon}|${location.name}|${location.country}`, onSelect: handleSelect, children: [_jsx(Clock, { className: 'mr-2 h-4 w-4 text-muted-foreground' }), _jsx("span", { children: location.name }), location.state && (_jsxs("span", { className: 'text-muted-foreground text-sm', children: [", ", location.state] })), _jsxs("span", { className: 'text-sm text-muted-foreground', children: [", ", location.country] }), _jsx("p", { className: 'ml-auto text-xs text-muted-foreground', children: format(location.searchedAt, "MMM d, h:mm a") })] }, location.lat && location.lon);
                                            })] })] })), _jsx(CommandSeparator, {}), locations && locations.length > 0 && (_jsxs(CommandGroup, { heading: "Suggestions", children: [isLoading && (_jsx("div", { className: 'flex items-center justify-center p-4', children: _jsx(Loader2, { className: 'h-4 w-4 animate-spin' }) })), locations.map((location) => {
                                        return _jsxs(CommandItem, { value: `${location.lat}|${location.lon}|${location.name}|${location.country}`, onSelect: handleSelect, children: [_jsx(Search, { className: 'mr-2 h-4 w-4' }), _jsx("span", { children: location.name }), location.state && (_jsxs("span", { className: 'text-muted-foreground text-sm', children: [", ", location.state] })), _jsxs("span", { className: 'text-sm text-muted-foreground', children: [", ", location.country] })] }, location.lat && location.lon);
                                    })] }))] })] })] });
};
export default CitySearch;
