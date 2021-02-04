import * as t from "./my-own-validation";

const UIStateCodec = t.object({
    currentPage: t.number,
    currentCategory: t.string
})

export type UIState = ReturnType<typeof UIStateCodec>