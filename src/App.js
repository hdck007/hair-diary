import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarComponent from './components/CalendarComponent';
import { MdAdd } from 'react-icons/md';
import HeaderComponent from './components/HeaderComponent';
import BottomNavComponent from './components/BottomNavComponent';

const FloatButton = styled.button`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	text-align: center;
	position: absolute;
	bottom: 80px;
	right: 20px;
	border: none;
	background: #66d8fd;
	font-size: 40px;
	display: flex;
	align-items: center;
	color: white !important;
`;

function App() {
	const [currentMonth, setCurrentMonth] = useState(0);
	const [currentYear, setCurrentYear] = useState(0);

	return (
		<div>
			<HeaderComponent currentMonth={currentMonth} currentYear={currentYear} />
			<CalendarComponent
				currentMonth={currentMonth}
				setCurrentMonth={setCurrentMonth}
				setCurrentYear={setCurrentYear}
			/>
			<BottomNavComponent />
			<FloatButton>
				<MdAdd />
			</FloatButton>
		</div>
	);
}

export default App;
