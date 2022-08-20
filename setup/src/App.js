import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';


//open final project in web -> inspect -> class: section-center : uncheck the overflow : hidden in css -> go to any of the children of section center -> uncheck the opacity : 0 and zoom out the webpage to see how slider works

function App() {
	const [people, setPeople] = useState(data);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		let slider = setInterval(() => {
			setIndex((index - 1 + people.length) % people.length);
		}, 3000);

		return () => clearInterval(slider); //try commenting this out and click on next button multiple times, it will start behaving strange : perfect example of need of clean up function
	}, [index]);
	return (
		<section className='section'>
			<div className='title'>
				<h2>
					<span>/</span>
					reviews
				</h2>
			</div>
			<div className="section-center">
				{people.map((person, personIndex) => {
					const { id, image, name, title, quote } = person;

					let position = 'nextSlide';

					if (index === personIndex) {
						position = 'activeSlide';
					}

					if (personIndex === (index - 1 + people.length) % people.length) {
						position = 'lastSlide';
					}

					return (
						<article className={position} key={id}>
							<img src={image} alt={name} className='person-img' />
							<h4>{name}</h4>
							<p className='title'>{title}</p>
							<p className='text'>{quote}</p>
							<FaQuoteRight className='icon' />
						</article>
					);
				})}
				<button className='prev' onClick={() => setIndex((index - 1 + people.length) % people.length)}>
					<FiChevronLeft />
				</button>
				<button className='next' onClick={() => setIndex((index + 1) % people.length)}>
					<FiChevronRight />
				</button>
			</div>
		</section>
	);
}

export default App;
