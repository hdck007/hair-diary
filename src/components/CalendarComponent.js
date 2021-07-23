import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FixedSizeGrid as Grid } from 'react-window';
import { useWindowSize } from '../hooks/useWindow';
import InfiniteLoader from 'react-window-infinite-loader';
import { AiFillStar } from 'react-icons/ai';
import EventWrapper from './EventWarpper';
import Modal from 'react-modal';
import { CgCloseO } from 'react-icons/cg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cell from './Cell';

const Seconds = 86400;
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
const MonthsFullForm = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const CalendarWrapper = styled.div`
	width: 100%;
	height: 88vh;
`;

const DatesWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
`;

const CardRatingWrapper = styled.div`
	font-size: 16px;
`;

const RatingWrapper = styled.div`
	font-size: 12px;
	@media (max-width: 700px) {
		font-size: 8px;
	}
`;

const CardWrapper = styled.div`
	width: 95%;
	height: 450px;
	background: white;
	border-radius: 5px;
`;

const CardImageWrapper = styled.img`
	border-radius: 5px 5px 0 0;
	width: 100%;
	height: 63%;
`;

const CardMarginWrapper = styled.div`
	width: 375px;
`;

const DetailsWrapper = styled.div`
	box-sizing: border-box;
	width: 95%;
	margin: auto;
	padding: 5px;
	position: relative;
	// background: red;
`;

const LegendDetails = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const DescripWrapper = styled.div``;

const ViewPostButton = styled.div`
	width: 100%;
	margin: auto;
	padding-top: 3px;
	height: 25px;
	border-top: 1px solid black;
	text-align: center;
	position: absolute;
	bottom: -11px;
	font-size: 20px;
	left: 0;
`;

const customStyles = {
	content: {
		top: 0,
		left: 0,
		right: 'auto',
		bottom: 'auto',
		backgroundColor: 'transparent',
		border: 'none',
		width: '100%',
		height: '100%',
	},
	overlay: {
		backgroundColor: 'rgb(0, 0, 0)',
	},
};

Modal.setAppElement('#root');

export default function CalendarComponent({
	setCurrentYear,
	setCurrentMonth,
	currentMonth,
}) {
	const [width, height] = useWindowSize();
	const gridRef = useRef(null);
	const [posts, setPosts] = useState([]);
	const [dateArray, setDateArray] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [currentModalIndex, setCurrentModalIndex] = useState(0);
	const [initialSlide, setInitialSlide] = useState(0);
	const sliderRef = useRef(null);
	let settings = {
		className: 'center',
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: width > 800 ? 3 : 1,
		speed: 500,
		arrows: width > 800 ? true : false,
		infinite: false,
		focusOnSelect: true,
	};

	const truncate = (input) =>
		input.length > 70 ? `${input.substring(0, 70)}...` : input;

	useEffect(() => {
		fetch('http://devapi.quinn.care/graph', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				requestobjects: [
					{
						posts: {
							operationtype: 'read',
							id: {
								return: true,
							},
							userid: {
								searchvalues: ['41329663-5834-11eb-8e6e-3ca82abc3dd4'],
								return: true,
							},
							iscalendarentry: {
								searchvalues: ['true'],
								return: true,
							},
							media: {
								return: true,
							},
							rating: {
								return: true,
							},
							text: {
								return: true,
							},
							privacy: {
								searchvalues: [18],
								return: true,
							},
							typeofday: {
								return: true,
							},
							calendardatetime: {
								return: true,
								sort: 'descending',
							},
							maxitemcount: 50,
							continuationtoken: null,
						},
					},
				],
			}),
		})
			.then((result) => result.json())
			.then((data) => {
				setPosts(data.responseobjects[0].posts);
				console.log(data.responseobjects[0].posts);
				let createdArray = data.responseobjects[0].posts.map(
					(data) => new Date(data.calendardatetime)
				);
				setDateArray(createdArray);
			});
	}, []);

	useEffect(() => {
		let currentTime = new Date();
		let currentOffset = currentTime.getTimezoneOffset();
		let ISTOffset = 330;
		let ISTTime = new Date(
			currentTime.getTime() + (ISTOffset + currentOffset) * 60000
		);
		let weekOffSet = Math.round(
			(ISTTime - new Date(1970, 1, 4)) / (7 * 24 * 60 * 60 * 1000)
		);
		gridRef.current.scrollToItem({
			columnIndex: 2,
			rowIndex: weekOffSet + 7,
		});
	}, []);

	function AfterOpenModal() {
		sliderRef.current.slickGoTo(currentModalIndex, true);
	}

	function CloseModal() {
		setIsOpen((prev) => !prev);
	}

	return (
		<>
			<Modal
				isOpen={isOpen}
				onAfterOpen={AfterOpenModal}
				onRequestClose={CloseModal}
				style={customStyles}
				contentLabel='Example Modal'
			>
				<button
					style={{
						border: 'none',
						background: 'transparent',
						position: 'absolute',
						top: '10px',
						right: '45px',
						fontSize: '40px',
					}}
					onClick={CloseModal}
				>
					<CgCloseO color={'#FFFFFF'} />
				</button>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<div
					style={{
						width: width > 800 ? '1000px' : '350px',
						margin: 'auto',
						height: '590px',
						overflow: 'hidden',
					}}
				>
					<Slider {...settings} ref={sliderRef}>
						{posts &&
							posts.map((post, index) => (
								<CardMarginWrapper>
									<CardWrapper>
										<CardImageWrapper src={post.media[0].mediaurl} />
										<DetailsWrapper>
											<LegendDetails>
												<div>
													{post.typeofday.map((element) => (
														<>
															<EventWrapper event={element} />
															&nbsp;
														</>
													))}
												</div>
												<CardRatingWrapper>
													{[...new Array(5)].map((elm, index) => {
														if (index < post.rating) {
															return <AiFillStar color={'#9DD0EB'} />;
														} else {
															return <AiFillStar color={'#D2D4D8'} />;
														}
													})}
												</CardRatingWrapper>
											</LegendDetails>
											<DescripWrapper>
												<h3
													style={{
														height: '10px',
													}}
												>
													{dateArray &&
														dateArray[index] &&
														dateArray[index].getDate()}{' '}
													{dateArray &&
														dateArray[index] &&
														MonthsFullForm[dateArray[index].getMonth()]}
												</h3>
												{truncate(post.text)}
											</DescripWrapper>
											<br />
											<ViewPostButton>View Full Post</ViewPostButton>
										</DetailsWrapper>
									</CardWrapper>
								</CardMarginWrapper>
							))}
					</Slider>
				</div>
			</Modal>
			<CalendarWrapper>
				<DatesWrapper>
					<Grid
						useIsScrolling
						ref={gridRef}
						className='gridWrapper'
						columnCount={7}
						columnWidth={width / 7.1}
						height={630}
						rowCount={5220}
						rowHeight={110}
						width={width}
						itemData={{
							setCurrentMonth: setCurrentMonth,
							setCurrentYear: setCurrentYear,
							currentMonth: currentMonth,
							posts: posts,
							dateArray: dateArray,
							setCurrentModalIndex: setCurrentModalIndex,
							setIsOpen: setIsOpen,
							otherData: true,
						}}
					>
						{Cell}
					</Grid>
				</DatesWrapper>
			</CalendarWrapper>
		</>
	);
}
