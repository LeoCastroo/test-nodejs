import Joi from 'joi';

export const productSchema = Joi.object({
    sku: Joi.number().required(),
    name: Joi.string().required(),
    inventory: Joi.object({
        warehouses: Joi.array().items(
            Joi.object({
                locality: Joi.string().required(),
                quantity: Joi.number().required(),
                type: Joi.string().required()
            })
        ).required()
    }).required()
});
