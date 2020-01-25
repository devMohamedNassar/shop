import {style, state, animate, transition, trigger, query, group} from '@angular/animations';

const fadeInOut = 
	  trigger('fadeInOut', [
	    transition('* => *', [
	    	group([
	    		query(":enter", [
					style({
						opacity: 0,
						transform: "translateY(30px)"
					}),
					animate(500, style({
						opacity: 1,
						transform: "translateY(0)"
					})) 
	    		], {optional: true}),
	    		query(":leave", [
					animate(400, style({
						opacity: 0,
						transform: "translateY(20px)"
					})) 
	    		], {optional: true})
	    	])

	    ]),
	  ])
	

export{fadeInOut};