import * as t from "./my-own-validation";
import {Availability, AvailabilityCodec} from "./Availability";
import {Product} from "./Product"
import {fetchJSON} from "./index"

const availabilityApiUrl = "https://bad-api-assignment.reaktor.com/availability";

type AvailabilityMap = Record<string, Promise<AvailabilityData>>;

// type AvailabilityIndicator = "Out of stock" | "Less than 10" | "In stock";
// type AvailabilityIndicator = "OUTOFSTOCK" | "LESSTHAN10" | "INSTOCK";

const AvailabilityDataCodec = t.object({
    code: t.number,
    response: t.array(AvailabilityCodec)
})

type AvailabilityData = ReturnType<typeof  AvailabilityDataCodec>

export const InStockValueCodec = t.object({
    textContent: t.string
});
export type InStockValue = ReturnType<typeof InStockValueCodec>

const domparser = new DOMParser();

export class AvailabilityRepository {

    cache: AvailabilityMap = {};

    constructor() {
    }

    async fetchAvailability(product: Product): Promise<AvailabilityData> {
        if (!this.cache[product.manufacturer]) {
            this.cache[product.manufacturer] = fetchJSON<AvailabilityData>(`${availabilityApiUrl}/${product.manufacturer}`, AvailabilityDataCodec);
        }
        return this.cache[product.manufacturer]
    }

    async getAvailabilityIndicator(product: Product): Promise<InStockValue> {
        return this.fetchAvailability(product)
        .then((data: AvailabilityData) => {
           return this.findAvailability(data.response, product);
        })
    }

    async findAvailability(availabilities: Availability[], product: Product): Promise<InStockValue> {
        for (let availability of availabilities) {
            if (availability.id.toLowerCase()===product.id) {
                return this.parseFromXmlPayload<InStockValue>(availability.DATAPAYLOAD, InStockValueCodec);
            }
        }
        return this.parseFromXmlPayload<InStockValue>("", t.element(InStockValueCodec));
    }

    parseFromXmlPayload<T>(payload: string, validator: t.Validator<T>): T {
        const doc = domparser.parseFromString(payload, "text/xml");
        return validator(doc.all[1]);
    }
}