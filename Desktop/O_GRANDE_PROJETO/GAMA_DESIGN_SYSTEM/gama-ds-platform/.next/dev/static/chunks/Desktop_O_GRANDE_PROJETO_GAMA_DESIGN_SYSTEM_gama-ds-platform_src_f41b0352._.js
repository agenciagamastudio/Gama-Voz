(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/ThemeToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ThemeToggle() {
    _s();
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>{
            setMounted(true);
            // Check localStorage or system preference on mount
            const savedTheme = localStorage.getItem('gama-theme');
            if (savedTheme) {
                setTheme(savedTheme);
                document.documentElement.setAttribute('data-theme', savedTheme);
            } else if ("TURBOPACK compile-time truthy", 1) {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const initialTheme = prefersDark ? 'dark' : 'light';
                setTheme(initialTheme);
                document.documentElement.setAttribute('data-theme', initialTheme);
            }
        }
    }["ThemeToggle.useEffect"], []);
    const toggleTheme = ()=>{
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('gama-theme', newTheme);
    };
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggleTheme,
        title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
        className: `p-2.5 rounded-lg motion-transition-default border-2 font-bold shadow-md hover:shadow-lg ${theme === 'dark' ? 'bg-gama-surface border-gama-primary text-gama-primary hover:bg-gama-surface-accent' : 'bg-gama-surface border-gama-primary text-gama-primary hover:bg-gama-surface-hover'}`,
        "aria-label": "Toggle theme",
        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/ThemeToggle.tsx",
            lineNumber: 48,
            columnNumber: 27
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
            size: 22
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/ThemeToggle.tsx",
            lineNumber: 48,
            columnNumber: 47
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/ThemeToggle.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "L5R6nLrFtVbWds7hyTJfclq/XjM=");
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SidenavContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SidenavProvider",
    ()=>SidenavProvider,
    "useSidenavContext",
    ()=>useSidenavContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const SidenavContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SidenavProvider({ children }) {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDrawerOpen, setIsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Close drawer on Escape key + reserve scrollbar space (prevent CLS)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SidenavProvider.useEffect": ()=>{
            const handleEscape = {
                "SidenavProvider.useEffect.handleEscape": (e)=>{
                    if (e.key === 'Escape' && isDrawerOpen) {
                        setIsDrawerOpen(false);
                    }
                }
            }["SidenavProvider.useEffect.handleEscape"];
            if (isDrawerOpen) {
                document.addEventListener('keydown', handleEscape);
                // Prevent body scroll when drawer is open
                document.body.style.overflow = 'hidden';
                return ({
                    "SidenavProvider.useEffect": ()=>{
                        document.removeEventListener('keydown', handleEscape);
                        document.body.style.overflow = 'unset';
                    }
                })["SidenavProvider.useEffect"];
            }
            // Reserve scrollbar space to prevent CLS
            document.documentElement.style.overflowY = 'scroll';
            return ({
                "SidenavProvider.useEffect": ()=>{
                    document.documentElement.style.overflowY = 'auto';
                }
            })["SidenavProvider.useEffect"];
        }
    }["SidenavProvider.useEffect"], [
        isDrawerOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidenavContext.Provider, {
        value: {
            isHovered,
            setIsHovered,
            isDrawerOpen,
            setIsDrawerOpen
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SidenavContext.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(SidenavProvider, "wLn9ypvZCgsbZ9eN2xf3aiUqBlI=");
_c = SidenavProvider;
function useSidenavContext() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SidenavContext);
    if (!context) {
        throw new Error('useSidenavContext must be used within SidenavProvider');
    }
    return context;
}
_s1(useSidenavContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SidenavProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Logo",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
};
const viewBoxMap = {
    sm: 'scale-100',
    md: 'scale-100',
    lg: 'scale-100'
};
function Logo({ size = 'md', withText = false, className = '', href = '/landing' }) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };
    const svg = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `${sizeClasses[size]} ${className} text-gama-primary inline-block`,
        viewBox: "0 0 545 529",
        fill: "currentColor",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M186.101364,155.048157 C186.052231,159.878113 185.960907,164.708054 185.960266,169.538010 C185.951004,239.196609 185.953934,308.855225 185.953934,378.513824 C185.953934,380.496277 185.953934,382.478729 185.953934,384.855164 C250.404602,384.855164 314.594299,384.855164 379.107330,384.855164 C379.107330,320.693756 379.107330,256.619812 379.107330,192.199432 C357.878235,192.199432 336.665436,192.199432 315.073639,192.199432 C315.073639,234.962036 315.073639,277.563446 315.073639,320.527222 C293.478058,320.527222 272.256531,320.527222 250.694885,320.527222 C250.694885,256.243073 250.694885,192.013428 250.694885,127.473991 C252.155670,127.360100 253.433334,127.173851 254.711060,127.173424 C296.039612,127.159546 337.368622,127.046242 378.696564,127.203560 C409.548981,127.320999 435.891846,148.246017 442.446442,177.706879 C443.521301,182.538040 443.931519,187.609940 443.938965,192.571640 C444.035217,256.564087 444.058685,320.556824 443.981140,384.549316 C443.936371,421.505493 415.789429,449.818634 378.850220,449.895050 C315.024506,450.027069 251.198318,449.986359 187.372467,449.913208 C149.472687,449.869751 121.477013,421.932739 121.332306,383.889160 C121.172569,341.894623 121.300941,299.899048 121.289497,257.903900 C121.280243,223.908646 121.249771,189.913406 121.577271,155.448273 C143.317673,155.001663 164.709518,155.024918 186.101364,155.048157 z"
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M186.563293,155.028473 C164.709518,155.024918 143.317673,155.001663 121.456833,154.993698 C113.900452,155.008987 106.813065,155.008987 98.827560,155.008987 C117.203934,127.445038 135.062943,100.657104 153.308411,73.289505 C171.498291,100.624733 189.313019,127.396194 207.687454,155.008774 C200.174530,155.008774 193.599884,155.008774 186.563293,155.028473 z"
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
    if (!withText) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            title: "GAMA - Ir para Home",
            className: "hover:opacity-80 transition-opacity inline-block text-gama-primary",
            children: svg
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: "flex items-center gap-3 hover:opacity-80 transition-opacity",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-shrink-0 flex items-center justify-center text-gama-primary`,
                children: svg
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-bold text-gama-text truncate",
                        children: "GAMA"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gama-text-secondary truncate",
                        children: "Design System"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gama-text-tertiary mt-0.5",
                        children: "v1.0.0"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c = Logo;
var _c;
__turbopack_context__.k.register(_c, "Logo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/utils/tokenToCSSVar.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Converte um nome de token para um nome de CSS variable válido
 * Exemplo: "primary" → "--color-primary"
 *          "text_secondary" → "--color-text-secondary"
 */ __turbopack_context__.s([
    "applyBrandTokensToCSSVars",
    ()=>applyBrandTokensToCSSVars,
    "tokenToCSSVarName",
    ()=>tokenToCSSVarName
]);
function tokenToCSSVarName(token, category) {
    // Converter underscores para hífens (padrão CSS)
    const normalized = token.replace(/_/g, '-');
    return `--${category}-${normalized}`;
}
function applyBrandTokensToCSSVars(tokens) {
    const root = document.documentElement;
    // Cores
    if (tokens.colors) {
        Object.entries(tokens.colors).forEach(([key, value])=>{
            const varName = tokenToCSSVarName(key, 'color');
            root.style.setProperty(varName, value);
        });
    }
    // Typography - Fonts
    if (tokens.typography?.font_primary) {
        root.style.setProperty('--font-primary', tokens.typography.font_primary);
    }
    if (tokens.typography?.font_code) {
        root.style.setProperty('--font-code', tokens.typography.font_code);
    }
    // Spacing
    if (tokens.spacing) {
        Object.entries(tokens.spacing).forEach(([key, value])=>{
            const varName = tokenToCSSVarName(key, 'spacing');
            root.style.setProperty(varName, value);
        });
    }
    // Radius
    if (tokens.radius) {
        Object.entries(tokens.radius).forEach(([key, value])=>{
            const varName = tokenToCSSVarName(key, 'radius');
            root.style.setProperty(varName, value);
        });
    }
    // Shadows
    if (tokens.shadows) {
        Object.entries(tokens.shadows).forEach(([key, value])=>{
            const varName = tokenToCSSVarName(key, 'shadow');
            root.style.setProperty(varName, value);
        });
    }
    // Animation
    if (tokens.animation) {
        Object.entries(tokens.animation).forEach(([key, value])=>{
            const varName = tokenToCSSVarName(key, 'animation');
            root.style.setProperty(varName, value);
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/context/BrandContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandContext",
    ()=>BrandContext,
    "BrandProvider",
    ()=>BrandProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$utils$2f$tokenToCSSVar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/utils/tokenToCSSVar.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const BrandContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function BrandProvider({ children, defaultBrandId = 'gama-studio' }) {
    _s();
    const [activeBrandId, setActiveBrandId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultBrandId);
    const [currentBrandTokens, setCurrentBrandTokens] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentBrand, setCurrentBrand] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [brands, setBrands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Carregar lista de brands na montagem
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrandProvider.useEffect": ()=>{
            async function loadBrands() {
                try {
                    const response = await fetch('/api/brands');
                    const data = await response.json();
                    setBrands(data.brands);
                    // Restaurar preferência salva ou usar default
                    const savedBrandId = localStorage.getItem('gama-active-brand') || defaultBrandId;
                    setActiveBrandId(savedBrandId);
                } catch (error) {
                    console.error('Erro carregando brands:', error);
                }
            }
            loadBrands();
        }
    }["BrandProvider.useEffect"], [
        defaultBrandId
    ]);
    // Carregar tokens quando brand ativa mudar
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrandProvider.useEffect": ()=>{
            async function loadBrandTokens() {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/brands/${activeBrandId}/tokens`);
                    const tokens = await response.json();
                    const brandResponse = await fetch(`/api/brands/${activeBrandId}`);
                    const brand = await brandResponse.json();
                    setCurrentBrandTokens(tokens);
                    setCurrentBrand(brand);
                    // Salvar preferência
                    localStorage.setItem('gama-active-brand', activeBrandId);
                    // Aplicar tokens ao document como CSS vars
                    applyTokensToCSSVars(tokens);
                } catch (error) {
                    console.error(`Erro carregando tokens para ${activeBrandId}:`, error);
                } finally{
                    setIsLoading(false);
                }
            }
            loadBrandTokens();
        }
    }["BrandProvider.useEffect"], [
        activeBrandId
    ]);
    function applyTokensToCSSVars(tokens) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$utils$2f$tokenToCSSVar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyBrandTokensToCSSVars"])(tokens);
    }
    const value = {
        activeBrandId,
        currentBrandTokens: currentBrandTokens || {},
        currentBrand,
        brands,
        setActiveBrand: setActiveBrandId,
        isLoading
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/context/BrandContext.tsx",
        lineNumber: 132,
        columnNumber: 10
    }, this);
}
_s(BrandProvider, "y8h1vQXU1ILnAp3jHZF0x20Yij4=");
_c = BrandProvider;
var _c;
__turbopack_context__.k.register(_c, "BrandProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/hooks/useBrand.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBrand",
    ()=>useBrand,
    "useBrandId",
    ()=>useBrandId,
    "useBrandSwitcher",
    ()=>useBrandSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$context$2f$BrandContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/context/BrandContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
function useBrand() {
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$context$2f$BrandContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandContext"]);
    if (!context) {
        throw new Error('useBrand must be used within BrandProvider');
    }
    return context.currentBrandTokens;
}
_s(useBrand, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useBrandId() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$context$2f$BrandContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandContext"]);
    if (!context) {
        throw new Error('useBrandId must be used within BrandProvider');
    }
    return context.activeBrandId;
}
_s1(useBrandId, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
function useBrandSwitcher() {
    _s2();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$context$2f$BrandContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandContext"]);
    if (!context) {
        throw new Error('useBrandSwitcher must be used within BrandProvider');
    }
    return {
        activeBrandId: context.activeBrandId,
        setActiveBrand: context.setActiveBrand,
        brands: context.brands
    };
}
_s2(useBrandSwitcher, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandSwitcher",
    ()=>BrandSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$hooks$2f$useBrand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/hooks/useBrand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BrandSwitcher() {
    _s();
    const { activeBrandId, setActiveBrand, brands } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$hooks$2f$useBrand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBrandSwitcher"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const activeBrand = brands.find((b)=>b.id === activeBrandId);
    if (!activeBrand || brands.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-gama-surface hover:bg-gama-surface/80 motion-transition-default duration-200 text-sm font-medium text-gama-text",
                "aria-label": "Selecionar brand",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 rounded-full",
                        style: {
                            backgroundColor: activeBrand.metadata?.color || '#88CE11'
                        },
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: activeBrand.name
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 16,
                        className: `motion-transition-fast ${isOpen ? 'rotate-180' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-30",
                        onClick: ()=>setIsOpen(false),
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-full right-0 mt-2 w-56 bg-gama-darker border border-gama-surface rounded-lg shadow-xl z-40 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-b border-gama-surface bg-gama-surface/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-gama-text-secondary uppercase tracking-wider",
                                    children: "Selecionar Brand"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-80 overflow-y-auto",
                                children: brands.sort((a, b)=>a.order - b.order).map((brand)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setActiveBrand(brand.id);
                                            setIsOpen(false);
                                        },
                                        className: `w-full px-4 py-3 text-left motion-transition-default duration-200 flex items-center gap-3 ${activeBrandId === brand.id ? 'bg-gama-primary/20 text-gama-primary' : 'hover:bg-gama-surface/60 text-gama-text'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-3 h-3 rounded-full flex-shrink-0",
                                                style: {
                                                    backgroundColor: brand.metadata?.color || '#88CE11'
                                                },
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                                lineNumber: 69,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-medium text-sm",
                                                        children: brand.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                                        lineNumber: 75,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gama-text-secondary truncate",
                                                        children: brand.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                                lineNumber: 74,
                                                columnNumber: 21
                                            }, this),
                                            activeBrandId === brand.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 rounded-full bg-gama-primary flex-shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                                lineNumber: 81,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, brand.id, true, {
                                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                        lineNumber: 57,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 border-t border-gama-surface bg-gama-surface/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gama-text-secondary",
                                    children: [
                                        brands.length,
                                        " brand",
                                        brands.length !== 1 ? 's' : '',
                                        " disponível",
                                        brands.length !== 1 ? 's' : ''
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(BrandSwitcher, "7F7KGmdUSZS0PqcvmsBaFspPqS8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$hooks$2f$useBrand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBrandSwitcher"]
    ];
});
_c = BrandSwitcher;
var _c;
__turbopack_context__.k.register(_c, "BrandSwitcher");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SideNav",
    ()=>SideNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/ThemeToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SidenavContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$BrandSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/BrandSwitcher.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const navItems = [
    {
        label: 'Foundations',
        href: '#',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
            lineNumber: 23,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                label: 'Colors',
                href: '/foundations/colors'
            },
            {
                label: 'Typography',
                href: '/foundations/typography'
            },
            {
                label: 'Spacing',
                href: '/foundations/spacing'
            },
            {
                label: 'Icons',
                href: '/foundations/icons'
            }
        ]
    },
    {
        label: 'Components',
        href: '#',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
            lineNumber: 34,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                label: 'Atoms',
                href: '/components/atoms'
            },
            {
                label: 'Molecules',
                href: '/components/molecules'
            },
            {
                label: 'Organisms',
                href: '/components/organisms'
            }
        ]
    },
    {
        label: 'Brand',
        href: '#',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
            lineNumber: 44,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                label: 'Identity',
                href: '/brand/identity'
            },
            {
                label: 'Voice & Tone',
                href: '/brand/voice'
            },
            {
                label: 'Applications',
                href: '/brand/applications'
            }
        ]
    },
    {
        label: 'Tokens',
        href: '/tokens',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
            lineNumber: 54,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    }
];
function NavGroup({ item, isCollapsed }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!isCollapsed);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (!item.children) {
        const isActive = pathname === item.href;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                title: isCollapsed ? item.label : '',
                className: `flex items-center gap-3 px-4 py-3 rounded-lg motion-transition-default duration-200 ${isCollapsed ? 'w-11 h-11 mx-auto justify-center p-0' : ''} ${isActive ? 'bg-gama-primary text-gama-dark font-bold' : 'text-gama-text hover:bg-gama-surface/60'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                        children: item.icon
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 78,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    const anyChildActive = item.children.some((child)=>pathname === child.href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                "aria-expanded": isOpen,
                title: isCollapsed ? item.label : '',
                className: `flex items-center gap-3 px-4 py-3 rounded-lg motion-transition-default duration-200 w-full ${isCollapsed ? 'w-11 h-11 mx-auto justify-center p-0' : ''} ${anyChildActive || isOpen ? 'bg-gama-surface/70 text-gama-primary' : 'text-gama-text hover:bg-gama-surface/60'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                        children: item.icon
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium flex-1 text-left",
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 16,
                                className: `motion-transition-fast flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            isOpen && !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ml-6 mt-1.5 space-y-1 border-l border-gama-surface-accent pl-2",
                children: item.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: child.href,
                            className: `block px-4 py-3 text-xs rounded motion-transition-default duration-200 ${pathname === child.href ? 'bg-gama-primary text-gama-dark font-bold' : 'text-gama-text-secondary hover:text-gama-text hover:bg-gama-surface/60'}`,
                            children: child.label
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, this)
                    }, child.href, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 113,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(NavGroup, "PjyNkhD4lbCKnXZbEubluAohr+s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavGroup;
function SideNav() {
    _s1();
    const { isHovered, setIsHovered, setIsDrawerOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidenavContext"])();
    const isCollapsed = !isHovered;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsDrawerOpen(true),
                className: "fixed top-4 left-4 lg:hidden z-40 w-11 h-11 flex items-center justify-center rounded-full bg-gama-surface/80 hover:bg-gama-surface motion-transition-default duration-200",
                "aria-label": "Open navigation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    size: 24,
                    className: "text-gama-primary"
                }, void 0, false, {
                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                onMouseEnter: ()=>setIsHovered(true),
                onMouseLeave: ()=>setIsHovered(false),
                className: `hidden lg:block lg:fixed top-0 left-0 h-screen bg-gama-darker border-r border-gama-surface z-50 motion-transition-default duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 px-3 py-5 border-b border-gama-surface flex items-center justify-center",
                        children: isCollapsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gama-surface/70 motion-transition-default duration-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                                size: "md"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 158,
                            columnNumber: 11
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                            size: "lg",
                            withText: true
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 156,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 overflow-y-auto px-2 py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2",
                            children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavGroup, {
                                    item: item,
                                    isCollapsed: isCollapsed
                                }, item.label, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 168,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 167,
                        columnNumber: 7
                    }, this),
                    !isCollapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 px-3 py-4 border-t border-gama-surface",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-gama-surface/50 rounded-lg backdrop-blur-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gama-text-secondary mb-2.5 font-semibold",
                                    children: "📖 Reference"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1.5 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/tokens",
                                                className: "text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200",
                                                children: "Design Tokens JSON"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                                lineNumber: 182,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/components/atoms",
                                                className: "text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200",
                                                children: "Component API"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/tailwind-config",
                                                className: "text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200",
                                                children: "Tailwind Config"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                            lineNumber: 191,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                                    lineNumber: 180,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-shrink-0 px-3 py-3 border-t border-gama-surface ${isCollapsed ? 'flex justify-center' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$BrandSwitcher$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandSwitcher"], {}, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 203,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 202,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-shrink-0 px-3 py-3 border-t border-gama-surface flex ${isCollapsed ? 'justify-center' : 'justify-end'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$ThemeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {}, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                            lineNumber: 208,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                        lineNumber: 207,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SideNav.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(SideNav, "EZodcWAq9DRzRDlWhniTXAmu014=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidenavContext"]
    ];
});
_c1 = SideNav;
var _c, _c1;
__turbopack_context__.k.register(_c, "NavGroup");
__turbopack_context__.k.register(_c1, "SideNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DrawerNav",
    ()=>DrawerNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SidenavContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/Logo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const navItems = [
    {
        label: 'Foundations',
        href: '#',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
            lineNumber: 21,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                label: 'Colors',
                href: '/foundations/colors'
            },
            {
                label: 'Typography',
                href: '/foundations/typography'
            },
            {
                label: 'Spacing',
                href: '/foundations/spacing'
            },
            {
                label: 'Icons',
                href: '/foundations/icons'
            }
        ]
    },
    {
        label: 'Components',
        href: '#',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
            lineNumber: 32,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                label: 'Atoms',
                href: '/components/atoms'
            },
            {
                label: 'Molecules',
                href: '/components/molecules'
            },
            {
                label: 'Organisms',
                href: '/components/organisms'
            }
        ]
    },
    {
        label: 'Brand',
        href: '#',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
            lineNumber: 42,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                label: 'Identity',
                href: '/brand/identity'
            },
            {
                label: 'Voice & Tone',
                href: '/brand/voice'
            },
            {
                label: 'Applications',
                href: '/brand/applications'
            }
        ]
    },
    {
        label: 'Tokens',
        href: '/tokens',
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
            size: 20
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
            lineNumber: 52,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    }
];
function NavGroup({ item, isDrawer }) {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (!item.children) {
        const isActive = pathname === item.href;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                className: `flex items-center gap-3 px-4 py-3 rounded-lg motion-transition-default duration-200 ${isActive ? 'bg-gama-primary text-gama-dark font-bold' : 'text-gama-text hover:bg-gama-surface/60'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                        children: item.icon
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this);
    }
    const anyChildActive = item.children.some((child)=>pathname === child.href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                "aria-expanded": isOpen,
                className: `flex items-center gap-3 px-4 py-3 rounded-lg motion-transition-default duration-200 w-full ${anyChildActive || isOpen ? 'bg-gama-surface/70 text-gama-primary' : 'text-gama-text hover:bg-gama-surface/60'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex-shrink-0 w-5 h-5 flex items-center justify-center",
                        children: item.icon
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium flex-1 text-left",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 16,
                        className: `motion-transition-fast flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "ml-6 mt-1.5 space-y-1 border-l border-gama-surface-accent pl-2",
                children: item.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: child.href,
                            className: `block px-3 py-2 text-xs rounded motion-transition-default duration-200 ${pathname === child.href ? 'bg-gama-primary text-gama-dark font-bold' : 'text-gama-text-secondary hover:text-gama-text hover:bg-gama-surface/60'}`,
                            children: child.label
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                            lineNumber: 99,
                            columnNumber: 15
                        }, this)
                    }, child.href, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 98,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                lineNumber: 96,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(NavGroup, "LvAKcOhSuBLzTufKlhNwaSeG0Po=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavGroup;
function DrawerNav() {
    _s1();
    const { isDrawerOpen, setIsDrawerOpen } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidenavContext"])();
    const drawerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const firstFocusableRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Focus trap, escape key, and swipe support
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DrawerNav.useEffect": ()=>{
            if (!isDrawerOpen) return;
            // Focus first element
            setTimeout({
                "DrawerNav.useEffect": ()=>firstFocusableRef.current?.focus()
            }["DrawerNav.useEffect"], 0);
            let startX = 0;
            const handleTouchStart = {
                "DrawerNav.useEffect.handleTouchStart": (e)=>{
                    startX = e.touches[0].clientX;
                }
            }["DrawerNav.useEffect.handleTouchStart"];
            const handleTouchEnd = {
                "DrawerNav.useEffect.handleTouchEnd": (e)=>{
                    const endX = e.changedTouches[0].clientX;
                    if (startX - endX > 50) {
                        setIsDrawerOpen(false);
                    }
                }
            }["DrawerNav.useEffect.handleTouchEnd"];
            const handleKeyDown = {
                "DrawerNav.useEffect.handleKeyDown": (e)=>{
                    // Handle Escape key
                    if (e.key === 'Escape') {
                        setIsDrawerOpen(false);
                        return;
                    }
                    if (e.key === 'Tab') {
                        const focusableElements = drawerRef.current?.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
                        if (!focusableElements || focusableElements.length === 0) return;
                        const firstElement = focusableElements[0];
                        const lastElement = focusableElements[focusableElements.length - 1];
                        const activeElement = document.activeElement;
                        if (e.shiftKey) {
                            if (activeElement === firstElement) {
                                lastElement.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (activeElement === lastElement) {
                                firstElement.focus();
                                e.preventDefault();
                            }
                        }
                    }
                }
            }["DrawerNav.useEffect.handleKeyDown"];
            document.addEventListener('touchstart', handleTouchStart, false);
            document.addEventListener('touchend', handleTouchEnd, false);
            document.addEventListener('keydown', handleKeyDown, false);
            return ({
                "DrawerNav.useEffect": ()=>{
                    document.removeEventListener('touchstart', handleTouchStart, false);
                    document.removeEventListener('touchend', handleTouchEnd, false);
                    document.removeEventListener('keydown', handleKeyDown, false);
                }
            })["DrawerNav.useEffect"];
        }
    }["DrawerNav.useEffect"], [
        isDrawerOpen,
        setIsDrawerOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            isDrawerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
                onClick: ()=>setIsDrawerOpen(false),
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                lineNumber: 187,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: drawerRef,
                className: `fixed top-0 left-0 h-screen z-50 w-3/4 max-w-xs bg-gama-darker border-r border-gama-surface flex flex-col lg:hidden motion-transition-fast duration-300 ease-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`,
                role: "navigation",
                "aria-label": "Mobile navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 px-4 py-5 border-b border-gama-surface flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {
                                    size: "md"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: firstFocusableRef,
                                onClick: ()=>setIsDrawerOpen(false),
                                className: "w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gama-surface/70 motion-transition-default duration-200 flex-shrink-0 ml-2",
                                "aria-label": "Close navigation",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24,
                                    className: "text-gama-primary"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 overflow-y-auto px-3 py-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2",
                            children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavGroup, {
                                    item: item,
                                    isDrawer: true
                                }, item.label, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 px-3 py-4 border-t border-gama-surface",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 bg-gama-surface/50 rounded-lg backdrop-blur-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-gama-text-secondary mb-2.5 font-semibold",
                                    children: "📖 Reference"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                className: "text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200",
                                                children: "Design Tokens JSON"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                className: "text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200",
                                                children: "Component API"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                            lineNumber: 239,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                className: "text-gama-primary hover:text-gama-primary/80 motion-transition-default duration-200",
                                                children: "Tailwind Config"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                                lineNumber: 245,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/DrawerNav.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(DrawerNav, "6tghUlQKUGfHCYeI0AN22iiVga0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidenavContext"]
    ];
});
_c1 = DrawerNav;
var _c, _c1;
__turbopack_context__.k.register(_c, "NavGroup");
__turbopack_context__.k.register(_c1, "DrawerNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/MainWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainWrapper",
    ()=>MainWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/SidenavContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function MainWrapper({ children }) {
    _s();
    const { isHovered } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidenavContext"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `motion-transition-default duration-300 ease-in-out flex-1 overflow-x-hidden relative z-0 pt-20 lg:pt-0 ${isHovered ? 'lg:ml-64' : 'lg:ml-16'}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/MainWrapper.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(MainWrapper, "XqnkSyMi2KB0ioCBCoRvPpADqzk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$platform$2f$SidenavContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSidenavContext"]
    ];
});
_c = MainWrapper;
var _c;
__turbopack_context__.k.register(_c, "MainWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/hooks/usePageLoading.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePageLoading",
    ()=>usePageLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function usePageLoading() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePageLoading.useEffect": ()=>{
            const handleStart = {
                "usePageLoading.useEffect.handleStart": ()=>setIsLoading(true)
            }["usePageLoading.useEffect.handleStart"];
            const handleStop = {
                "usePageLoading.useEffect.handleStop": ()=>setIsLoading(false)
            }["usePageLoading.useEffect.handleStop"];
            // NProgress-like event handling
            const originalPush = router.push;
            const originalReplace = router.replace;
            // @ts-ignore
            router.push = ({
                "usePageLoading.useEffect": function(href, options) {
                    handleStart();
                    // @ts-ignore
                    return originalPush.call(this, href, options).finally(handleStop);
                }
            })["usePageLoading.useEffect"];
            // @ts-ignore
            router.replace = ({
                "usePageLoading.useEffect": function(href, options) {
                    handleStart();
                    // @ts-ignore
                    return originalReplace.call(this, href, options).finally(handleStop);
                }
            })["usePageLoading.useEffect"];
            return ({
                "usePageLoading.useEffect": ()=>{
                    // Cleanup
                    setIsLoading(false);
                }
            })["usePageLoading.useEffect"];
        }
    }["usePageLoading.useEffect"], [
        router
    ]);
    return {
        isLoading
    };
}
_s(usePageLoading, "x+tVIixJA9gAIfgroQ/xQSjtIFk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Spinner",
    ()=>Spinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Spinner({ size = 'md', color = '#88CE11', variant = 'default' }) {
    const sizeStyles = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-5'
    };
    const sizePixels = {
        sm: 16,
        md: 32,
        lg: 48,
        xl: 64
    };
    // Spinner padrão
    if (variant === 'default') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `${sizeStyles[size]} border-gama-surface rounded-full animate-spin`,
            style: {
                borderTopColor: color,
                borderRightColor: color
            }
        }, void 0, false, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
    }
    // Spinner Gama Studio - Logo original SVG
    const svgSize = sizePixels[size];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: svgSize,
        height: svgSize,
        viewBox: "80 50 400 450",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                    children: `
          @keyframes gama-flicker {
            0% { opacity: 1; }
            10% { opacity: 0.3; }
            20% { opacity: 1; }
            30% { opacity: 0.5; }
            40% { opacity: 1; }
            50% { opacity: 0; }
            60% { opacity: 1; }
            70% { opacity: 0.7; }
            80% { opacity: 1; }
            100% { opacity: 1; }
          }

          .gama-logo {
            animation: gama-flicker 2s ease-in-out infinite;
          }
        `
                }, void 0, false, {
                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                className: "gama-logo",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fill: color,
                    opacity: "0.9",
                    d: "M186.101364,155.048157 C186.052231,159.878113 185.960907,164.708054 185.960266,169.538010 C185.951004,239.196609 185.953934,308.855225 185.953934,378.513824 C185.953934,380.496277 185.953934,382.478729 185.953934,384.855164 C250.404602,384.855164 314.594299,384.855164 379.107330,384.855164 C379.107330,320.693756 379.107330,256.619812 379.107330,192.199432 C357.878235,192.199432 336.665436,192.199432 315.073639,192.199432 C315.073639,234.962036 315.073639,277.563446 315.073639,320.527222 C293.478058,320.527222 272.256531,320.527222 250.694885,320.527222 C250.694885,256.243073 250.694885,192.013428 250.694885,127.473991 C252.155670,127.360100 253.433334,127.173851 254.711060,127.173424 C296.039612,127.159546 337.368622,127.046242 378.696564,127.203560 C409.548981,127.320999 435.891846,148.246017 442.446442,177.706879 C443.521301,182.538040 443.931519,187.609940 443.938965,192.571640 C444.035217,256.564087 444.058685,320.556824 443.981140,384.549316 C443.936371,421.505493 415.789429,449.818634 378.850220,449.895050 C315.024506,450.027069 251.198318,449.986359 187.372467,449.913208 C149.472687,449.869751 121.477013,421.932739 121.332306,383.889160 C121.172569,341.894623 121.300941,299.899048 121.289497,257.903900 C121.280243,223.908646 121.249771,189.913406 121.577271,155.448273 C143.317673,155.001663 164.709518,155.024918 186.101364,155.048157 z M186.563293,155.028473 C164.709518,155.024918 143.317673,155.001663 121.456833,154.993698 C113.900452,155.008987 106.813065,155.008987 98.827560,155.008987 C117.203934,127.445038 135.062943,100.657104 153.308411,73.289505 C171.498291,100.624733 189.313019,127.396194 207.687454,155.008774 C200.174530,155.008774 193.599884,155.008774 186.563293,155.028473 z"
                }, void 0, false, {
                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = Spinner;
var _c;
__turbopack_context__.k.register(_c, "Spinner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/PageLoadingIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageLoadingIndicator",
    ()=>PageLoadingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$hooks$2f$usePageLoading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/hooks/usePageLoading.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Spinner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function PageLoadingIndicator() {
    _s();
    const { isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$hooks$2f$usePageLoading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageLoading"])();
    if (!isLoading) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none transition-opacity duration-200 z-[1000]",
        style: {
            opacity: isLoading ? 1 : 0,
            pointerEvents: isLoading ? 'auto' : 'none'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spinner"], {
                    size: "lg",
                    color: "#88CE11",
                    variant: "gama-studio"
                }, void 0, false, {
                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/PageLoadingIndicator.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gama-text-secondary text-sm font-medium animate-pulse",
                    children: "Carregando..."
                }, void 0, false, {
                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/PageLoadingIndicator.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/PageLoadingIndicator.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/platform/PageLoadingIndicator.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(PageLoadingIndicator, "nWmWSfKHuSSNGx1/dAqsDOie4kc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$hooks$2f$usePageLoading$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePageLoading"]
    ];
});
_c = PageLoadingIndicator;
var _c;
__turbopack_context__.k.register(_c, "PageLoadingIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_O_GRANDE_PROJETO_GAMA_DESIGN_SYSTEM_gama-ds-platform_src_f41b0352._.js.map