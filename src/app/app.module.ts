import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { EditComponent } from "./edit/edit.component";
import { CreateComponent } from "./create/create.component";
import { TaskInfoDialogComponent } from "./task-info-dialog/task-info-dialog.component";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { UnsavedDialogComponent } from "./unsaved-dialog/unsaved-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EditComponent,
    CreateComponent,
    TaskInfoDialogComponent,
    DeleteDialogComponent,
    UnsavedDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [
    TaskInfoDialogComponent,
    DeleteDialogComponent,
    UnsavedDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
