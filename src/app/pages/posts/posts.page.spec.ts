import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/shared/data/data.service';
import { MockDataService } from 'src/app/shared/data/mock.data.service';

import { PostsPage } from './posts.page';
import { PostsModule } from './posts.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PostsPage', () => {
  let component: PostsPage;
  let fixture: ComponentFixture<PostsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [PostsModule, NoopAnimationsModule],
      providers: [
          {
              provide: DataService,
              useValue: new MockDataService()
          }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
