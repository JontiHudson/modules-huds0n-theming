"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeWrapper = exports.useIsDarkMode = exports.createTheme = exports.isDarkMode = exports.theme = exports.darkColorScheme = exports.lightColorScheme = void 0;
const react_native_1 = require("react-native");
const utilities_1 = require("@huds0n/utilities");
exports.lightColorScheme = {
    BACKGROUND: '#FFFFFF',
    BADGE: '#E63B2E',
    BLACK: '#000000',
    BORDER: '#262626',
    DISABLED: '#B2B2B2',
    ERROR: '#E63B2E',
    GREY: '#7D7D7D',
    KEYBOARD: '#D2D5D8',
    PRIMARY: '#2980B9',
    SECONDARY: '#B96229',
    SUCCESS: '#84c397',
    TEXT: '#262626',
    TRANSPARENT: '#FFFFFF00',
    WARN: '#EC8213',
    WHITE: '#FFFFFF',
};
exports.darkColorScheme = {
    BACKGROUND: '#000000',
    ERROR: '#ffd700',
    TEXT: '#e5e5e5',
    BORDER: '#e5e5e5',
    KEYBOARD: '#2B2B2B',
    SECONDARY: '#2980B9',
    PRIMARY: '#B96229',
};
const _dimensions = {
    BUTTON_HEIGHT: 40,
    BUTTON_WIDTH: 200,
    INPUT_WIDTH: 400,
};
const _fontSizes = {
    BODY: 20,
    HEADER: 30,
    LABEL: 16,
    NOTE: 12,
    SUBHEADER: 24,
};
const _spacings = {
    HAIRLINE: react_native_1.StyleSheet.hairlineWidth,
    L: 20,
    M: 10,
    NONE: 0,
    S: 5,
    XL: 30,
    XS: 2,
};
exports.theme = {
    colors: isDarkMode()
        ? { ...exports.lightColorScheme, ...exports.darkColorScheme }
        : { ...exports.darkColorScheme, ...exports.lightColorScheme },
    get colorsDark() {
        return { ...exports.lightColorScheme, ...exports.darkColorScheme };
    },
    get colorsLight() {
        return { ...exports.darkColorScheme, ...exports.lightColorScheme };
    },
    dimensions: _dimensions,
    fontSizes: _fontSizes,
    spacings: _spacings,
};
function isDarkMode() {
    return react_native_1.Appearance.getColorScheme() === 'dark';
}
exports.isDarkMode = isDarkMode;
function _updateTheme() {
    isDarkMode()
        ? Object.assign(exports.theme.colors, exports.lightColorScheme, exports.darkColorScheme)
        : Object.assign(exports.theme.colors, exports.darkColorScheme, exports.lightColorScheme);
}
react_native_1.Appearance.addChangeListener(_updateTheme);
function createTheme(customTheme) {
    if (customTheme) {
        customTheme.lightColorScheme &&
            Object.assign(exports.lightColorScheme, customTheme.lightColorScheme);
        customTheme.darkColorScheme &&
            Object.assign(exports.darkColorScheme, customTheme.darkColorScheme);
        customTheme.dimensions &&
            Object.assign(exports.theme.dimensions, customTheme.dimensions);
        customTheme.fontSizes &&
            Object.assign(exports.theme.fontSizes, customTheme.fontSizes);
        customTheme.spacings && Object.assign(exports.theme.spacings, customTheme.spacings);
    }
    _updateTheme();
    return exports.theme;
}
exports.createTheme = createTheme;
function useIsDarkMode() {
    const [isDark, setIsDark] = (0, utilities_1.useState)(() => {
        return isDarkMode();
    });
    (0, utilities_1.useEffect)(() => {
        const listener = () => {
            setIsDark(isDarkMode());
        };
        react_native_1.Appearance.addChangeListener(listener);
        return () => react_native_1.Appearance.removeChangeListener(listener);
    }, [], { layout: 'BEFORE' });
    return isDark;
}
exports.useIsDarkMode = useIsDarkMode;
function ThemeWrapper(props) {
    const isDark = useIsDarkMode();
    return props.children(isDark);
}
exports.ThemeWrapper = ThemeWrapper;
