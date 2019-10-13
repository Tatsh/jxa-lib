// This tool clears the badge of the FaceTime app by swapping between the first
// and second tabs.
// A tool like Browserify must be run on the output script for this to work.
import { exit, getenv } from '../lib/stdlib';

export default function clearFaceTimeBadge() {
  const standalone = (getenv('_') as string).endsWith(
    'facetime-clear-badge.ts'
  );
  const app = Application('FaceTime');
  app.activate();
  delay(2);

  const se = Application('System Events');
  const ft = se.processes['FaceTime'];
  ft.visible = false;
  const group = ft.windows[0].radioGroups[0];

  for (const x of [1, 0, 1, 0]) {
    try {
      group.radioButtons[x].click();
      delay(0.25);
    } catch (e) {
      app.quit();
      return 1;
    }
  }
  delay(1);

  app.quit();
  if (standalone) {
    exit(0);
  }
  return 0;
}
