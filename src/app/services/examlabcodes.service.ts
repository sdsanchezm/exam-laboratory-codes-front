import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ExamLabcode, SearchResponse } from '../interfaces/examlabcodes.interfaces';

import { env_dev } from 'src/environment/env.dev';

@Injectable({
    providedIn: 'root'
})
export class ExamlabcodesService {

    public examCodeList: ExamLabcode[] = [];

    constructor(private http: HttpClient) { }

    searchExamCode1(tag: string): void {
        if (tag.length === 0) return;
        const api_url = `${env_dev.api_url}search?q=${tag}`;
        this.http
            .get<SearchResponse>(api_url)
            .subscribe(res => {
                this.examCodeList = res.data;
            })
    }

    // retrieve all exams from user input
    searchExamCode2(tag: string): Observable<ExamLabcode[]> {
        if (tag.length === 0) {
            return new Observable<ExamLabcode[]>(observer => {
                observer.next([]);
                observer.complete();
            });
        }

        const api_url = `${env_dev.api_url}search?q=${tag}`;
        return this.http.get<ExamLabcode[]>(api_url);
    }

    // retrieves 1 exam to show in modal
    retrieveAnExam(id: any): Observable<ExamLabcode> {
        const api_url = `${env_dev.api_url}${id}`;
        return this.http.get<ExamLabcode>(api_url);
    }



}
