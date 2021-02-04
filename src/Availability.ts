import * as t from 'io-ts';

export const AvailabilityCodec = t.type({
    id: t.string,
    DATAPAYLOAD: t.string
}, "Availability")

export type Availability = t.TypeOf<typeof AvailabilityCodec>