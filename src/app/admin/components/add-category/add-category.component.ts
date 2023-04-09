import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategorieDto } from '../../interface/categorie.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { CategoryEventsService } from '../../services/category-events.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categories: CategorieDto[] = [];
  categoryform!: FormGroup;
  code!: string;
  selectedParent!: CategorieDto | null;
  @Output() categoryAdded = new EventEmitter<void>(); // Add this line
  isUpdate = false;

  constructor(private categorieService: CategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryEventsService: CategoryEventsService
  ) {
    this.categoryform = this.formBuilder.group({
      _id:[null],
      title: [null, Validators.required],
      code: [null],
      Parent: [null]
    });
  }
  ngOnInit(): void {
    this.fetchCategories();
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  fetchCategories(): void {
    this.categorieService.getAllCategories().subscribe((data) => {
      this.categories = data;
      console.log("Category layout loaded successfully" + this.categories.length);
    });
  }
onSubmit(): void {
    if (this.categoryform.valid) {
      if (this.isUpdate) {
        // Call the updateCategorie service method when isUpdate is true
        this.categorieService.updateCategorie(this.categoryform.value).subscribe((data) => {
          console.log("Category successfully updated" , data);
          this.fetchCategories();
          this.showSuccess();
          this.categoryEventsService.categoryAdded();        
          console.log("Form value:", JSON.stringify(this.categoryform.value, null, 2));
          console.log("Form status:", this.categoryform.status);
         
        });
        this.categoryform.reset();
      } else {
        // Call the addCategory service method when isUpdate is false
        this.categorieService.addCategory(this.categoryform.value).subscribe((data) => {
          console.log("Category successfully added");
          this.fetchCategories();
          this.showSuccess();
          this.categoryEventsService.categoryAdded();
      
        });
        this.categoryform.reset();
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.categoryform.status });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryform.get(fieldName);
    const ok = !!(field && field.invalid && (field.dirty || field.touched));
    return ok
  }
  onParentChange(event: any): void {
    if (event.value) {
      this.categoryform.patchValue({ Parent: event.value._id });
    } else {
      this.categoryform.patchValue({ Parent: null });
    }
  }
    // Add this method to set the form values when updating a category
    setCategoryToUpdate(category: CategorieDto): void {
      this.categoryform.setValue({
        _id: category._id,
        title: category.title,
        code: category.code,
        Parent: category.Parent,
      });
      this.isUpdate = true;
    }

}
