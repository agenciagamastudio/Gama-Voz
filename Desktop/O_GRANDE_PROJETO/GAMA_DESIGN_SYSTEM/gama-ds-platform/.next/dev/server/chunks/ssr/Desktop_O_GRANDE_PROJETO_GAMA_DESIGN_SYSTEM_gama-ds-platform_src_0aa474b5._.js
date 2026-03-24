module.exports = [
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Button({ children, variant = 'primary', size = 'md', disabled = false, loading = false, onClick, className = '', ariaLabel, ariaDescribedBy }) {
    const baseStyles = 'font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap shadow-sm hover:shadow-md active:shadow-sm';
    const variantStyles = {
        primary: 'bg-gama-primary text-black border border-gama-primary [&:hover]:brightness-[var(--brightness-hover)] [&:active]:brightness-[var(--brightness-active)] transition-all duration-200',
        secondary: 'bg-gama-surface text-gama-text border-2 border-gama-border-default hover:border-gama-primary active:border-gama-primary hover:bg-gama-surface-accent transition-all duration-200',
        ghost: 'text-gama-primary border-2 border-gama-primary hover:bg-gama-primary hover:text-gama-dark active:bg-gama-primary active:opacity-[var(--opacity-active)] transition-all duration-200',
        danger: 'bg-gama-error text-white border border-gama-error [&:hover]:brightness-[var(--brightness-hover)] [&:active]:brightness-[var(--brightness-active)] transition-all duration-200'
    };
    const sizeStyles = {
        sm: 'px-4 py-2 text-sm h-8',
        md: 'px-6 py-3 text-base h-10',
        lg: 'px-8 py-4 text-lg h-12'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled || loading,
        className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
        "aria-disabled": disabled || loading,
        children: loading ? '⟳' : children
    }, void 0, false, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Button.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Error
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Button.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Error({ error, reset }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gama-dark text-gama-text flex flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-6xl font-black mb-4 text-gama-primary",
                children: "Oops!"
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl text-gama-text-secondary mb-8 max-w-2xl text-center",
                children: "Algo deu errado. Não se preocupe, nosso time já foi avisado!"
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "primary",
                        size: "lg",
                        onClick: ()=>reset(),
                        children: "Tentar novamente"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "secondary",
                            size: "lg",
                            children: "Voltar ao home"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/error.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_O_GRANDE_PROJETO_GAMA_DESIGN_SYSTEM_gama-ds-platform_src_0aa474b5._.js.map