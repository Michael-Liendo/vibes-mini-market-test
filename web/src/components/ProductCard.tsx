import Image from "next/image";
import Link from "next/link";
import type { IProduct } from "@vibes/shared";

interface ProductCardProps {
	product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-lg hover:shadow-xl flex flex-col">
			<div className="relative w-full h-52">
				<Image
					src={
						product.image ??
						"https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
					}
					alt={product.name}
					fill
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="p-4 flex flex-col justify-between flex-grow">
				<div>
					<h2
						className="font-semibold text-gray-900 truncate"
						title={product.name}
					>
						{product.name}
					</h2>

					<div className="flex items-center justify-between mt-2">
						<strong className="text-xs font-bold text-gray-900">
							${product.price.toFixed(2)}
						</strong>
						<p
							className={`text-sm mt-2 px-2 rounded w-fit text-white  ${
								product.is_available ? "bg-green-600" : "bg-gray-400"
							}`}
						>
							{product.is_available ? "Disponible" : "Agotado"}
						</p>
					</div>
				</div>
				<div>
					{product.is_available ? (
						<Link
							href={`/product/${product._id}`}
							className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
						>
							Ver mas información
						</Link>
					) : null}
				</div>
			</div>
		</div>
	);
}
