import styled from "styled-components";
import {
	HiPencil,
	HiSquare2Stack,
	HiTrash,
} from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const { isDeleting, deleteCabin } =
		useDeleteCabin();
	const { createCabin, isCreating } =
		useCreateCabin();

	const {
		id: cabinId,
		name,
		maxCapacity: capacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;

	function handleDuplicate() {
		createCabin({
			...cabin,
			name: `${cabin.name} (copy)`,
			id: cabinId + name,
		});
	}

	return (
		<TableRow role="row">
			<Img src={image} alt={`Cabin ${name}`} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {capacity}</div>
			<Price>
				{formatCurrency(regularPrice)}
			</Price>
			{discount ? (
				<Discount>
					{formatCurrency(discount)}
				</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<button
					onClick={() => handleDuplicate()}
					disabled={isCreating}
				>
					<HiSquare2Stack />
				</button>

				<Modal>
					<Modal.Open opens="edit">
						<button>
							<HiPencil />
						</button>
					</Modal.Open>

					<Modal.Window name="edit">
						<CreateCabinForm
							cabinToEdit={cabin}
						/>
					</Modal.Window>

					<Modal.Open opens="delete">
						<button>
							<HiTrash />
						</button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName="cabins"
							disabled={isDeleting}
							onConfirm={() =>
								deleteCabin(cabinId)
							}
						/>
					</Modal.Window>
				</Modal>
			</div>
		</TableRow>
	);
}

export default CabinRow;
