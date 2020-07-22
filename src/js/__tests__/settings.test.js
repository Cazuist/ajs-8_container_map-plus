import Settings from '../Settings';

describe('Начинаем тестирование класса Settings', () => {
  describe('Тестируем constructor:', () => {
    test('Должны получить пользовательские настройки', () => {
      const settings = new Map([['theme', 'gray'], ['music', 'pop']]);
      const set = new Settings(settings);

      expect(set.userSettings).toEqual(settings);
    });

    test('Должны получить пустой Map если конструктор без аргументом', () => {
      const set = new Settings();

      expect(set.userSettings).toEqual(new Map());
    });

    test.each([
      [new Map([['drop', 'gray']]), new Map()],
      [new Map([['theme', 'drop']]), new Map()],
    ])(
      ('Для настроек %s должны плучить пустой Map'),
      (property, expected) => {
        const set = new Settings(property);

        expect(set.userSettings).toEqual(expected);
      },
    );
  });

  describe('Тестируем геттер setings', () => {
    test.each([
      [new Map([['theme', 'gray'], ['music', 'pop']]), new Map([['theme', 'gray'], ['music', 'pop'], ['difficulty', 'easy']])],
      [new Map([['theme', 'gray']]), new Map([['theme', 'gray'], ['music', 'trance'], ['difficulty', 'easy']])],
      [new Map(), new Map([['theme', 'dark'], ['music', 'trance'], ['difficulty', 'easy']])],
    ])(
      ('Для настроек %s должны плучить map %s'),
      (property, expected) => {
        const set = new Settings(property);

        expect(set.settings).toEqual(expected);
      },
    );
  });
});
