import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from './ui/skeleton';
export default function LoadingSkeleton() {
    return _jsx(_Fragment, { children: _jsx("div", { className: 'space-y-6', children: _jsxs("div", { className: 'grid gap-6', children: [_jsx(Skeleton, { className: 'h-75 w-full rounded-lg' }), _jsx(Skeleton, { className: 'h-75 w-full rounded-lg' }), _jsxs("div", { className: 'grid gap-6 md:grid-cols-2', children: [_jsx(Skeleton, { className: 'h-75 w-full rounded-lg' }), _jsx(Skeleton, { className: 'h-75 w-full rounded-lg' })] })] }) }) });
}
