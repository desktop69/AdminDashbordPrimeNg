import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CategorieDto } from '../../interface/categorie.dto';
import { CategoryService } from '../../services/category.service';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { CategoryEventsService } from '../../services/category-events.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-categorylayout',
  templateUrl: './categorylayout.component.html',
  styleUrls: ['./categorylayout.component.scss']
})
export class CategorylayoutComponent {

  categories: CategorieDto[] = [];
  categoryTreeNodes: TreeNode[] = [];
  cols: any[];
  @Output() categoryAdded = new EventEmitter<void>();
  @ViewChild(AddCategoryComponent) addCategoryComponent!: AddCategoryComponent;

  constructor(private categorieApiService: CategoryService,
    private categoryEventsService: CategoryEventsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: '_id', header: 'ID' },
      { field: 'code', header: 'Code' },
      { field: 'absolutePath', header: 'Absolute Path' },
      { field: 'delete', header: 'Action' },
    ];
  }
  ngOnInit(): void {
    this.fetchCategories();
    // Subscribe to category added event
    this.categoryEventsService.categoryAdded$.subscribe(() => {
      this.fetchCategories();
    });
  }
  fetchCategories(): void {
    this.categorieApiService.getAllCategories().subscribe((data) => {
      this.categories = data;
      console.log("Category layout loaded successfully" + this.categories.length);
      this.categoryTreeNodes = this.buildCategoryTreeNodes(data);
    });
  }
  buildCategoryTreeNodes(categories: CategorieDto[]): TreeNode[] {
    const nodes: TreeNode[] = [];

    for (const category of categories) {
      if (!category.Parent) {
        const node: TreeNode = {
          data: category,
          children: this.buildCategoryChildrenNodes(category.childrens),
        };
        nodes.push(node);
      }
    }

    return nodes;
  }

  buildCategoryChildrenNodes(childrens: CategorieDto[] | undefined): TreeNode[] {
    const childrenNodes: TreeNode[] = [];

    if (childrens) {
      for (const child of childrens) {
        const childNode: TreeNode = {
          data: child,
          children: this.buildCategoryChildrenNodes(child.childrens),
        };
        childrenNodes.push(childNode);
      }
    }

    return childrenNodes;
  }
  onDeleteClick(id: string): void {
    this.categorieApiService.deltecategory(id).subscribe(
      () => {
        console.log(`Category with ID ${id} deleted successfully`);
        this.fetchCategories();
      });
  }
  onUpdateClick(category: CategorieDto): void {
    // Call the setCategoryToUpdate method in the AddCategoryComponent
    this.addCategoryComponent.setCategoryToUpdate(category);
  }
  OnconfirmForDelete(event: Event, id: string, title: string) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to Delete this Job category ?",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "",
      rejectButtonStyleClass: "",
      accept: () => {
        this.onDeleteClick(id);
        this.messageService.add({
          severity: "info",
          summary: "Success",
          detail: ("You have successfully deleted  " + title),
        });
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: ("You have rejected  " + title),
        });
      }
    });
  }



}


