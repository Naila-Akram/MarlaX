import type { IconProp } from '@fortawesome/fontawesome-svg-core';

/** A single key spec shown in the feature grid (area, floor, parking…). */
export interface PropertyFeature {
  icon: IconProp;
  label: string;
  value: string;
}

export type PaymentStatus = 'paid' | 'due' | 'upcoming';

/** One milestone row in the payment plan. */
export interface PaymentMilestone {
  label: string;
  amount: string;
  status?: PaymentStatus;
}

/** The person to contact about the property. */
export interface PropertyAgent {
  name: string;
  role?: string;
  phone?: string;
  avatar?: string;
}

/**
 * Everything the detail sheet can render. Only `price`, `name` and `location`
 * are required (they make up the collapsed summary); every richer section is
 * optional and simply omitted when absent.
 */
export interface PropertyDetailData {
  // ─── Summary (visible in the collapsed peek) ──────────────────────────────
  price: string;
  name: string;
  location: string;
  status?: string;

  // ─── Expanded content ─────────────────────────────────────────────────────
  description?: string;
  features?: PropertyFeature[];
  amenities?: string[];
  paymentPlan?: PaymentMilestone[];
  agent?: PropertyAgent;
}
