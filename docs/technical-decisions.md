# Technical Decisions

## 1. Framework

Angular 21.

Reason:
- modern Angular architecture
- standalone components
- strong TypeScript support
- SSR support
- maintainability

## 2. Backend

No backend.

The current website contains static corporate content.

Do not introduce an API layer unless project requirements change.

## 3. State Management

No global state management library.

NgRx is unnecessary for the current scope.

Use local component state/signals when required.

## 4. Routing

Angular Router is used.

Routes represent meaningful public pages.

## 5. Rendering

Prefer SSR / prerendering for SEO-sensitive static content.

## 6. Styling

Use the styling system already configured in the project.

Tailwind may be used if configured.

Do not introduce another CSS framework.

## 7. Content

Business content is maintained separately from UI implementation.

Source of truth:

docs/content.md

## 8. SEO

SEO is a first-class requirement.

Every public page should have unique metadata.

## 9. Accessibility

Accessibility is part of the implementation, not a final optional step.

## 10. Performance

Prioritize:

- optimized images
- minimal dependencies
- lazy loading
- defer non-critical content
- semantic HTML
- small JavaScript footprint

## 11. Contact

Contact information must not be invented.

It should be added only when official company contact details are supplied.