import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import logo from '/assets/logo.png';
import logo2 from '/assets/logo2.png';
import { useTheme } from './context/theme-provider';
import { Moon, Sun } from 'lucide-react';
import CitySearch from './CitySearch';
export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';
    return (_jsx("nav", { className: 'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-backdrop-filter:bg-background/60', children: _jsxs("div", { className: 'container mx-auto flex h-16 items-center justify-between px-4', children: [_jsx(Link, { to: '/', children: _jsx("img", { src: isDark ? logo : logo2, alt: 'Klimate Logo', className: 'h-14' }) }), _jsxs("div", { className: 'flex gap-2 items-center', children: [_jsx(CitySearch, {}), _jsx("div", { children: _jsx("button", { className: 'cursor-pointer', onClick: () => setTheme(isDark ? 'light' : 'dark'), children: isDark ? _jsx(Sun, { className: 'h-6 w-6 text-yellow-500' }) : _jsx(Moon, { className: 'h-6 w-6 text-blue-500' }) }) })] })] }) }));
}
