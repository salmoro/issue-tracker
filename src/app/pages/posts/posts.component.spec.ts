import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from 'src/app/shared/data/data.service';
import { MockDataService } from 'src/app/shared/data/mock.data.service';

import { PostsComponent } from './posts.component';
import { PostsModule } from './posts.module';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [PostsModule],
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
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
