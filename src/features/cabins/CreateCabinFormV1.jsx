import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createCabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm();

	const { mutate, isLoading: isCreating } =
		useMutation({
			mutationFn: createCabin,
			onSuccess: () => {
				toast.success("Cabin created");
				queryClient.invalidateQueries({
					queryKey: ["cabins"],
				});
				reset();
			},
			onError: (err) => {
				toast.error(err.message);
			},
		});

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
						required: "This field is required",
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
				<Button disabled={isCreating}>
					Add cabin
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
