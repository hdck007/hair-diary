import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai';
import EventWrapper from './EventWarpper';

const WeekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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
const CellWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 0.5px solid black;
	text-align: center;
	font-size: 12px;
	position: relative;
`;

const ScrollDetails = styled.span`
	background: white;
	position: absolute;
	top: 1px;
`;

const HeaderCell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.5px solid blue;
`;

const ElementWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 80%;
	width: 100%;
	overflow: hidden;
	// background: red;
`;

const ImageWrapper = styled.img`
	width: 40%;
	height: 70%;
	@media (max-width: 1100px) {
		width: 80%;
	}
	@media (max-width: 700px) {
		width: 100% !important;
	}
`;

const EventContainer = styled.div`
	display: flex;
`;

const RatingWrapper = styled.div`
	font-size: 12px;
	@media (max-width: 700px) {
		font-size: 8px;
	}
`;

export default function Cell({
	columnIndex,
	rowIndex,
	style,
	data,
	isScrolling,
}) {
	const {
		setIsOpen,
		setCurrentYear,
		setCurrentMonth,
		currentMonth,
		posts,
		dateArray,
		setCurrentModalIndex,
	} = data;
	const [display, setDisplay] = useState(false);
	const [imgIndex, setImgIndex] = useState(null);

	useEffect(() => {
		const now = new Date(0);
		now.setDate(now.getDate() + (rowIndex - 1) * 7 + columnIndex + 3);
		if (now.getMonth() === 0) {
			setCurrentMonth(11);
			setCurrentYear(now.getFullYear() - 1);
		} else {
			setCurrentMonth(now.getMonth() - 1);
			setCurrentYear(now.getFullYear());
		}

		// eslint-disable-next-line array-callback-return
		let filteredArray = dateArray.filter((date, index) => {
			if (
				now.getDate() === date.getDate() &&
				now.getMonth() === date.getMonth() &&
				now.getFullYear() === date.getFullYear()
			) {
				setImgIndex(index);
				return true;
			}
		});

		if (filteredArray.length) {
			setDisplay(Boolean(filteredArray.length));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMonth]);

	function handleClick(e) {
		setCurrentModalIndex(imgIndex);
		setIsOpen((prev) => !prev);
	}
	const now = new Date(0);
	now.setDate(now.getDate() + (rowIndex - 1) * 7 + columnIndex + 3);
	return (
		<>
			{rowIndex === 0 ? (
				<HeaderCell
					style={{
						...style,
						height: style.height,
					}}
				>
					{WeekDays[columnIndex]}
				</HeaderCell>
			) : (
				<CellWrapper
					style={{
						...style,
						backgroundColor:
							columnIndex === 0 ? 'rgba(0,0,0, 0.1)' : 'transparent',
						fontWeight: now.getMonth() === currentMonth ? 900 : 400,
					}}
				>
					{now.getDate() !== 1 ? (
						now.getDate()
					) : isScrolling ? (
						<>
							<ScrollDetails>
								{Month[now.getMonth()]} {now.getFullYear()}
							</ScrollDetails>
							{now.getDate()}
						</>
					) : (
						now.getDate()
					)}
					{display && imgIndex !== null && (
						<ElementWrapper onClick={handleClick}>
							<RatingWrapper>
								{[...new Array(5)].map((elm, index) => {
									if (index < posts[imgIndex].rating) {
										return <AiFillStar color={'#9DD0EB'} />;
									} else {
										return <AiFillStar color={'#D2D4D8'} />;
									}
								})}
							</RatingWrapper>
							<ImageWrapper src={posts[imgIndex].media[0].mediaurl} />
							<EventContainer>
								{posts[imgIndex].typeofday.map((element) => (
									<EventWrapper event={element} />
								))}
							</EventContainer>
						</ElementWrapper>
					)}
				</CellWrapper>
			)}
		</>
	);
}
