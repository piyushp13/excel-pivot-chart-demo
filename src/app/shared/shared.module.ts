import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
