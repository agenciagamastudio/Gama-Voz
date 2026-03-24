module.exports = [
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/not-found.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/components/atoms/Button.tsx [app-rsc] (ecmascript)");
;
;
;
function NotFound() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gama-dark text-gama-text flex flex-col items-center justify-center px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-6xl font-black mb-4 text-gama-primary",
                children: "404"
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/not-found.tsx",
                lineNumber: 7,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xl text-gama-text-secondary mb-8 max-w-2xl text-center",
                children: "Página não encontrada. Verifique a URL e tente novamente."
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/not-found.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$src$2f$components$2f$atoms$2f$Button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "primary",
                    size: "lg",
                    children: "Voltar ao home"
                }, void 0, false, {
                    fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/not-found.tsx",
                    lineNumber: 12,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/not-found.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/src/app/not-found.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js <module evaluation>"));
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-rsc] (client reference proxy)", ((__turbopack_context__, module, exports) => {

// This file is generated by next-core EcmascriptClientReferenceModule.
const { createClientModuleProxy } = __turbopack_context__.r("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
__turbopack_context__.n(createClientModuleProxy("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js"));
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$O_GRANDE_PROJETO$2f$GAMA_DESIGN_SYSTEM$2f$gama$2d$ds$2d$platform$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return _link.useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-rsc] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-rsc] (ecmascript)");
const _link = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/O_GRANDE_PROJETO/GAMA_DESIGN_SYSTEM/gama-ds-platform/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)"));
function LinkComponent(props) {
    const isLegacyBehavior = props.legacyBehavior;
    const childIsHostComponent = typeof props.children === 'string' || typeof props.children === 'number' || typeof props.children?.type === 'string';
    const childIsClientComponent = props.children?.type?.$$typeof === Symbol.for('react.client.reference');
    if (isLegacyBehavior && !childIsHostComponent && !childIsClientComponent) {
        if (props.children?.type?.$$typeof === Symbol.for('react.lazy')) {
            console.error(`Using a Lazy Component as a direct child of \`<Link legacyBehavior>\` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's \`<a>\` tag.`);
        } else {
            console.error(`Using a Server Component as a direct child of \`<Link legacyBehavior>\` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's \`<a>\` tag.`);
        }
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_link.default, {
        ...props
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.react-server.js.map
}),
];

//# sourceMappingURL=Desktop_O_GRANDE_PROJETO_GAMA_DESIGN_SYSTEM_gama-ds-platform_56f313f7._.js.map