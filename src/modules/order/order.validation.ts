import Joi from 'joi';

const OrderValidatoionJoi = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  productId: Joi.string().required(),
  price: Joi.number().required().min(0),
  quantity: Joi.number().required().min(1),
});

export default OrderValidatoionJoi;
