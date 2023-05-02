export interface ConsultantObject {
    _id: string;
    IdUser: string;
    Name: string;
    FirstName: string;
    Gender: string;
    Dateofbirth: string;
    MaritalStatus: string;
    Country: string;
    Address: string;
    Region: string;
    City: string;
    phoneNumber: string[];
    Nationality: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface OfferApplicationWithConsultant {
    _id: string;
    offerId: string;
    entrepriseId: string;
    consultantId: string;
    appliedAt: string;
    status: string;
    __v: number;
    consultantObject: ConsultantObject;
}