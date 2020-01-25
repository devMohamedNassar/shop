import {Directive, ElementRef, Renderer2, HostBinding, Input} from '@angular/core';

@Directive({
	selector: '[openModal]'
})
export class OpenModalDirective {
	@HostBinding('class.d-block') dBlockClass = false;
	@HostBinding('class.fade') fadeClass = false;
	@HostBinding('class.show') showClass = false;
	@Input() set openModal(val){
		if(val){
			this.dBlockClass = val;
			this.fadeClass = val;
			setTimeout(() => this.showClass = val, 100);
		}else{
			this.showClass = val;
			setTimeout(() => {
				this.dBlockClass = val;
				this.fadeClass = val;
			}, 300);
		}

	}
	constructor(private elemRef: ElementRef, private render: Renderer2){}

}