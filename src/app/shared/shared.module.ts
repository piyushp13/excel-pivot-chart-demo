import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule, MatIconModule, MatDialogModule, MatOptionModule,
  MatFormFieldModule, MatSelectModule, MatSnackBarModule, MatSidenavModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    DragDropModule,
    MatAutocompleteModule
  ],
  exports: [
    MatButtonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    DragDropModule,
    MatAutocompleteModule
  ]
})
export class SharedModule { }
