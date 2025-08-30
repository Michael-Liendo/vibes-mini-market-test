'use client';

import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Services from '@/services';

export default function ProductDetailPage() {
	const params = useParams();
	const id = params.id as string;

	const {
		data: product,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['product', id],
		queryFn: () => Services.product.findById(id),
		enabled: !!id,
	});

	if (isLoading) {
		return <div className='text-center p-10'>Cargando producto...</div>;
	}

	if (isError || !product) {
		return (
			<div className='text-center p-10'>
				<h2 className='text-2xl font-bold mb-4'>Producto no encontrado</h2>
				<p className='text-gray-600 mb-6'>
					No pudimos encontrar el producto que buscas.
				</p>
				<Link
					href='/'
					className='bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors'
				>
					Volver a la tienda
				</Link>
			</div>
		);
	}

	return (
		<main className='container mx-auto p-8'>
			<div className='mb-6'>
				<Link href='/' className='text-blue-600 hover:underline'>
					&larr; Volver a la tienda
				</Link>
			</div>
			<div className='grid md:grid-cols-2 gap-12'>
				<div className='relative w-full h-96  rounded-lg'>
					<Image
						src={
							product.image ??
							'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
						}
						alt={product.name}
						fill
						className='object-contain rounded-lg h-96'
					/>
				</div>
				<div className='flex flex-col justify-center'>
					<p className='text-gray-500 text-sm mb-2 capitalize'>
						{product.category}
					</p>
					<h1 className='text-xl font-bold mb-4'>{product.name}</h1>
					<p className='text-lg font-extrabold text-gray-900 mb-6'>
						${product.price.toFixed(2)}
					</p>
					<p
						className={`text-sm mt-2 px-2 rounded w-fit text-white ${
							product.is_available ? 'bg-green-600' : 'bg-gray-400'
						}`}
					>
						{product.is_available ? 'Disponible' : 'Agotado'}
					</p>
					{product.is_available && (
						<button
							type='button'
							className='w-full mt-3 max-w-sm flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors'
						>
							<ShoppingCart className='mr-2 h-5 w-5' />
							Añadir a favoritos
						</button>
					)}
				</div>
			</div>
		</main>
	);
}
