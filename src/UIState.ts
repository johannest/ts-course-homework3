import * as t from 'io-ts';

const UIStateCodec = t.type({
    currentPage: t.number,
    currentCategory: t.string
}, "UIState")

export type UIState = t.TypeOf<typeof UIStateCodec>