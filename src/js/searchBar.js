import $ from 'jquery';

export default class SearchBarAnimation {

	constructor () {
        this.animation();
    }

    // Fait monter la barre de recherche lors d'un clic
	animation () {
		$(".input-search").click(function(){
    		$(".search-bar").animate({top: "20%"});
    	});
	}
	
}