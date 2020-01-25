import {style, state, animate, transition, trigger, query, group} from '@angular/animations';

const Fade = {
 
	fade:		
		  trigger('Fade', [
	        transition(
	          ':enter', 
	          [
	            style({ opacity: 0 }),
	            animate('0.3s ease-out', style({ opacity: 1 }))
	          ]
	        ),
	        transition(
	          ':leave', 
	          [
	            style({ opacity: 1 }),
	            animate('0.3s ease-in', style({ opacity: 0 }))
	          ]
	        )
		  ]),

	fadeUpDown:	
			  trigger('Fade', [
		        transition(
		          ':enter', 
		          [
		            style({ opacity: 0, transform: "translateY(30px)" }),
		            animate('0.3s ease-out', style({ opacity: 1, transform: "translateY(0)" }))
		          ]
		        ),
		        transition(
		          ':leave', 
		          [
		            style({ opacity: 1, transform: "translateY(0)" }),
		            animate('0.3s ease-in', style({ opacity: 0, transform: "translateY(30px)" }))
		          ]
		        )
			  ])	
}

export{Fade};