import $ from 'jquery';

export default class SearchBarAnimation {

	constructor () {
        this.animation();
    }


	animation () {
		$(".input-search").click(function(){
    		$(".search-bar").animate({top: "20%"});
    	});
	}
	
}