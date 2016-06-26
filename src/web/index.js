/**
 * @file renderer index
 * @author leon<ludafa@kavout.com>
 */

import {ipcRenderer} from 'electron';
import moment from 'moment';

const canvas = document.createElement('canvas');
const width = 128;
canvas.height = 24;
canvas.width = width;
const context = canvas.getContext('2d');

function createTimeImage() {
    const s = moment().format('YYYY-MM-DD HH:mm');
    context.clearRect(0, 0, width, 24);
    context.font = '16px Helvetica Neue';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(s, width / 2, 12);
    ipcRenderer.send('tray-update', canvas.toDataURL('image/png', 1));
}

createTimeImage();

setInterval(createTimeImage, 10 * 1000);

document.querySelector('main').innerHTML = 'hello electron';
