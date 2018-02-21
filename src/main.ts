
declare const require : (module: string) => any
const acorn = require('acorn/dist/acorn.js')

import Scope from './scope'
import { Var } from './scope'
import evaluate from './eval'

const options = {
    ecmaVersion: 5,
    sourceType: 'script',
    locations: true,
}

declare const Promise: any

// 导出默认对象
const default_api: { [key: string]: any } = {
    console,

    setTimeout,
    setInterval,

    clearTimeout,
    clearInterval,

    encodeURI,
    encodeURIComponent,
    decodeURI,
    decodeURIComponent,
    escape,
    unescape,

    Infinity,
    NaN,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    Object,
    Boolean,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    Number,
    Math,
    Date,
    String,
    RegExp,
    Array,
    JSON,
    Promise
}

const export_wapper = {
    interpreter(code: string, append_api: { [key: string]: any } = {}) {
        const scope = new Scope('block')
        scope.$const('this', this)

        for (const name of Object.getOwnPropertyNames(default_api)) {
            scope.$const(name, default_api[name])
        }

        for (const name of Object.getOwnPropertyNames( append_api)) {
            scope.$const(name, append_api[name])
        }

        evaluate(acorn.parse(code, options), scope)
        const module_var = scope.$find('module')
        return module_var ? module_var.$get() : null
    }
}

export default (export_wapper.interpreter)