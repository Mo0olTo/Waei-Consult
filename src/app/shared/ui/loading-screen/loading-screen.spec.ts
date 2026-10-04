import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';

import { LoadingScreen } from './loading-screen';

@Component({
  selector: 'app-loading-host',
  imports: [RouterOutlet, LoadingScreen],
  template: '<app-loading-screen /><router-outlet />',
})
class LoadingHost {}

@Component({ template: '' })
class BlankPage {}

describe('LoadingScreen', () => {
  let component: LoadingScreen;
  let fixture: ComponentFixture<LoadingScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingScreen],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stays hidden on the first page and shows during a later navigation', async () => {
    TestBed.resetTestingModule();

    let releaseNavigation: (allowed: boolean) => void = () => undefined;

    await TestBed.configureTestingModule({
      imports: [LoadingHost],
      providers: [
        provideRouter([
          { path: '', component: BlankPage },
          {
            path: 'about',
            component: BlankPage,
            canActivate: [
              () =>
                new Promise<boolean>((resolve) => {
                  releaseNavigation = resolve;
                }),
            ],
          },
        ]),
      ],
    }).compileComponents();

    const host = TestBed.createComponent(LoadingHost);
    const router = TestBed.inject(Router);
    host.detectChanges();

    await router.navigateByUrl('/');
    await host.whenStable();
    host.detectChanges();

    expect(host.nativeElement.querySelector('.loading-screen')).toBeNull();

    const pendingNavigation = router.navigateByUrl('/about');
    await new Promise((resolve) => setTimeout(resolve, 200));
    host.detectChanges();

    const screen = host.nativeElement.querySelector('.loading-screen') as HTMLElement | null;
    expect(screen?.getAttribute('aria-label')).toBe('جارٍ تحميل الصفحة');
    expect(screen?.querySelector('img')?.getAttribute('src')).toBe('/images/logo/waei_logo-2.png');
    expect(screen?.querySelectorAll('.loading-dots span').length).toBe(3);

    releaseNavigation(true);
    await pendingNavigation;
    await host.whenStable();
    host.detectChanges();

    expect(host.nativeElement.querySelector('.loading-screen')).toBeNull();
  });
});
