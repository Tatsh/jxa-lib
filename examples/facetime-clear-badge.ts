// This tool clears the badge of the FaceTime app by swapping between the first
// and second tabs.
// A tool like Browserify must be run on the output script for this to work.
import { exit } from '../lib/stdlib';

const quit = (appl: Application, status = 0) => {
  appl.quit();
  exit(status);
};

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
    // tslint:disable-next-line:no-magic-numbers
    delay(0.25);
  } catch (e) {
    quit(app, 1);
  }
}
delay(1);
quit(app);
