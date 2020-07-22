import { properties } from './properties';

export default class Settings {
  constructor(settings) {
    this.defaultSettings = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]);

    if (arguments.length == 0) {
      this.userSettings = new Map();
    } else {
      this.userSettings = settings;
    }    
  }

  get settings() {
    if (this.userSettings.size === 0) {
      return this.defaultSettings;
    }

    const crossSet = new Map([...this.defaultSettings]);

    this.userSettings.forEach((item, key) => {
      crossSet.set(key, item);
    });

    return crossSet;
  }
}
