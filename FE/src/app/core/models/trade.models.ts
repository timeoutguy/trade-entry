import { todayInputValue } from '../../shared/utils/date.utils';

export const TRADERS = ['Maxime Florentin', 'Sidoine Pate'] as const;
export const TRADE_LOCATIONS = ['France', 'Switzerland'] as const;
export const DIRECTIONS = ['Buy', 'Sell'] as const;
export const DELIVERY_UNITS = ['T', 'm3'] as const;
export const TOLERANCE_OPTIONS = ['Buyer', 'Seller'] as const;
export const PREMIUM_CURRENCIES = ['USD', 'EUR'] as const;
export const MODES_OF_TRANSPORT = ['Truck', 'Truck/Barge', 'Barge', 'ISO Tank'] as const;

export type Trader = (typeof TRADERS)[number];
export type TradeLocation = (typeof TRADE_LOCATIONS)[number];
export type Direction = (typeof DIRECTIONS)[number];
export type DeliveryUnit = (typeof DELIVERY_UNITS)[number];
export type ToleranceOption = (typeof TOLERANCE_OPTIONS)[number];
export type PremiumCurrency = (typeof PREMIUM_CURRENCIES)[number];
export type ModeOfTransport = (typeof MODES_OF_TRANSPORT)[number];
export type QuantityMode = 'total' | 'perMonth';

export interface TradeFormValue {
  tradeDate: string;
  contractRef: string;
  trader: Trader | '';
  tradeLocation: TradeLocation | '';
  tenorStart: string;
  tenorEnd: string;
  client: string;
  direction: Direction | '';
  quantityMode: QuantityMode;
  quantity: number | null;
  deliveryUnit: DeliveryUnit | '';
  quality: string;
  tolerance: string;
  toleranceOption: ToleranceOption | '';
  incoterm: string;
  incotermLocations: string[];
  index: string;
  price: number | null;
  premiumCurrency: PremiumCurrency | '';
  paymentType: string;
  paymentDays: number | null;
  paymentTrigger: string;
  modeOfTransport: ModeOfTransport | '';
  broker: string;
  specs: string;
  comment: string;
}

export interface MonthlyCommitment extends TradeFormValue {
  legNumber: string;
  commitmentMonth: string;
  monthIndex: number;
}

export interface SubmitResult {
  success: boolean;
  message: string;
}

export function createDefaultTradeFormValue(): TradeFormValue {
  return {
    tradeDate: todayInputValue(),
    contractRef: '',
    trader: '',
    tradeLocation: '',
    tenorStart: '',
    tenorEnd: '',
    client: '',
    direction: '',
    quantityMode: 'total',
    quantity: null,
    deliveryUnit: '',
    quality: '',
    tolerance: '',
    toleranceOption: '',
    incoterm: '',
    incotermLocations: [],
    index: '',
    price: null,
    premiumCurrency: '',
    paymentType: '',
    paymentDays: null,
    paymentTrigger: '',
    modeOfTransport: '',
    broker: '',
    specs: '',
    comment: '',
  };
}
