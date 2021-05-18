import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { TrainingComponent } from "./training.component";
import { SharedModule } from "../shared/shared.module";
import { TrainingRoutingModule } from "./training-routing.module";
import { StoreModule } from "@ngrx/store";
import { trainingReducer } from './training.reducer'

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],

    imports: [
        SharedModule,
        FormsModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],

    exports: [],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}