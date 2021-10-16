
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

			definitionText.innerHTML = `Definition: ${definition}`;

			feedback(def, userGuess, submit, yesNo);
		});
};

const feedback = (def, userGuess, submit, yesNo) => {
	submit.onclick = () => {
		if (userGuess.value.toLowerCase() == def['0']['word'].toLowerCase()) {
			yesNo.innerHTML = `<p class='feedback'>Correct! The word was ${def['0']['word']}</p>`;
			feedbackLeave(yesNo, userGuess);
			$.ajax({
        type:'POST',
        url:'/test',
        data:{
          todo:1
        },
        success:function()
        {
          console.log("yay")
        }
      })
		} else {
			yesNo.innerHTML = `<p class='feedback'>Wrong! The word was ${def['0']['word']}</p>`;
			feedbackLeave(yesNo, userGuess);
		}

		userGuess.value = ''
	};
};

feedbackLeave = (yesNo, userGuess) => setTimeout(() => {
	yesNo.innerHTML = '<p></p>';
	start();
}, 1500);

const toggleLeaderboard = () => {
	const leaderboard = document.getElementById('leader-board');
	if (leaderboard.style.display === 'none') leaderboard.style.display = 'block';
	else leaderboard.style.display = 'none';
}
