import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { ProductSaveDTO } from '../../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrls: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmIconComponent,
    HlmLabelDirective,
  ],
})
export class ProductFormComponent implements OnInit {
  @Input() product: any; // Pass the product data for editing
  @Input() isEditMode = false; // Flag to differentiate between add and edit mode
  @Output() productSaved = new EventEmitter<any>();
  @Output() formClosed = new EventEmitter<void>();

  productForm!: FormGroup;
  lastProductId!: number;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [this.product?.id],
      name: [this.product?.name || '', Validators.required],
      price: [this.product?.price || '', [Validators.required, Validators.min(0)]],
      quantity: [this.product?.quantity || '', [Validators.required, Validators.min(0)]],
      createdAt: [this.product?.createdAt || new Date()],
      updatedAt: [new Date()],
    });

    if (this.isEditMode) {
      this.productForm.patchValue(this.product); // Pre-fill the form with existing product data
    }
  }

  onSubmit() {
    const productData = this.productForm.value;
    const saveData : ProductSaveDTO = {
      name: productData.name,
      price: productData.price,
      quantity: productData.quantity
    }
    if (this.isEditMode) {
      this.productService.updateProduct(this.product?.id, saveData).subscribe(() => {
        this.productSaved.emit(productData);
        this.formClosed.emit(); // Close sheet
      });
    } else {
      // Add new product
      this.productService.addProduct(saveData).subscribe(() => {
        this.productSaved.emit(productData);
        this.formClosed.emit(); // Close sheet
      });
    }
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get quantity() {
    return this.productForm.get('quantity');
  }
}
