module.exports = {
    root: true,
    defaultSeverity: 'error',
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-order'],
    overrides: [
        {
            files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
            extends: ['stylelint-config-html'],
            rules: {
                // 指定关键帧名称的模式
                'keyframes-name-pattern': null,
                // 禁止未知的伪类选择器
                // 'selector-pseudo-class-no-unknown': [
                // true,
                // {
                //     ignorePseudoClasses: ['global']
                // }
                // ],
                'selector-type-no-unknown': null,
                'selector-pseudo-class-no-unknown': null,
                // 禁止未知的伪元素选择器
                'selector-pseudo-element-no-unknown': [
                    true,
                    {
                        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
                    }
                ]
            }
        },
        {
            files: ['*.scss', '**/*.scss'],
            customSyntax: 'postcss-scss',
            extends: [
                'stylelint-config-standard',
                'stylelint-config-recommended-vue',
                'stylelint-config-prettier'
            ]
        }
    ],
    rules: {
        // 不允许未知函数
        'function-no-unknown': null,
        // 指定类选择器的模式
        'selector-class-pattern': null,
        // 禁止空源码
        'no-empty-source': null,
        // 指定字符串使用单引号
        'string-quotes': 'single',

        // @import 导入采用 stirng 模式
        'import-notation': 'string',

        // 禁止未知的@规则
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen',
                    'function',
                    'if',
                    'each',
                    'include',
                    'mixin'
                ]
            }
        ],
        // 指定@规则名的大小写
        'at-rule-name-case': 'lower',
        // 禁止未知的伪类选择器
        // 'selector-pseudo-class-no-unknown': [
        // true,
        // {
        //     ignorePseudoClasses: ['global']
        // }
        // ],
        'selector-pseudo-class-no-unknown': null,
        // 禁止未知的伪元素选择器
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],
        'order/properties-order': [
            // Positioning 布局方式
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            // Box Model 尺寸
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            // Typographic（文本相关）
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'font-size',
            'font-family',
            'font-weight',
            // Visual（视觉效果）
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition'
        ]
    }
};
