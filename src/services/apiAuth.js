import supabase, {
	supabaseUrl,
} from "./supabase";

export async function signup({
	fullName,
	email,
	password,
}) {
	const { data, error } =
		await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name: fullName,
					avatar: "",
				},
			},
		});

	if (error) throw new Error(error.message);

	return data;
}

export async function login({ email, password }) {
	const { data, error } =
		await supabase.auth.signInWithPassword({
			email,
			password,
		});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	const { data: session } =
		await supabase.auth.getSession();

	if (!session) return null;

	const { data, error } =
		await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
	password,
	fullName,
	avatar,
}) {
	// Update password OR full name
	let UpdateData = {};

	if (password) UpdateData = { password };

	if (fullName)
		UpdateData = {
			data: { full_name: fullName },
		};

	const { data, error } =
		await supabase.auth.updateUser(UpdateData);

	if (error) throw new Error(error.message);

	if (!avatar) return data;

	// Uploading avatar
	const fileName = `avatar-${
		data.user.id
	}-${Math.random()}`;

	const { error: storageError } =
		await supabase.storage
			.from("avatars")
			.upload(fileName, avatar);

	if (storageError)
		throw new Error(storageError.message);

	// Update user
	const { data: updatedUser, error: error2 } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		});

	if (error2) throw new Error(error2.message);

	console.log(updatedUser);

	return updatedUser;
}
