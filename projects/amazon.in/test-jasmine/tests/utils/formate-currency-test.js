import { formatePrice } from '../../../scripts/utils/priceUtils.js';

describe('Test suite: formatePrice for integers', () => {
    it('Converts cents into dollers', () => {
        expect(formatePrice(2095)).toBe('20.95');
    });

    it('Converts cents into dollers for zero', () => {
        expect(formatePrice(0)).toBe('0.00');
    });

    it('Converts cents into dollers for decimal number', () => {
        expect(formatePrice(2000.5)).toBe('20.01');
    });
});

