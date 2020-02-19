import { TestBed } from "@angular/core/testing";

import { HttpApiService } from "./wrapper-service.service";

describe("WrapperServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: HttpApiService = TestBed.get(HttpApiService);
    expect(service).toBeTruthy();
  });
});
