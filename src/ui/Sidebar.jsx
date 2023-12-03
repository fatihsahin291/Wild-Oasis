import styled from "styled-components";

import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);

	grid-row: 1 / -1;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<MainNav />
		</StyledSidebar>
	);
}

export default Sidebar;

/*
curl "https://nwqjkultgmottyyzqfoh.supabase.co/rest/v1/cabins?select=*" ^
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cWprdWx0Z21vdHR5eXpxZm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MjgxMjAsImV4cCI6MjAxNzEwNDEyMH0.bYp0uwvZBm493WjWxDkKln8CFnGlVLyXRc2kY7zPNPo" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53cWprdWx0Z21vdHR5eXpxZm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE1MjgxMjAsImV4cCI6MjAxNzEwNDEyMH0.bYp0uwvZBm493WjWxDkKln8CFnGlVLyXRc2kY7zPNPo"
*/
