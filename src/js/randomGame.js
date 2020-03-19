import $ from 'jquery';
// Importe la template handlebars
import GameDataTemplate from './../templates/gameDataTemplate.hbs';


export default class RandomGame {

	constructor () {
		this.displayRandomGame();
		this.randomGameBtnOnClick();
	}

	// Affiche un jeu aléatoire (appelé au chargement et lorsqu'on clique sur le bouton)
	displayRandomGame () {
		// Génère nb aléa. la valeur max (500000) est supérieure au nombre de jeux disponibles, mais s'il y a pas de jeu correspondants, la requête est faite de nouveau. (Je n'ai pas le moyen d'avoir dynamiquement le nombre de jeux dispo).
		const randomID = Math.floor(Math.random() * 500000);
		// Requete du jeu grace au nb aléa
        const rawg = 'https://api.rawg.io/api/games/' + randomID;

		$.ajaxSetup({cache: false});
		$.getJSON(rawg)

		.then((response) => {

			// Variable qui contient toutes les plateformes disponibles
			let allplatforms = [];
			let i = 0;
			$(response.platforms).each( () => {
				allplatforms.push(" " + response.platforms[i].platform.name);
				i++;
		 	});
		 	allplatforms = allplatforms.join(", ");


		 	// rendered prend pour valeur la template GameDataTemplate avec comme paramètre response 
			var rendered = GameDataTemplate(response);
			// On injecte rendered
			$('.random-game-data').html(rendered);
			$('.random-game-data .platforms').append(allplatforms);
		})

		.catch((e) => {
			// Si erreur, on recommence
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
