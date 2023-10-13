"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const ET = new __1.EraserTailClient({
    APPLICATION_NAME: 'TEST_APP',
    APPLICATION_NAME_HUMAN: 'Test App',
    APPLICATION_COLOR_PRIMARY: '#F16523',
    APPLICATION_COLOR_SECONDARY: '#373737',
    APPLICATION_PREFIX: 'TEST >> ',
    APPLICATION_LOGGING_STYLES: null,
    APPLICATION_ICON: null,
    LOG_TO_CLOUD: true,
});
ET.log('Warn', 'my balls itch');
ET.log('Crash', 'oh no', 'stack\ntrace\nahhahahaha');
ET.log('Error', 'ouch', 'stack\ntrace\nahhahahaha');
ET.log('Info', 'nvm everything is fine!');
ET.log('Debug', 'yeah we good.');
