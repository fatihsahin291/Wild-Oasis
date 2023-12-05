import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } =
		cabinToEdit;
	const isEditSession = !!editId;

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: isEditSession
			? editValues
			: {},
	});

	const { isCreating, createCabin } =
		useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();

	const isWorking = isCreating || isEditing;

	function onSubmit(data = {}) {
		let image = null;

		if (typeof data?.image === "string") {
			image = data.image;
		} else if (data?.image) {
			image = data.image[0];
		}

		if (isEditSession) {
			return editCabin(
				{
					newCabinData: {
						...data,
						image: image,
					},
					id: editId,
				},
				{
					onSuccess: () => {
						reset();
					},
				}
			);
		} else
			return createCabin(
				{
					...data,
					image: image,
				},
				{
					onSuccess: () => {
						reset();
					},
				}
			);
	}

	function onError(errors) {
		// console.log(errors);
		return errors;
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
		>
			<FormRow
				label="Cabin name"
				error={errors?.name?.message}
			>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "Cabin name is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required:
							"Maximum capacity is required",
						min: {
							value: 1,
							message: "Minimum capacity is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", {
						required: "Regular price is required",
						min: {
							value: 1,
							message: "Minimum price is 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Discount"
				error={errors?.discount?.message}
			>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					{...register("discount", {
						required: "Discount is required",
						validate: (value) => {
							const regularPrice = getValues(
								"regularPrice"
							);
							if (
								regularPrice &&
								value >= +regularPrice
							) {
								return "Discount must be lower than regular price";
							}
							return true;
						},
					})}
					defaultValue={0}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Cabin photo"
				error={errors?.image?.message}
			>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession
						? "Edit Cabin"
						: "Create New Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
