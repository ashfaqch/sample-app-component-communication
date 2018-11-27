import {
    Component, Output, EventEmitter, OnChanges, SimpleChanges,
    Input, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

@Component({
    selector: 'app-filter-text',
    templateUrl: './filter-text.component.html'
})
export class FilterTextComponent implements OnChanges, AfterViewInit {
    @Input() filterCount: number;
    @Output() filterTextChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('filterElement') filterElementRef: ElementRef;
    public message: any;

    // child propert bound with child input and change deducation
    private _filterText: string;
    get filterText(): string {
        return this._filterText;
    }
    set filterText(value: string) {
        this._filterText = value;
        this.filterTextChange.emit(value);
    }

    // any change value on parent side will trigger this ngOnChanges
    // getting input value from parent and display in child
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['filterCount'] && !changes['filterCount'].currentValue) {
            this.message = 'No matches found';
        } else {
            this.message = this.filterCount;
        }
    }

    // set focus on input element
    ngAfterViewInit(): void {
        if (this.filterElementRef.nativeElement) {
            this.filterElementRef.nativeElement.focus();
        }
    }
}
