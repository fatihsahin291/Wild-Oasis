import { HiOutlineUser } from "react-icons/hi2";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";

const StyledHeaderMenu = styled.div`
	display: flex;
	gap: 0.4rem;
	list-style: none;
`;

function HeaderMenu() {
	const navigate = useNavigate();

	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon
					onClick={() => navigate("/account")}
				>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
				<Logout />
			</li>
			<li></li>
			<li></li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;
