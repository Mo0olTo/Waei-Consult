import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Decorative strategic path. Purely visual; no labels or business claims. */
@Component({
  selector: 'app-strategy-flow',
  imports: [],
  templateUrl: './strategy-flow.html',
  styleUrl: './strategy-flow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrategyFlow {}
