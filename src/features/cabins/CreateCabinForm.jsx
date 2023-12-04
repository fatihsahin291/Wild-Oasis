import {
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { createCabin } from "../../services/apiCabins";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

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
