import { timezoneOptions } from 'shared/lib/timezones';
import { isString } from 'shared/lib/type-guards';
import { centsToDollars } from 'shared/lib/format';

export const capitalizeFirstLetter = (value: string): string => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const formatPrice = (price: number | string, currency = 'USD'): string => {
  if (isString(price)) {
    price = Number(price);
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  return formatter.format(centsToDollars(price));
};

export const formatDecimal = (value: string | number) => {
  if (isString(value)) {
    value = Number(value);
  }

  return new Intl.NumberFormat('en-US').format(value);
};

export const formatPhone = (phone: string): string | null => {
  if (!phone) {
    return null;
  }

  return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
};

export const phoneToString = (phone = ''): string => {
  if (!phone) {
    return '';
  }

  return phone.replace(/\D+/g, '');
};

export const formatDate = (date: string | null): string | null => {
  if (!date) {
    return null;
  }

  const dateArray = date.split(' ')[0].split('-');

  return `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
};

export const formatBids = (
  bid: number | null,
  bidTiers: { id: number; bid: number }[] | null,
  separator = ' / '
): string => {
  if (bid) {
    return `${formatPrice(bid)}`;
  }

  return bidTiers?.map((bidTier) => `${formatPrice(bidTier.bid)}`).join(separator) || '';
};

export function getValueFromString(value: string) {
  return Number(value.replace(/\D/g, ''));
}

export function getTrimmedPhone(phone: string) {
  if (!phone) {
    return '';
  }

  return phone.replace(/\(|\)/g, '').replace(/\D/g, '');
}

export const getTimezoneName = (timezoneId: string) => {
  return timezoneOptions.find((timezone) => timezone.id === timezoneId)?.text;
};
