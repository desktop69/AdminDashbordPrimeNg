/* eslint-disable prettier/prettier */
export class CategorieDto {
    _id!: string;
    title!: string;
    code!: string;
    Parent?: CategorieDto | null;
    absolutePath!: string;
    childrens?: CategorieDto[]; // Add this line to include the 'childrens' property
}