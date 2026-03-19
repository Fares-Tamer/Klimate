import { jsx as _jsx } from "react/jsx-runtime";
import { useFavorites } from '@/hooks/use-favorite';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
export default function Favoritebutton({ data }) {
    const { addFavorite, isFavorite, removeFavorite } = useFavorites();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);
    const handleToggleFavorite = () => {
        if (isCurrentlyFavorite) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        }
        else {
            addFavorite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favorites`);
        }
    };
    return _jsx(Button, { variant: isCurrentlyFavorite ? "default" : "outline", size: "icon", className: `${isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}`, onClick: handleToggleFavorite, children: _jsx(Star, { className: `h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ''}` }) });
}
