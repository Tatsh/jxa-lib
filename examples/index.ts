import { exit } from '../lib/stdlib';
import { applicationWithStandardAdditions } from '../lib/util';
import clearFaceTimeBadge from './facetime-clear-badge';
import fetchGoogle from './fetch-google-command';
import refreshSelectedTags from './refresh-selected-tags';
import refreshTags from './refresh-tags';
import resetFaceTimeBlockList from './reset-facetime-block-list';

export const main = () => {
  const finder = applicationWithStandardAdditions('Finder');
  const item = finder.chooseFromList(
    [
      'Clear Badge of FaceTime.app',
      'Fetch google.com with NSURLSession (fetch-like API)',
      'Refresh selected tags in Music.app',
      'Refresh all tags in Music.app',
      'Reset the FaceTime block list'
    ],
    {
      withTitle: 'jxalib examples',
      withPrompt:
        'Please open the associated app with the task you choose before ' +
        'clicking OK.\n\n' +
        `If you choose "Reset the FaceTime block list", have FaceTime.app's ` +
        'Preferences window already open.\n',
      multipleSelectionsAllowed: false,
      emptySelectionAllowed: false
    }
  );
  if (!item || !item.length) {
    return 0;
  }
  switch (item[0] as string) {
    case 'Clear Badge of FaceTime.app':
      return clearFaceTimeBadge();

    case 'Fetch google.com with NSURLSession (fetch-like API)':
      return fetchGoogle();

    case 'Refresh selected tags in Music.app':
      return refreshSelectedTags();

    case 'Refresh all tags in Music.app':
      return refreshTags();

    case 'Reset the FaceTime block list':
      return resetFaceTimeBlockList();

    default:
      return 1;
  }
};

exit(main());
