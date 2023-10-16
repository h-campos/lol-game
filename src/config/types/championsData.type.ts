export interface ChampionsDataType {
  type: string;
  format: string;
  version: string;
  data: { [championName: string]: ChampionData };
}

export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  image: Image;
  skins?: SkinsEntity[] | null;
  lore: string;
  blurb: string;
  allytips?: string[] | null;
  enemytips?: string[] | null;
  tags?: string[] | null;
  partype: string;
  info: Info;
  stats: Stats;
  spells?: SpellsEntity[] | null;
  passive: Passive;
  recommended?: null[] | null;
}

export interface Image {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface SkinsEntity {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}
export interface Info {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}
export interface Stats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}
export interface SpellsEntity {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: Leveltip;
  maxrank: number;
  cooldown?: (number)[] | null;
  cooldownBurn: string;
  cost?: (number)[] | null;
  costBurn: string;
  datavalues: Datavalues;
  effect?: ((number)[] | null)[] | null;
  effectBurn?: (string | null)[] | null;
  vars?: (null)[] | null;
  costType: string;
  maxammo: string;
  range?: (number)[] | null;
  rangeBurn: string;
  image: Image;
  resource: string;
}
export interface Leveltip {
  label?: (string)[] | null;
  effect?: (string)[] | null;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Datavalues {
}
export interface Passive {
  name: string;
  description: string;
  image: Image;
}