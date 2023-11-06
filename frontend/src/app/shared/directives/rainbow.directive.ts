import {
    Directive, 
    HostListener, 
    OnInit, 
    TemplateRef, 
    ViewContainerRef, 
    ElementRef, 
    Renderer2, 
    HostBinding, 
    OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
    selector: '[appRainbow]'
})
export class RainbowDirective implements OnInit, OnDestroy {
    @HostBinding('style.backgroundColor')backgroundColor:string;
    isIncreasingRed: boolean = false;
    isIncreasingGreen: boolean = true;
    isIncreasingBlue: boolean = true;
    red: number = 255;
    green: number = 122;
    blue: number = 0;

    interval: Observable<void>;
    subscription: Subscription;
    constructor(private elRef: ElementRef, private renderer: Renderer2) {
        console.log('construct rainbow');
        this.interval = new Observable<void>((observer) => {
            setInterval(() => { observer.next(); }, 100)
        });
        this.subscription = this.interval.subscribe(()=>this.update());
     }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngOnInit() {
        console.log('start rainbow');
        this.interval = new Observable<void>((observer) => {
            setInterval(() => { observer.next(); }, 100)
        });
        this.subscription = this.interval.subscribe(()=>this.update());
    }
    private update(): void {
        this.red += this.getDeltaRed();
        this.green += this.getDeltaGreen();
        this.blue += this.getDeltaBlue();
        this.backgroundColor = 'rgb('+this.red+','+this.green+','+this.blue+')';
    }
    private getDeltaRed(): number {
        let delta = Math.floor(Math.random() * 5.99);
        if (this.isIncreasingRed) {
            if (this.red >= 255) { this.isIncreasingRed = false; return -delta; }
            if (this.red + delta >= 255) { return 255 - this.red; }
            return delta;
        }
        if (this.red === 0) { this.isIncreasingRed = true; return delta; }
        if (this.red - delta <= 0) { return - this.red; }
        return -delta;
    }
    private getDeltaGreen(): number {
        let delta = Math.floor(Math.random() * 5.99);
        if (this.isIncreasingGreen) {
            if (this.green >= 255) { this.isIncreasingGreen = false; return -delta; }
            if (this.green + delta >= 255) { return 255 - this.green; }
            return delta;
        }
        if (this.green === 0) { this.isIncreasingGreen = true; return delta; }
        if (this.green - delta <= 0) { return - this.green; }
        return -delta;
    }
    private getDeltaBlue(): number {
        let delta = Math.floor(Math.random() * 5.99);
        if (this.isIncreasingBlue) {
            if (this.blue >= 255) { this.isIncreasingBlue = false; return -delta; }
            if (this.blue + delta >= 255) { return 255 - this.blue; }
            return delta;
        }
        if (this.blue === 0) { this.isIncreasingBlue = true; return delta; }
        if (this.blue - delta <= 0) { return - this.blue; }
        return -delta;
    }
    /*@HostListener('mouseenter') mouseover(eventData: Event){
        console.log('mouse over rainbow');
        this.interval = new Observable<void>((observer) => {
            setInterval(() => { observer.next(); }, 100)
        });
        this.subscription = this.interval.subscribe(()=>this.update());
      }*/
}