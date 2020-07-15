import Settings from '../Settings';

describe('Начинаем тестирование класса Settings', () => {
  describe('Тестируем метод setSettings:', () => {
    test.each([
      [{ name: 'dark' }, 'Нет такой настройки - name'],
      [{ theme: 'blue' }, 'Для настройки theme нет варианта blue'],
    ])(
      ('Для настроек %s должны плучить исключение %s'),
      (property, expected) => {
        const set = new Settings();

        expect(() => set.setSettings(property)).toThrow(expected);
      },
    );

    test('Должны получить пользовательские настройки', () => {
      const set = new Settings();
      const prop = { theme: 'gray', music: 'pop' };

      set.setSettings(prop);

      const expected = new Map([['theme', 'gray'], ['music', 'pop']]);

      expect(set.userSettings).toEqual(expected);
    });
  });

  describe('Тестируем метод getSetings', () => {
    test.each([
      [{ theme: 'gray', music: 'pop' }, new Map([['theme', 'gray'], ['music', 'pop'], ['difficulty', 'easy']])],
      [{ theme: 'gray' }, new Map([['theme', 'gray'], ['music', 'trance'], ['difficulty', 'easy']])],
      [{}, new Map([['theme', 'dark'], ['music', 'trance'], ['difficulty', 'easy']])],
    ])(
      ('Для настроек %s должны плучить map %s'),
      (property, expected) => {
        const set = new Settings();
        set.setSettings(property);

        expect(set.getSettings()).toEqual(expected);
      },
    );
  });

  describe('Тестируем метод resetSettings', () => {
    test('Должны получить пустой map', () => {
      const set = new Settings();
      const prop = { theme: 'gray', music: 'pop' };
      set.setSettings(prop);
      set.resetSettings();

      const received = set.userSettings.size;

      expect(received).toBe(0);
    });
  });
});
