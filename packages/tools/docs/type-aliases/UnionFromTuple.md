[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / UnionFromTuple

# Type alias: UnionFromTuple\<T\>

> **UnionFromTuple**\<`T`\>: `T` *extends* infer U[] ? `U` : `never`

## Since

0.0.1

## Example

```ts
type Result = UnionFromTuple<['foo', 'bar', 1]>
// Result = 'foo' | 'bar' | 1
```

## Type parameters

• **T**

The type to get the union from
