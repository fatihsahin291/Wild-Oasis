import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Create cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>

				<Modal.Open opens="table">
					<Button>Show table</Button>
				</Modal.Open>
				<Modal.Window name="table">
					<CabinTable />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
// 	const [isOpenModal, setIsOpenModal] =
// 		useState(false);

// 	return (
// 		<div>
// 			<Button
// 				onClick={() =>
// 					setIsOpenModal((show) => !show)
// 				}
// 			>
// 				Create cabin
// 			</Button>
// 			{isOpenModal && (
// 				<Modal
// 					onClose={() => setIsOpenModal(false)}
// 				>
// 					<CreateCabinForm
// 						onCloseModal={() =>
// 							setIsOpenModal(false)
// 						}
// 					/>
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }

export default AddCabin;
