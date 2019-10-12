import { DispatchSemaphore } from '../lib/dispatch';
import fetch from '../lib/fetch';
import { exit } from '../lib/stdlib';
import { stringWithData } from '../lib/string';
import { sleep } from '../lib/unistd';

const main = () => {
  const sema = new DispatchSemaphore(0);

  fetch('https://www.google.com/').then(x => {
    console.log(stringWithData(x.data!));
    sema.signal();
  });

  while (sema.waitForever() != 0) {
    sleep(1);
  }
  return 0;
};

exit(main());
