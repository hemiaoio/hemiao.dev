/// <reference types="vite/client" />

/*
 * 这里只放 Vite 客户端环境的类型引用。
 *
 * 两点刻意不写：
 * 1. 不声明 `declare module '*.vue'` —— 通配声明会把所有 SFC 降级成无 props 类型的
 *    DefineComponent，遮蔽 vue-tsc 对 .vue 的真实类型解析。
 * 2. 不做 `declare module 'vue'` 增强 —— 本文件没有顶层 import/export，属全局脚本，
 *    其中的 declare module 会**替换**整个 vue 模块而不是增强它，导致 vue 的导出全部消失。
 *    若将来确实需要全局组件类型，请单独建一个带 `export {}` 的 .d.ts。
 */
