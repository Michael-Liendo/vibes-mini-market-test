import type { IProduct } from '@vibes/shared';

/*
  No entendí mucho la necesidad de esta funcion ya que se puede hacer por la base de datos y
  es mejor hacerlo directamente ahi que en el código ya que si son muchos se puede volverse pesado,lento...
 */
export function getTopCheapestAvailable(
	products: IProduct[],
	top = 3,
): IProduct[] {
	return products
		.filter((p) => p.is_available)
		.sort((a, b) => a.price - b.price)
		.slice(0, top);
}
