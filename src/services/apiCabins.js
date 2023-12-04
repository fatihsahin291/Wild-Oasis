import supabase, {
	supabaseUrl,
} from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase
		.from("cabins")
		.select("*");

	if (error) {
		console.error(error);

		throw new Error("Error fetching cabins");
	}

	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${
		newCabin.image.name
	}`.replaceAll(
		"/",
		""
	); /* 0.123123123123123-imagename.jpg */

	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// https://nwqjkultgmottyyzqfoh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	// 1. Create a new cabin
	const { error: storageError } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (storageError) {
		console.error(error);

		throw new Error("Error creating cabin");
	}

	// 2.Upload the image to Supabase Storageconst { data, error } = await supabase
	const { data, error } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3.Delete the cabin if the image upload fails
	if (storageError) {
		console.error(storageError);

		await supabase
			.from("cabins")
			.delete()
			.eq("id", data.id);

		console.log(storageError);
		throw new Error(
			"Error uploading image / deleting cabin"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);

		throw new Error("Error deleting cabin");
	}
}
