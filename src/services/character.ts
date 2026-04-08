import { CharacterData } from '@/types/character';

export const getCharacterData = async (): Promise<CharacterData> => {
  // TODO: Заменить на реальный API-запрос
  // const { data } = await axios.get('/api/character');
  // return data;

  return {
    steps: [
      { id: 'race', number: 1, title: 'Раса', icon: 'user' },
      { id: 'subrace', number: 2, title: 'Под раса', icon: 'star' },
      { id: 'class', number: 3, title: 'Класс', icon: 'sword' },
      { id: 'subclass', number: 4, title: 'Под класс', icon: 'shield' },
      { id: 'origin', number: 5, title: 'Происхождение', icon: 'compass' },
      { id: 'stats', number: 6, title: 'Характеристики', icon: 'chart' },
    ],
    races: [
      {
        id: 'human',
        name: 'Человек',
        description: 'Самые распространённые существа в мире. Люди известны своей адаптивностью и амбициозностью.',
        modifier: { strength: 1, agility: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
      },
      {
        id: 'elf',
        name: 'Эльф',
        description: 'Долгоживущие существа с острым чувством красоты и магии. Обладают врождённым талантом к ловкости.',
        modifier: { agility: 2, wisdom: 1 },
      },
      {
        id: 'dwarf',
        name: 'Дварф',
        description: 'Мастера кузнечного дела и горного дела. Известны своей выносливостью и стойкостью.',
        modifier: { strength: 2, constitution: 2 },
      },
      {
        id: 'halfling',
        name: 'Халфлинг',
        description: 'Маленькие, но ловкие существа. Известны своей удачей и любовью к приключениям.',
        modifier: { agility: 2, charisma: 1 },
      },
      {
        id: 'orc',
        name: 'Орк',
        description: 'Сильные и выносливые воины. Обладают мощью и агрессивным стилем боя.',
        modifier: { strength: 2, constitution: 1, charisma: -1 },
      },
    ],
    subRaces: [
      { id: 'human-default', name: 'Обычный человек', raceId: 'human', description: 'Стандартный представитель человеческой расы.', modifier: {} },
      { id: 'orc-default', name: 'Обычный орк', raceId: 'orc', description: 'Стандартный представитель оркской расы.', modifier: {} },
      { id: 'high-elf', name: 'Высший эльф', raceId: 'elf', description: 'Эльфы, практикующие магию и искусство.', modifier: { intelligence: 1, charisma: 1 } },
      { id: 'wood-elf', name: 'Лесной эльф', raceId: 'elf', description: 'Эльфы, живущие в гармонии с природой.', modifier: { agility: 1, wisdom: 1 } },
      { id: 'mountain-dwarf', name: 'Горный дварф', raceId: 'dwarf', description: 'Дварфы, живущие в горных крепостях.', modifier: { strength: 2 } },
      { id: 'hill-dwarf', name: 'Холмовый дварф', raceId: 'dwarf', description: 'Дварфы, исследующие холмы и пещеры.', modifier: { wisdom: 1, constitution: 1 } },
      { id: 'lightfoot', name: 'Светлоног', raceId: 'halfling', description: 'Халфлинги, известные своей скрытностью.', modifier: { charisma: 1, agility: 1 } },
      { id: 'stout', name: 'Крепкий', raceId: 'halfling', description: 'Халфлинги с дварфьей кровью.', modifier: { constitution: 1, agility: 1 } },
    ],
    classes: [
      {
        id: 'warrior',
        name: 'Воин',
        description: 'Мастера ближнего боя, владеющие всеми видами оружия и доспехов.',
        recommendedStats: { strength: 14, constitution: 14, agility: 12 },
      },
      {
        id: 'mage',
        name: 'Маг',
        description: 'Исполнители могущественных заклинаний, черпающие силу из магических источников.',
        recommendedStats: { intelligence: 15, wisdom: 12, constitution: 10 },
      },
      {
        id: 'rogue',
        name: 'Плут',
        description: 'Специалисты по скрытности, ловушкам и точным ударам из тени.',
        recommendedStats: { agility: 15, dexterity: 14, charisma: 10 },
      },
      {
        id: 'cleric',
        name: 'Жрец',
        description: 'Служители божеств, обладающие исцеляющей и защитной магией.',
        recommendedStats: { wisdom: 15, constitution: 12, charisma: 10 },
      },
      {
        id: 'ranger',
        name: 'Следопыт',
        description: 'Воины природы, мастера дальнего боя и выживания.',
        recommendedStats: { agility: 14, wisdom: 14, constitution: 12 },
      },
    ],
    subClasses: [
      { id: 'champion', name: 'Чемпион', classId: 'warrior', description: 'Сильный и выносливый воин, полагающийся на грубую силу.' },
      { id: 'battle-master', name: 'Мастер боя', classId: 'warrior', description: 'Тактический боец, использующий боевые приёмы.' },
      { id: 'evocation', name: 'Эвокация', classId: 'mage', description: 'Маг, специализирующийся на боевой магии.' },
      { id: 'necromancy', name: 'Некромантия', classId: 'mage', description: 'Маг, изучающий силы смерти и тьмы.' },
      { id: 'assassin', name: 'Ассасин', classId: 'rogue', description: 'Мастер скрытного убийства.', },
      { id: 'trickster', name: 'Плут', classId: 'rogue', description: 'Ловкий обманщик и манипулятор.' },
      { id: 'light-cleric', name: 'Жрец Света', classId: 'cleric', description: 'Жрец, несущий свет и защиту.', },
      { id: 'war-cleric', name: 'Боевой жрец', classId: 'cleric', description: 'Жрец-воец, сочетающий веру и оружие.' },
      { id: 'beast-master', name: 'Повелитель зверей', classId: 'ranger', description: 'Следопыт, дружащий с животными.' },
      { id: 'hunter', name: 'Охотник', classId: 'ranger', description: 'Следопыт, специализирующийся на охоте на монстров.' },
    ],
    origins: [
      { id: 'noble', name: 'Дворянин', description: 'Вырос в богатстве и привилегиях, знаком с этикетом высшего общества.', bonus: '+1 Харизма' },
      { id: 'soldier', name: 'Солдат', description: 'Опытный ветеран множества сражений, знает военное дело.', bonus: '+1 Сила или Ловкость' },
      { id: 'scholar', name: 'Учёный', description: 'Обучался в библиотеках и академиях, обладаешь широкими познаниями.', bonus: '+1 Интеллект' },
      { id: 'peasant', name: 'Крестьянин', description: 'Вырос в труде и лишениях, знаешь цену тяжёлой работы.', bonus: '+1 Телосложение' },
      { id: 'criminal', name: 'Преступник', description: 'Жил на грани закона, приобрёл навыки обмана и скрытности.', bonus: '+1 Ловкость' },
      { id: 'hermit', name: 'Отшельник', description: 'Провёл годы в уединении, обретя мудрость и внутренний покой.', bonus: '+1 Мудрость' },
    ],
    statsInfo: [
      { name: 'Сила', shortName: 'СИЛ', description: 'Определяет физическую мощь, грузоподъёмность и силу атаки в ближнем бою.', icon: 'strength' },
      { name: 'Ловкость', shortName: 'ЛОВ', description: 'Влияет на скорость, координацию, reflexes и класс брони.', icon: 'agility' },
      { name: 'Телосложение', shortName: 'ТЕЛ', description: 'Определяет здоровье, выносливость и устойчивость к ядам.', icon: 'constitution' },
      { name: 'Интеллект', shortName: 'ИНТ', description: 'Влияет на магические способности мага, знания и память.', icon: 'intelligence' },
      { name: 'Мудрость', shortName: 'МДР', description: 'Определяет восприятие, интуицию и силу жреческой магии.', icon: 'wisdom' },
      { name: 'Харизма', shortName: 'ХАР', description: 'Влияет на общение, убеждение и силу колдовства.', icon: 'charisma' },
    ],
  };
};
