import supabase, {
	supabaseUrl,
} from "./supabase";

export async function getCabins() {
	let { data, error } = await supabase
		.from("cabins")
		.select("*")
		.order("created_at", { ascending: true });

	if (error) {
		console.error(error);

		throw new Error("Error fetching cabins");
	}

	return data;
}

export async function createEditCabin(
	newCabin,
	id
) {
	console.log(newCabin, id);

	const hasImagePath =
		newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${
		newCabin?.image?.name
	}`?.replaceAll(
		"/",
		""
	); /* 0.123123123123123-imagename.jpg */

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/Edit a new cabin
	let query = supabase.from("cabins");

	//A)CREATE
	if (!id)
		query = query.insert([
			{ ...newCabin, image: imagePath },
		]);

	//B)EDIT
	if (id)
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq("id", id);

	const { data, error } = await query
		.select()
		.single();

	if (error) {
		console.error(error);

		throw new Error("Error creating cabin");
	}

	// 2.Upload the image to Supabase Storage
	if (hasImagePath) return data;

	const { error: storageError } =
		await supabase.storage
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
