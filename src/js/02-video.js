import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY = 'videoplayer-current-time';

console.log(KEY);

const onTimeUpdate = function (event) {
  console.log(event.seconds);
  localStorage.setItem('KEY', event.seconds);
};
player.on('timeupdate', throttle(onTimeUpdate, 1000));

const onSaveCurrentTime = localStorage.getItem('KEY');
console.log(onSaveCurrentTime);

if (onSaveCurrentTime) {
  player.setCurrentTime(onSaveCurrentTime);
}
