export class Offer {
     _id!:string;
     IdUser!: string;
    //Offer Info
     titleO!: string;
     descriptionE!: string;
     referenceO!: string;
     
    //offer details
     TypesOfPositions!: string[];
     Availability!: string;
     DesiredMinimumNetSalary!: number;
     DesiredMaximumNetSalary!: number;
     in!: string;
     LevelOfEducation!: string;
     LevelOfExperience!: string;
     languages!: string[];
     Jobs!: string[];
     JobCategorie!: string[];

    //offer place
     Address!: string;
     Region!: string;
     City!: string;
     mobility!: string[];

    //offer settings
     date!: Date;
     dateFin!: Date;
     responable!: string;
     emailforsendmails!: string;
     isAccepted!: boolean;
}