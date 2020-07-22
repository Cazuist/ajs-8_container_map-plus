import { properties } from './properties';

export default class Settings {
  constructor(settings) {
    this.defaultSettings = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]);

    // eslint-disable-next-line  prefer-rest-params
    if (arguments.length === 0 || arguments[0].size === 0) {
      this.userSettings = new Map();
    } else {
      for (const [name, prop] of settings) {
        if (properties.has(name)) {
          if (properties.get(name).includes(prop)) {
            this.userSettings = settings;
          } else {
            this.userSettings = new Map();
          }
        } else {
          this.userSettings = new Map();
        }
      }
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
