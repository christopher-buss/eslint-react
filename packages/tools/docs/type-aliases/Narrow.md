[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / Narrow

# Type alias: Narrow\<TType\>

> **Narrow**\<`TType`\>: `{ [K in keyof TType]: Narrow<TType[K]> }` \| `TType` *extends* [] ? [] : `never` \| `TType` *extends* `Function` ? `TType` : `never` \| `TType` *extends* `bigint` \| `boolean` \| `number` \| `string` ? `TType` : `never`

Infers embedded primitive type of any type

## Since

0.0.1

## Param

Type to infer

## Example

```ts
type Result = Narrow<['foo', 'bar', 1]>
```

## See

https://twitter.com/hd_nvim/status/1578567206190780417

## Type parameters

• **TType**
