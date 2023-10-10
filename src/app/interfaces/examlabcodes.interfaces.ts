export interface SearchResponse {
    data:       ExamLabcode[];
}

export interface ExamLabcode {
    examId: string
    examNumber: string
    examName: string
    commonName: string
    fastingRequired: boolean
    preparationDescription: string
    observationForLaboratory: string
    examPlace: string
    schedule: string
    examCode: string
    cupsCode: string
    sampleDescription: string
    sampleStability: string
    clinicUtility: string
    mountingDays: string
    timeResults: string
    sampleTechnic: string
    processingPlace: string
}
