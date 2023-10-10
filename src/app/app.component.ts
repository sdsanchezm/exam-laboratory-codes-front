import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clipboard } from '@angular/cdk/clipboard';

import { ExamlabcodesService } from './services/examlabcodes.service';

import { ExamLabcode } from './interfaces/examlabcodes.interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public tagbutton1!: ElementRef<HTMLElement>;
    public queryButton!: ElementRef<HTMLElement>;
    public querySearch1 = '';
    public clipSuccess = false;

    @ViewChild('queryInput')
    public queryInput1!: ElementRef<HTMLInputElement>;

    @ViewChild('longContentModal')
    public longContentModal!: any;

    @Input()
    public examLabCodesList: ExamLabcode[] = [];

    constructor(private examlabcodesService: ExamlabcodesService, private modalService: NgbModal, private clipboard: Clipboard) { }

    query1(): void {
        const queryTxt = this.queryInput1.nativeElement.value;
        this.querySearch1 = queryTxt;
        this.examlabcodesService.searchExamCode2(queryTxt)
            .subscribe(response => {
                this.examLabCodesList = response;
            });
        this.queryInput1.nativeElement.value = '';
        this.queryInput1.nativeElement.focus();
    }

    query2(id: any): void {
        this.examlabcodesService.retrieveAnExam(id)
            .subscribe(response => {
                this.examLabCodesListModal = response;
            });
    }

    openLongContentModal(examIdText: any) {
        this.query2(examIdText);
        const modalRef = this.modalService.open(this.longContentModal, { size: 'lg', scrollable: true });
    }

    copyToClipboard(textToCopy: any) {
        this.clipSuccess = this.clipboard.copy(textToCopy);
    }

    public examLabCodesListModal: ExamLabcode = {
        examId: '',
        examNumber: "",
        examName: "",
        commonName: "",
        fastingRequired: false,
        preparationDescription: "",
        observationForLaboratory: "",
        examPlace: "",
        schedule: "",
        examCode: "",
        cupsCode: "",
        sampleDescription: "",
        sampleStability: "",
        clinicUtility: "",
        mountingDays: "",
        timeResults: "",
        sampleTechnic: "",
        processingPlace: ""
    };


}
