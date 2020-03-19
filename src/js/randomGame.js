import $ from 'jquery';

export default class RandomGame {

	constructor () {
		this.displayRandomGame();
		this.randomGameBtnOnClick();
	}

	// Affiche un jeu aléatoire (appelé au chargement et lorsqu'on clique sur le bouton)
	displayRandomGame () {
		//génère nb aléa
		const randomID = Math.floor(Math.random() * 420000);
		//requete du jeu grace au nb aléa
        const rawg = 'https://api.rawg.io/api/games/' + randomID;

		$.ajaxSetup({cache: false});
		$.getJSON(rawg)

		.then((response) => {
			//response = JSON.parse(response);

			// Remplit le HTML grâce aux données de la requête
			$('.random-game-data .game-title').text(response.name);
			$('.random-game-data .release-date span').text(response.released);
			let platforms = [];
			let i = 0;
			$(response.platforms).each( () => {
				platforms.push(" " + response.platforms[i].platform.name);
				i++;
		  	});
			$('.random-game-data .platforms span').text(platforms);
			$('.random-game-data .description p').html(response.description);
			$('.random-game-data .game-image').attr('src', response.background_image);
			$('.random-game-data .website span a').text(response.website);
			$('.random-game-data .website span a').attr('href', response.website);
			$('.random-game-data .website-phone a').attr('href', response.website);

		})

		.catch((e) => {
			console.log('error: ', e);
			this.displayRandomGame();
		});
	}

	// Lance la méthode du jeu aléatoire lorsqu'on clique sur le bouton
	randomGameBtnOnClick () {
    	$('.random-btn').click( () => {
    		this.displayRandomGame();
    	});
    }
}
