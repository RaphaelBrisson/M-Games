import $ from 'jquery';

export default class SearchedGame {

	constructor () {
		this.getInputText();
        this.displayRequestedGame();
	}

	// À chaque fois qu'on appuie sur une touche du clavier, appelle getGamesList() si plus de 3 lettres
    getInputText () {
    	$(".input-search").on("keyup", () => {
    		//stocke la recherche et met tout en minuscule
    		let searchContent = $('.input-search').val().toLowerCase();

    		$(".no-result").css("display", "none");
    		$(".search-results").css("display", "none");

    		if (searchContent.length >= 3)
    		{
    			//appelle getGamesList avec en paramètre la recherche de l'utilisateur
    			this.getGamesList(searchContent);
    		}
    	});
    }

    //affiche les résultats de la recherche
	getGamesList (searchContent) {
		$('.search-results li').text("");

		//lance la requête avec la recherche de l'utilisateur
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
			//pour chaque résultat
			$(nbResults).each( () => {
				//affiche les résultats dans la liste
				$("#q" + (i + 1)).text(nbResults[i].name);
				//on écrit le slug (pour faire la requête après)
				$("#q" + (i + 1)).attr('class', nbResults[i].slug);
				i++;
		  	});

			//si pas de résultat
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
		//lorsque l'on clique sur un jeu dans la liste
		$(".search-results li").click(function() {
			//on récupère le nom du jeu
			let gameName = $(this).html();
			//on l'affiche dans la barre de recherche
			$(".input-search").val(gameName);
			$(".search-results").css("display", "none");
			$(".requested-game-data").css("display", "block");

			//on récupère le slug
			let slug = $(this).attr('class');
			//on créé la requête grâce au slug
			const rawg = 'https://api.rawg.io/api/games/' + slug;

			$.ajaxSetup({cache: false});
			$.getJSON(rawg)

			.then((response) => {
				//response = JSON.parse(response);

				// Remplit le HTML grâce aux données de la requête
				$('.requested-game-data .game-title').text(response.name);
				$('.requested-game-data .release-date span').text(response.released);
				let platforms = [];
				let i = 0;
				console.log(response);
				console.log(response.platforms);
				$(response.platforms).each( () => {
					platforms.push(" " + response.platforms[i].platform.name);
					i++;
			  	});
				$('.requested-game-data .platforms span').text(platforms);
				$('.requested-game-data .description p').html(response.description);
				$('.requested-game-data .game-image').attr('src', response.background_image);
				$('.requested-game-data .website span a').text(response.website);
				$('.requested-game-data .website span a').attr('href', response.website);
				$('.requested-game-data .website-phone a').attr('href', response.website);
			})
    	});
	}
}
