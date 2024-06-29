"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
class validation {
    static validate(schema, data) {
        // memvalidasi data yang dikirim dengan data yang seharusnya (ada di user-validation)
        return schema.parse(data);
    }
}
exports.validation = validation;
