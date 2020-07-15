import { properties } from './properties';

export default class Settings {
  constructor() {
    this.defaultSettings = new Map([
      ['theme', 'dark'],
      ['music', 'trance'],
      ['difficulty', 'easy'],
    ]);

    this.userSettings = new Map();
  }

  setSettings(obj) {
    const { ...settings } = obj;

    for (const [name, prop] of Object.entries(settings)) {
      if (properties.has(name)) {
        if (properties.get(name).includes(prop)) {
          this.userSettings.set(name, prop);
        } else {
          throw new Error(`Для настройки ${name} нет варианта ${prop}`);
        }
      } else {
        throw new Error(`Нет такой настройки - ${name}`);
      }
    }
  }

  getSettings() {
    if (this.userSettings.size === 0) {
      return this.defaultSettings;
    }

    const crossSet = new Map([...this.defaultSettings]);

    this.userSettings.forEach((item, key) => {
      crossSet.set(key, item);
    });

    return crossSet;
  }

  resetSettings() {
    this.userSettings.clear();
  }
}
