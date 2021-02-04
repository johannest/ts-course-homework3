import * as t from 'io-ts';

const ProductCodec = t.type({
    id: t.string,
    name: t.string,
    type: t.string,
    manufacturer: t.string,
    price: t.number
}, "Product");

export type Product = t.TypeOf<typeof ProductCodec>