const start = () => {
  const api = fetch('https://random-words-api.vercel.app/word');

  api
    .then((response) => {
      return response.json();
    })
    .then((def) => {
      const definition = def['0']['definition'];
      const definitionText = document.getElementById('def');
      const submit = document.getElementById('submit');

      console.log(def['0']['word']); // word
      console.log(def['0']['definition']); // definition

      definitionText.innerHTML = `Definition: ${definition}`;

      submit.onclick = () => {
        if (document.getElementById('userGuess').value == def['0']['word']) {
          console.log('right answer');
          start();
        } else {
          console.log('wrong');
          start();
        }
      };
    });
};
