import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

console.log(STORAGE_KEY);

const onTimeUpdate = function (event) {
  console.log(event.seconds);
  localStorage.setItem(STORAGE_KEY, event.seconds);
};
player.on('timeupdate', throttle(onTimeUpdate, 1000));

const onSaveCurrentTime = localStorage.getItem(STORAGE_KEY);
console.log(onSaveCurrentTime);

if (onSaveCurrentTime) {
  player.setCurrentTime(onSaveCurrentTime);
}
