import { Component, EventEmitter, Input,OnDestroy,OnInit,Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debauncerSuscription?: Subscription;

  @Input()
  public placeholder :string = '';
  
  @Input()
  public initialValue:string = '';

  @Output()
  public onvalue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()



  ngOnInit(): void {
     this.debauncerSuscription = this.debouncer
      .pipe(
        debounceTime(400)
      )
      .subscribe(value =>{
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debauncerSuscription?.unsubscribe();

  }

  emitValue(value:string):void{
    this.onvalue.emit(value);
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);

  }
}

