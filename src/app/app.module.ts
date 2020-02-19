import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { MaterialModule } from "./modules/material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeModule } from "./modules/home/home.module";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PrefixInterceptor } from "./core/interceptors/prefix-interceptors";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { LoaderInterceptor } from "./core/interceptors/loader.interceptot";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { NotFoundComponent } from "./not-found/not-found.component";
// import {
//   Overlay,
//   BlockScrollStrategy,
//   CloseScrollStrategy
// } from "@angular/cdk/overlay";
// import {
//   MAT_SELECT_SCROLL_STRATEGY,
//   MAT_DATEPICKER_SCROLL_STRATEGY
// } from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CarouselModule } from "ngx-owl-carousel-o";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AuthenticationInterceptor } from "./core/interceptors/authentication.intercptor";
import { TestComponent } from "./test/test.component";
import { MainSliderComponent } from "./modules/home/components/main-slider/main-slider.component";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
// export function scrollFactory(overlay: Overlay): () => CloseScrollStrategy {
//   return () => overlay.scrollStrategies.close();
// }
@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    NotFoundComponent,
    TestComponent,
    MainSliderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    HomeModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CarouselModule,
    CoreModule,
    BrowserAnimationsModule,
    RouterModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability: true,
        // strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    AuthenticationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PrefixInterceptor, multi: true },
    // {
    //   provide: MAT_SELECT_SCROLL_STRATEGY,
    //   useFactory: scrollFactory,
    //   deps: [Overlay]
    // },
    // {
    //   provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    //   useFactory: scrollFactory,
    //   deps: [Overlay]
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }

    // { provide: stateKeys, useValue: ["basicInfo"] },
    // { provide: localStorageKey, useValue: "__app_storage__" },
    // {
    //   provide: META_REDUCERS,
    //   deps: [stateKeys, localStorageKey],
    //   useFactory: getMetaReducers
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
