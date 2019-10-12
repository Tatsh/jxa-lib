import { DispatchSemaphore } from '../lib/dispatch';
import fetch from '../lib/fetch';
import { exit } from '../lib/stdlib';
import { sleep } from '../lib/unistd';

const main = () => {
  const sema = new DispatchSemaphore(0);

  fetch('https://www.google.com/').then(x => {
    console.log(
      ObjC.unwrap(
        $.NSString.alloc.initWithDataEncoding(x.data!, $.NSASCIIStringEncoding)
      )
    );
    sema.signal();
  });

  while (sema.wait($.DISPATCH_TIME_FOREVER) > 0) {
    sleep(1);
  }
  return 0;
};

exit(main());
