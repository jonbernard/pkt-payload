import omit from 'lodash/omit';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET!);

export const getPriceId = (product: Stripe.Product) => {
  return typeof product.default_price !== 'string' &&
    product.default_price &&
    'id' in product.default_price
    ? product.default_price.id
    : product.default_price || '';
};

export const createPaymentLink = async (
  productParams: (Stripe.ProductCreateParams & { price: Stripe.PriceCreateParams })[],
  redirectUrl: string,
  linkParams: Partial<Stripe.PaymentLinkCreateParams> = {},
) => {
  const productPromises = productParams.map(async (product) => ({
    product,
    stripeProduct: await stripe.products.create(omit(product, 'price')),
  }));
  const products = await Promise.all(productPromises);

  const pricesPromises = products.map(
    async ({ product, stripeProduct }) =>
      await stripe.prices.create({
        ...product.price,
        product: stripeProduct.id,
      }),
  );
  const prices = await Promise.all(pricesPromises);

  const payload: Stripe.PaymentLinkCreateParams = {
    ...linkParams,
    line_items: prices.map((price) => ({
      price: price.id || '',
      quantity: 1,
    })),
    after_completion: {
      redirect: {
        url: redirectUrl,
      },
      type: 'redirect',
    },
    metadata: {
      NODE_ENV: process.env.NODE_ENV,
    },
  };

  const paymentLink: Stripe.PaymentLink = await stripe.paymentLinks.create(payload);

  return { paymentLink, products };
};

export const updatePaymentLink = async (id: string, params: Stripe.PaymentLinkUpdateParams) => {
  const paymentLink: Stripe.PaymentLink = await stripe.paymentLinks.update(id, params);

  return paymentLink;
};
