import {it, expect, describe} from 'vitest'
import {FormatMoney} from './money'


describe('FormatMoney', () => {
it('formats 1999 cents as $19.99', () => {
    expect(FormatMoney(1999)).toBe('19.99')
})

it('displays two decimal places for whole dollars', () => {
    expect(FormatMoney(1090)).toBe('10.90')
    expect(FormatMoney(100)).toBe('1.00')
})
})

