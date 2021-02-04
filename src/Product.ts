import * as t from "./my-own-validation";

export const ProductCodec = t.object({
    id: t.string,
    name: t.string,
    type: t.string,
    manufacturer: t.string,
    price: t.number
});

export type Product = ReturnType<typeof ProductCodec>