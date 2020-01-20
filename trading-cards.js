/**
 * Information about a famous sociologist.
 * @typedef {Object} Person
 * @property {string} anchor - The hashtag after the URL that scrolls the page to this person. (e.g. "example.com/#comte")
 * @property {string} portraitPath - The path to a image to use as the image on this person's trading card.
 * @property {string} name - First and last name of the sociologist.
 * @property {string} born - The date when this person was born.
 * @property {string} died - The date when this person died (this program is not designed to handle people who are still living).
 * @property {string|string[]} theories - Brief description(s) of theories this person developed.
 * @property {string|string[]} significance - Reasons why this person is relevant today.
 * @property {string|string[]} findings - Brief description(s) of important findings this person made.
 */


/**
 * Generate an HTML undordered (bulleted) list.
 * 
 * @param {string[]} array - array of strings to make a list out of
 * @return {string} HTML for an unordered list
 */
function generateUL(array) {
	const length = array.length;
	let html;
	if (length > 1) {
		html = `<ul>`;
		
		for (let i=0; i<length; i++) {
			html += `<li>${array[i]}</li>`;
		}
			
		html += `</ul>`;

	} else {
		html = `<p>${array[0]}</p>`;
	}
	
	return html;
}


/**
 * Append a card to an element.
 * 
 * @param {Person} person - Person object
 * @param {string} selector - CSS selector to append the card to
 */
function addCard(person, selector) {         
    const section = `
		<div class="section" data-anchor="${person.anchor}">
			<div class="card left">
				<img class="portrait" src="${person.portraitPath}">
				<div class="name-banner">${person.name}</div>
				<div class="decoration"></div>
			</div>

			<div class="card right">
				<h4>${person.name}</h4>
				
				<table>
					<tr>
						<td>Born:</td>
						<td>${person.born.date}</td>
						<td>${person.born.location}</td>
					</tr>
					<tr>
						<td>Died:</td>
						<td>${person.died.date}</td>
						<td>${person.died.location}</td>
					</tr>
				</table>

				<div>
					<h2>Best known theory:<br>
						<em>${person.mainTheory}</em>
					</h2>
				</div>

				<div>
					<h2>Why is ${(person.male) ? "he" : "she"} famous?</h2>
					<p>${person.significance}</p>
				</div>

				<div>
					<h2>Important findings</h2>
					${generateUL(person.findings)}
				</div>

				<p class="quote">${person.quote}</p>

			</div>
		</div>
	`;

    document.querySelector(selector).insertAdjacentHTML("beforeend", section);
}

/**
 * Add several cards at once in an array.
 * 
 * @param {Person[]} people - array of people
 * @param {string} selector - CSS selector to append the cards to
 */
function addCards(people, selector) {
	for (const person of people) {
		addCard(person, selector);
	}
}

/**
 * Set the contents of a <select> based on an array of people.
 * 
 * @param {Person[]} people - array of people
 * @param {string} selector - CSS selector of a <select> to populate
 */
function populateMenu(people, selector) {
	const menu = document.querySelector(selector);
	let html = ""
	for (const person of people) {
		html += `
			<option value="${person.anchor}" ${(location.hash === people.anchor) ? "active" : ""}>${person.name}</option>
		`;
	}
	menu.innerHTML = html;
}

