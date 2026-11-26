import {describe,it,expect} from 'vitest';
import {categories,products} from './content';
describe('katalog',()=>{it('örnek ürünler benzersiz ve açıkça işaretli',()=>{expect(new Set(products.map(p=>p.slug)).size).toBe(products.length);expect(products.every(p=>p.isSample)).toBe(true)});it('dört ürün grubu içerir',()=>{expect(categories).toHaveLength(4)})});
