import '../css/main.scss';
import SearchBarAnimation from './searchBar';
import SearchedGame from './searchedGame';
import RandomGame from './randomGame';
import $ from 'jquery';


class GetAllVideoGames {

	//constructor : nécessaire car 
	constructor () {
        this.smoothScroll();
        new SearchBarAnimation();
        new SearchedGame();
        new RandomGame();
    }

	// Permet un scroll fluide lorsqu'on appuie sur des a href
	smoothScroll () {
		$("a").on('click', function(event) {

	    if (this.hash !== "") {
	      event.preventDefault();

	      let hash = this.hash;

	      $('html, body').animate({
	        scrollTop: $(hash).offset().top
	      }, 500, () => {
	        // ajoute le hash (#) à l'URL quand le scroll est terminé
	        window.location.hash = hash;
	      });
	    }
	  });
	}
}

new GetAllVideoGames();