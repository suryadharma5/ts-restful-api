import { ZodType } from "zod";

export class validation {
    static validate<T>(schema: ZodType, data: T): T {

        // memvalidasi data yang dikirim dengan data yang seharusnya (ada di user-validation)
        return schema.parse(data)
    }
}