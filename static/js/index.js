const start = () => {
	const api = fetch(apiUrl);
	api
		.then((response) => {
			return response.json();
		})
		.then((def) => {
			const definition = def['0']['definition'];
			const definitionText = document.getElementById('def');
			const submit = document.getElementById('submit');
			const userGuess = document.getElementById('userGuess');
			const yesNo = document.getElementById('yes-no');

			console.log(def['0']['word']);
			console.log(def['0']['definition']);

			definitionText.innerHTML = `Definition: ${definition}`;

			feedback(def, userGuess, submit, yesNo);
		});
};

const feedback = (def, userGuess, submit, yesNo) => {
	submit.onclick = () => {
		if (userGuess.value == def['0']['word']) {
			yesNo.innerHTML = `<p class='feedback'>Correct! The word was ${def['0']['word']}</p>`;
			start();
		} else {
			yesNo.innerHTML = `<p class='feedback'>Wrong! The word was ${def['0']['word']}</p>`;
			start();
		}
	};
};


