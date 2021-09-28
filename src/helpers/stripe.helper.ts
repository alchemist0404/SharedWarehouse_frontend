import { loadStripe } from '@stripe/stripe-js';
import { env } from '@root/env';

export const stripePromise = loadStripe(env.stripeKey);
