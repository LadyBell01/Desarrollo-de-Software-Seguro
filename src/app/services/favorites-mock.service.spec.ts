import { TestBed } from '@angular/core/testing';

import { FavoritesMock } from './favorites-mock';

describe('FavoritesMock', () => {
  let service: FavoritesMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
