import $ from 'jquery';
// Importe la template handlebars (le nom n'a pas d'importance, il doit simplement être le même que celui utilisé pour appelé la template)
import GameDataTemplate from './../templates/gameDataTemplate.hbs';

export default class SearchedGame {

	constructor () {
		this.getInputText();
        this.displayRequestedGame();
	}

	// À chaque fois qu'on appuie sur une touche du clavier, appelle getGamesList() si plus de 3 lettres
    getInputText () {
    	$(".input-search").on("keyup", () => {
    		// Stocke la recherche et met tout en minuscule
    		let searchContent = $('.input-search').val().toLowerCase();

    		$(".no-result").css("display", "none");
    		$(".search-results").css("display", "none");

    		if (searchContent.length >= 3)
    		{
    			// Appelle getGamesList avec en paramètre la recherche de l'utilisateur
    			this.getGamesList(searchContent);
    		}
    	});
    }

    // Affiche les résultats de la recherche
	getGamesList (searchContent) {
		// Réinitialise le contenu
		$('.search-results li').text("");

		// Lance la requête avec la recherche de l'utilisateur
		const rawg = 'https://api.rawg.io/api/games?search=' + searchContent;

		$.ajaxSetup({cache: false});
		$.getJSON(rawg)

		.then((response) => {
			$(".search-results").css("display", "block");
			$("body").click( () => {
				$(".search-results").css("display", "none");
    		});
			const nbResults = response.results;
			let i = 0;
			// Pour chaque résultat
			$(nbResults).each( () => {
				// Affiche les résultats dans la liste
				$("#q" + (i + 1)).text(nbResults[i].name);
				// On écrit le slug (pour faire la requête après)
				$("#q" + (i + 1)).attr('class', nbResults[i].slug);
				i++;
		  	});

			// Si pas de résultat
			if(nbResults.length == 0)
			{
				$(".search-results").css("display", "none");
				$(".no-result").css("display", "block");
			}
			})

		.catch((e) => {
			console.log('error: ', e);
		});
	}

	displayRequestedGame () {
		// Lorsque l'on clique sur un jeu dans la liste
		$(".search-results li").click(function() {
			// On récupère le nom du jeu
			let gameName = $(this).html();
			// On l'affiche dans la barre de recherche
			$(".input-search").val(gameName);
			$(".search-results").css("display", "none");
			$(".requested-game-data").css("display", "block");

			// On récupère le slug
			let slug = $(this).attr('class');
			// On créé la requête grâce au slug
			const rawg = 'https://api.rawg.io/api/games/' + slug;

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
				$('.requested-game-data').html(rendered);
				$('.requested-game-data .platforms').append(allplatforms);

			})
    	});
	}
}
