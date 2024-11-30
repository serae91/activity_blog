import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DomSanitizer } from '@angular/platform-browser';

const MODULES = [
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,

  A11yModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
  DragDropModule,
  ScrollingModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcon('exit-icon', 'assets/icons/exit_to_app-24px.svg');
    this.registerIcon('more-vert-icon', 'assets/icons/more_vert.svg');
    this.registerIcon('keyboard-arrow-down', 'assets/icons/keyboard_arrow_down-24px.svg');
    this.registerIcon('assays-icon', 'assets/icons/assays_icon-24px.svg');
    this.registerIcon('dashboard-icon', 'assets/icons/dashboard_icon-24px.svg');
    this.registerIcon('import-summary-icon', 'assets/icons/import_summary_icon-24px.svg');
    this.registerIcon('samples-icon', 'assets/icons/samples_icon-24px.svg');
    this.registerIcon('config-icon', 'assets/icons/config_icon-24px.svg');
    this.registerIcon('audit-icon', 'assets/icons/audit_icon-24px.svg');
    this.registerIcon('list-view-icon', 'assets/icons/list_view_icon-24px.svg');
    this.registerIcon('plate-view-icon', 'assets/icons/plate_view_icon-24px.svg');
    this.registerIcon('edit-icon', 'assets/icons/edit_icon-24px.svg');
    this.registerIcon(
      'sample-validation-status-invalid-icon',
      'assets/icons/sample_validation_status_invalid_icon-24px.svg'
    );
    this.registerIcon(
      'sample-validation-status-negative-icon',
      'assets/icons/sample_validation_status_negative_icon-24px.svg'
    );
    this.registerIcon(
      'sample-validation-status-positive-icon',
      'assets/icons/sample_validation_status_positive_icon-24px.svg'
    );
    this.registerIcon('change-status-icon', 'assets/icons/change_status_icon-24px.svg');
    this.registerIcon('reserve-icon', 'assets/icons/reserve_icon-24px.svg');
    this.registerIcon('cancel-reservation-icon', 'assets/icons/cancel_reservation_icon-24px.svg');
    this.registerIcon(
      'show-more-information-icon',
      'assets/icons/show_more_information_icon-24px.svg'
    );
    this.registerIcon('expand-icon', 'assets/icons/expand_icon-24px.svg');
    this.registerIcon('collapse-icon', 'assets/icons/collapse_icon-24px.svg');
    this.registerIcon(
      'quality-control-create-chart-icon',
      'assets/icons/quality_control_create_chart_icon.svg'
    );
    this.registerIcon('covid-transfer-icon', 'assets/icons/covid_transfer_icon-24px.svg');
    this.registerIcon(
      'covid-transfer-payload-icon',
      'assets/icons/covid_transfer_payload_icon-24px.svg'
    );
  }

  private registerIcon(name: string, path: string): void {
    this.matIconRegistry.addSvgIcon(name, this.domSanitizer.bypassSecurityTrustResourceUrl(path));
  }
}
