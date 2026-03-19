import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircleIcon, MapPin } from 'lucide-react';
import { Button } from './ui/button';
export default function AlertError({ locationError, getLocation }) {
    return _jsx(_Fragment, { children: _jsxs(Alert, { variant: "destructive", className: "max-w-md", children: [_jsx(AlertCircleIcon, { className: 'h-4 w-4' }), _jsx(AlertTitle, { children: "Location Error" }), _jsxs(AlertDescription, { className: 'flex flex-col gap-4', children: [_jsx("p", { children: locationError }), _jsxs(Button, { onClick: getLocation, variant: "outline", className: 'w-fit', children: [_jsx(MapPin, { className: 'mr-2 h-4 w-4' }), "Enable Location"] })] })] }) });
}
