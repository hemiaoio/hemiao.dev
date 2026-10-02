import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: [
      // 构建产物。注意 eslint 会遍历点开头的目录，
      // 所以这里的临时/遗留产物目录必须逐一列出，不能指望默认忽略。
      '**/dist/**',
      '**/dist-ssr/**',
      '**/.dist-stale/**',
      '**/.vite-ssg-temp/**',
      '**/.vite/**',
      '**/coverage/**',
      '**/node_modules/**',
      // 代理工具的工作目录，不属于项目源码
      '**/.workbuddy/**',
      '**/.claude/**',
      '**/.agents/**',
    ],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    name: 'app/rules',
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    name: 'app/contents-must-stay-headless',
    files: ['src/contents/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['naive-ui', '@vicons/*', 'vue', '*.vue'],
              message: '内容层必须是无头纯 TS：不得依赖框架或 UI 库（对齐种子 logic/ 约定）',
            },
          ],
        },
      ],
    },
  },
]
