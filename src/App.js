import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarComponent from './components/CalendarComponent';

const Header = styled.header`
	height: 6vh;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28px;
	font-weight: 700;
	padding: 5px;
	background: grey;
	@media (max-width: 700px) {
		font-size: 18px;
	}
`;

const BottomNav = styled.div`
	height: 6vh;
	width: 100%;
`;

const Month = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

function App() {
	const [currentMonth, setCurrentMonth] = useState(0);
	const [currentYear, setCurrentYear] = useState(0);

	return (
		<div>
			<Header>
				My Hair Diary
				<span>{`${Month[currentMonth]} ${currentYear}`}</span>
			</Header>
			<CalendarComponent
				currentMonth={currentMonth}
				setCurrentMonth={setCurrentMonth}
				setCurrentYear={setCurrentYear}
			/>
			<BottomNav>Nav</BottomNav>
		</div>
	);
}

export default App;
