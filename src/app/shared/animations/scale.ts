import {trigger, transition, animate, style} from '@angular/animations';

export const Scale = trigger('scale', [
		transition(":enter", [
			style({transform: "scale(0)"}),
			animate("3s", style({transform: "scale(1)"}))
		]),
		transition(":leave", [
			style({transform: "scale(1)", height: "*"}),
			animate("0.3s", style({transform: "scale(0.5)", height: 0}))
		])
	]);

