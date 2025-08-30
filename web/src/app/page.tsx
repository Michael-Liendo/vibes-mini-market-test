"use client";

import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import Services from "@/services";
import { useQuery } from "@tanstack/react-query";
import type {
	IPaginationResponse,
	IProduct,
	IProductQuery,
} from "@vibes/shared";
import { useEffect, useState } from "react";

export default function Home() {
	const [search, setSearch] = useState<IProductQuery>({});
	const [pagination, setPagination] = useState({ page: 1, limit: 10 });
	const [serverPagination, setServerPagination] =
		useState<IPaginationResponse>();
	const [allProducts, setAllProducts] = useState<IProduct[]>([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearch((prev) => ({ ...prev, search: inputValue || undefined }));
			setPagination((p) => ({ ...p, page: 1 }));
		}, 500);
		return () => clearTimeout(timer);
	}, [inputValue]);

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value, type } = e.target;

		if (name === "sort") {
			const [sort, order] = value.split(":");
			setSearch((prev) => ({
				...prev,
				sort: sort || undefined,
				order: (order as "asc" | "desc") || undefined,
			}));
		} else {
			const isCheckbox = type === "checkbox";
			const checked = isCheckbox
				? (e.target as HTMLInputElement).checked
				: undefined;
			setSearch((prev) => ({
				...prev,
				[name]: isCheckbox ? (checked ? true : undefined) : value || undefined,
			}));
		}
		setPagination((p) => ({ ...p, page: 1 }));
	};

	const {
		data: productsData,
		isLoading,
		isError,
		error,
		isFetching,
	} = useQuery({
		queryKey: ["products", pagination, search],
		queryFn: async () => {
			const products = await Services.product.findAll(search, pagination);
			setServerPagination(products.pagination);
			return products.data;
		},
	});

	useEffect(() => {
		if (productsData) {
			setAllProducts((prev) =>
				pagination.page === 1 ? productsData : [...prev, ...productsData],
			);
		}
	}, [productsData, pagination.page]);

	return (
		<main className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Vibes mini Market</h1>

			<div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
				<input
					type="text"
					placeholder="Buscar productos..."
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				<select
					name="sort"
					onChange={handleFilterChange}
					className="border rounded-lg px-4 py-2.5 w-full sm:w-auto"
				>
					<option value="">Ordenar por</option>
					<option value="price:asc">Precio: Menor a Mayor</option>
					<option value="price:desc">Precio: Mayor a Menor</option>
					<option value="name:asc">Nombre: A-Z</option>
					<option value="name:desc">Nombre: Z-A</option>
				</select>
				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						name="available"
						onChange={handleFilterChange}
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
					Disponibles
				</label>
			</div>

			{isLoading && pagination.page === 1 && (
				<p className="text-center text-lg">Cargando...</p>
			)}
			{isError && (
				<p className="text-center text-red-500">
					Error: {error instanceof Error ? error.message : "Error desconocido"}
				</p>
			)}

			{allProducts.length > 0 && (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{allProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>

					{serverPagination &&
						serverPagination.total_pages > pagination.page && (
							<div className="flex justify-center mt-8">
								<Button
									onClick={() =>
										setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
									}
									disabled={isFetching}
								>
									{isFetching ? "Cargando..." : "Cargar más"}
								</Button>
							</div>
						)}
				</>
			)}
		</main>
	);
}
