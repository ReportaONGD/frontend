import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'gantt-header',
    template: `
        <div class="gantt-header">
            <div class="gantt-header-title">
                <div style="flex:1">{{ name }}</div>
              <div><strong>Inicio: </strong>{{ startDate }}</div>
                <div style="margin-left: 1rem"><strong>Fin: </strong>{{ endDate }}</div>
            </div>
        </div>
    `,
    styles: [`
        .gantt-header {
            background-color: whitesmoke;
            height: 40px;
            border-bottom: 1px solid #e0e0e0;
        }

        .gantt-header-title {
            padding: 12px;   
            display: flex;
            flex-wrap:wrap;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
        }

        .gantt-header-actions {
            display: inline;
            float: right;
            padding: 6px;
        }
    `]
})
export class GanttHeaderComponent {
    @Input() name:any;
    @Input() startDate: Date;
    @Input() endDate: Date;

}
