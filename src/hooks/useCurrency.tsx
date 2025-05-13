import { useState, useEffect } from 'react';

interface UseCurrencyConfig {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const useCurrency = (initialValue: number, config: UseCurrencyConfig = {}) => {
  const [value, setValue] = useState(initialValue);
  const [formattedValue, setFormattedValue] = useState('');

  const { locale = 'zh-CN', currency = 'CNY', minimumFractionDigits = 2, maximumFractionDigits = 2 } = config;

  useEffect(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    });
    setFormattedValue(formatter.format(value));
  }, [value, locale, currency, minimumFractionDigits, maximumFractionDigits]);

  return {
    value,
    formattedValue,
    setValue,
  };
};

export default useCurrency;