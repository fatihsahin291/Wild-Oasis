import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxNumberOfGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();
	const { updateSetting, isUpdating } =
		useUpdateSetting();

	if (isLoading) {
		return <Spinner />;
	}

	function handleUpdate(event, field) {
		const value = event.target.value;

		if (!value) return;

		updateSetting({ [field]: value });
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(event) => {
						handleUpdate(
							event,
							"minBookingLength"
						);
					}}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(event) => {
						handleUpdate(
							event,
							"maxBookingLength"
						);
					}}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={
						maxNumberOfGuestsPerBooking
					}
					disabled={isUpdating}
					onBlur={(event) => {
						handleUpdate(
							event,
							"maxNumberOfGuestsPerBooking"
						);
					}}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(event) => {
						handleUpdate(event, "breakfastPrice");
					}}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
