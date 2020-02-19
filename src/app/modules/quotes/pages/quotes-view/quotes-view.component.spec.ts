import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { QuotesViewComponent } from "./quotes-view.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FilterComponent } from "../../components/filter/filter.component";
import { ComparedItemsComponent } from "../../components/compared-items/compared-items.component";
import { QuoteViewComponent } from "../../components/quote-view/quote-view.component";
import { MaterialModule } from "src/app/modules/material/material.module";
import { Store, StoreModule } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { HttpClient, HttpHandler } from "@angular/common/http";
import * as ComparedItemsActions from "../../../../actions/compared-items.action";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { FormBuilder } from "@angular/forms";
describe("QuotesViewComponent", () => {
  let component: QuotesViewComponent;
  let fixture: ComponentFixture<QuotesViewComponent>;
  let store: MockStore<{ loggedIn: boolean }>;
  const initialState = { loggedIn: false };
  const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuotesViewComponent,
        FilterComponent,
        ComparedItemsComponent,
        QuoteViewComponent
      ],
      imports: [InfiniteScrollModule, MaterialModule, StoreModule.forRoot({})],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: Store, useValue: store },
        HttpClient,
        HttpHandler,
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesViewComponent);
    component = fixture.componentInstance;
    // component.sortValue(){

    // }
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
