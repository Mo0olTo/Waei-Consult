import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Decorative "decision target" rings for the hero. Purely visual; no text or data. */
@Component({
  selector: 'app-decision-rings',
  imports: [],
  templateUrl: './decision-rings.html',
  styleUrl: './decision-rings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecisionRings {
  // 12 subtle tick marks on the outer ring (every 30°).
  protected readonly ticks: readonly number[] = Array.from({ length: 12 }, (_, i) => i * 30);

  // Three nodes that drift along the counter-clockwise ring.
  protected readonly nodes: readonly number[] = [20, 140, 260];
}
