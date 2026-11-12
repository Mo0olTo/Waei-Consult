import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet } from '@angular/router';

import { LoadingScreen } from './loading-screen';
import { holdForLoadingScreen } from './loading-navigation';

@Component({
  selector: 'app-loading-host',
  imports: [RouterOutlet, LoadingScreen],
  template: '<app-loading-screen /><router-outlet />',
})
class LoadingHost {}

@Component({ template: '' })
class BlankPage {}

@Component({ template: '<p>home-page</p>' })
class HomePage {}

@Component({ template: '<p>about-page</p>' })
class AboutPage {}

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
    await host.whenStable();
    host.detectChanges();

    const screen = host.nativeElement.querySelector('.loading-screen') as HTMLElement | null;
    expect(screen?.getAttribute('aria-label')).toBe('جارٍ تحميل الصفحة');
    expect(screen?.querySelector('img')?.getAttribute('src')).toBe('/images/logo/waei_logo-2.webp');
    expect(screen?.querySelectorAll('.loading-dots span').length).toBe(3);

    releaseNavigation(true);
    await pendingNavigation;
    await host.whenStable();
    host.detectChanges();

    expect(host.nativeElement.querySelector('.loading-screen')).not.toBeNull();

    await new Promise((resolve) => setTimeout(resolve, 1500));
    host.detectChanges();

    expect(host.nativeElement.querySelector('.loading-screen')).toBeNull();
  }, 10000);

  it('keeps the current page until the loading screen has covered it', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [LoadingHost],
      providers: [
        provideRouter([
          {
            path: '',
            canActivateChild: [holdForLoadingScreen],
            children: [
              { path: '', component: HomePage },
              { path: 'about', component: AboutPage },
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

    expect(host.nativeElement.textContent).toContain('home-page');

    const pendingNavigation = router.navigateByUrl('/about');
    await new Promise((resolve) => setTimeout(resolve, 80));
    host.detectChanges();

    expect(host.nativeElement.textContent).toContain('home-page');
    expect(host.nativeElement.querySelector('.loading-screen')).not.toBeNull();

    await pendingNavigation;
    await host.whenStable();
    host.detectChanges();

    expect(host.nativeElement.textContent).toContain('about-page');
    expect(host.nativeElement.querySelector('.loading-screen')).not.toBeNull();
  }, 10000);

  it('does not cover the page when only the fragment changes', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [LoadingHost],
      providers: [
        provideRouter([
          {
            path: '',
            canActivateChild: [holdForLoadingScreen],
            children: [
              { path: '', component: HomePage },
              { path: 'clients', component: AboutPage },
            ],
          },
        ]),
      ],
    }).compileComponents();

    const host = TestBed.createComponent(LoadingHost);
    const router = TestBed.inject(Router);
    host.detectChanges();

    await router.navigateByUrl('/clients');
    await host.whenStable();
    host.detectChanges();

    const pendingNavigation = router.navigateByUrl('/clients#client-segments');
    await host.whenStable();
    host.detectChanges();
    await pendingNavigation;

    expect(host.nativeElement.querySelector('.loading-screen')).toBeNull();
    expect(router.url).toBe('/clients#client-segments');
  });
});
