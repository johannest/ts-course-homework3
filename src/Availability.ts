import * as t from "./my-own-validation";

export const AvailabilityCodec = t.object({
    id: t.string,
    DATAPAYLOAD: t.string
})

export type Availability = ReturnType<typeof AvailabilityCodec>