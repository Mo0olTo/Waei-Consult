import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ChartBar {
  x: number;
  h: number;
}

interface ChartPoint {
  x: number;
  y: number;
}

interface ChartStage {
  x: number;
  label: string;
}

/**
 * Decorative growth curve used as a hero background layer.
 * The shape is illustrative only: no units, values, or dates (see docs/content.md integrity rule).
 */
@Component({
  selector: 'app-growth-chart',
  imports: [],
  templateUrl: './growth-chart.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrowthChart {
  // Early dip, recovery, then compounding growth.
  protected readonly linePath =
    'M40 238 C90 234 120 254 165 242 S240 200 290 192 S370 160 425 126 S530 76 600 46';
  protected readonly areaPath = `${this.linePath} L600 280 L40 280 Z`;

  protected readonly guides: readonly number[] = [60, 115, 170, 225];

  protected readonly bars: readonly ChartBar[] = [
    { x: 58, h: 38 },
    { x: 128, h: 30 },
    { x: 198, h: 52 },
    { x: 268, h: 70 },
    { x: 338, h: 96 },
    { x: 408, h: 128 },
    { x: 478, h: 170 },
    { x: 548, h: 212 },
  ];

  protected readonly markers: readonly ChartPoint[] = [
    { x: 165, y: 242 },
    { x: 290, y: 192 },
    { x: 425, y: 126 },
    { x: 600, y: 46 },
  ];

  // The four methodology stages from docs/content.md.
  protected readonly stages: readonly ChartStage[] = [
    { x: 110, label: 'التأسيس' },
    { x: 270, label: 'النمو' },
    { x: 430, label: 'التوسع' },
    { x: 580, label: 'الاستدامة' },
  ];
}
