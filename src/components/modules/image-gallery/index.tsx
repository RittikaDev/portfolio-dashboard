"use client";

import Image from "next/image";

interface IProps {
	images: string[]; // Array of image URLs
}

const ImageGallery = ({ images }: IProps) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-8 max-w-full">
			{images.map((image, idx) => (
				<div
					key={"images" + idx}
					className="group relative w-full h-full rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
				>
					<Image
						src={image}
						alt={`Image ${idx + 1}`}
						width={500}
						height={500}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:opacity-80"
					/>
					<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
					<div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<span className="text-white text-2xl">🔍</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ImageGallery;
