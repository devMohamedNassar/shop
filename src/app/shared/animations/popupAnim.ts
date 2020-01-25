import {style, state, animate, transition, trigger, query, group} from '@angular/animations';

const popupAnim = 
	  trigger('popupAnim', [
	  	state("hide", style({opacity:"0"})),
	  	transition("hide => show", [
	  		style({opacity: "1"}),
	  		query(".wrapper", [
	  			style({
	  				marginTop: "5vh",
	  				opacity: "0"
	  			}),
	  			animate("0.3s", 
	  				style({
	  					marginTop: "0",
	  					opacity: "1"
	  					})
	  				)
	  			])
	  		]),
	  	transition(":leave", [
	  		query(".wrapper", [
	  			animate("0.3s", 
	  				style({
	  					marginTop: "5vh",
	  					opacity: "0"
	  					})
	  				)
	  			])
	  		])
	  	])
	

export{popupAnim};