export interface ProfessionalData {
    IdUser: string;
    Title: string;  // Titre (lecture seule)
    LevelOfEducation: string;  // Niveau d'éducation (lecture seule)
    LevelOfExperience: string;  // Niveau d'expérience (lecture seule)
    CurrentNetSalary: number;  // Salaire net actuel (lecture seule)
    ProfessionalSituation: string;  // Situation professionnelle (lecture seule)
    DesiredMinimumNetSalary: number;  // Salaire net minimum souhaité (lecture seule)
    JobCategorie: string[];//chaque metier a plus de categogrie
    Availability: string;
    TypesOfPositions: string[];//table de string
    DesiredWorkLocations: string[];//table de string

}