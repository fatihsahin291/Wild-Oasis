import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
	/* background-color: orangered; */
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Row>
					<Row type="horizontal">
						<Heading type="h1">
							The Wild Oasis
						</Heading>
						<div>
							<Heading type="h2" as="h2">
								Check in and Check out
							</Heading>
							<Button
								onClick={() => alert("Check In")}
							>
								Check in
							</Button>
							<Button
								variation="danger"
								size="large"
								onClick={() => alert("Check Out")}
							>
								Check Out
							</Button>
						</div>
					</Row>

					<Row>
						<Heading type="h3" as="h3">
							Form
						</Heading>
						<form>
							<Input
								type="number"
								placeholder="Number of Guests"
							/>
							<Input
								type="number"
								placeholder="Number of Guests"
							/>
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
