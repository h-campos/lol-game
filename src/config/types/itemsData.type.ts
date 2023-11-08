export interface ItemsData {
  type: string;
  version: string;
  basic: Basic;
  data: Items[];
  groups?: (GroupsEntity)[] | null;
  tree?: (TreeEntity)[] | null;
}
export interface Basic {
  name: string;
  rune: Rune;
  gold: Gold;
  group: string;
  description: string;
  colloq: string;
  plaintext: string;
  consumed: boolean;
  stacks: number;
  depth: number;
  consumeOnFull: boolean;
  from?: (null)[] | null;
  into?: (null)[] | null;
  specialRecipe: number;
  inStore: boolean;
  hideFromAll: boolean;
  requiredChampion: string;
  requiredAlly: string;
  stats: Stats;
  tags?: (null)[] | null;
  maps: Maps;
}

export interface Rune {
  isrune: boolean;
  tier: number;
  type: string;
}

export interface Gold {
  base: number;
  total: number;
  sell: number;
  purchasable: boolean;
}

export interface Stats {
  FlatHPPoolMod: number;
  rFlatHPModPerLevel: number;
  FlatMPPoolMod: number;
  rFlatMPModPerLevel: number;
  PercentHPPoolMod: number;
  PercentMPPoolMod: number;
  FlatHPRegenMod: number;
  rFlatHPRegenModPerLevel: number;
  PercentHPRegenMod: number;
  FlatMPRegenMod: number;
  rFlatMPRegenModPerLevel: number;
  PercentMPRegenMod: number;
  FlatArmorMod: number;
  rFlatArmorModPerLevel: number;
  PercentArmorMod: number;
  rFlatArmorPenetrationMod: number;
  rFlatArmorPenetrationModPerLevel: number;
  rPercentArmorPenetrationMod: number;
  rPercentArmorPenetrationModPerLevel: number;
  FlatPhysicalDamageMod: number;
  rFlatPhysicalDamageModPerLevel: number;
  PercentPhysicalDamageMod: number;
  FlatMagicDamageMod: number;
  rFlatMagicDamageModPerLevel: number;
  PercentMagicDamageMod: number;
  FlatMovementSpeedMod: number;
  rFlatMovementSpeedModPerLevel: number;
  PercentMovementSpeedMod: number;
  rPercentMovementSpeedModPerLevel: number;
  FlatAttackSpeedMod: number;
  PercentAttackSpeedMod: number;
  rPercentAttackSpeedModPerLevel: number;
  rFlatDodgeMod: number;
  rFlatDodgeModPerLevel: number;
  PercentDodgeMod: number;
  FlatCritChanceMod: number;
  rFlatCritChanceModPerLevel: number;
  PercentCritChanceMod: number;
  FlatCritDamageMod: number;
  rFlatCritDamageModPerLevel: number;
  PercentCritDamageMod: number;
  FlatBlockMod: number;
  PercentBlockMod: number;
  FlatSpellBlockMod: number;
  rFlatSpellBlockModPerLevel: number;
  PercentSpellBlockMod: number;
  FlatEXPBonus: number;
  PercentEXPBonus: number;
  rPercentCooldownMod: number;
  rPercentCooldownModPerLevel: number;
  rFlatTimeDeadMod: number;
  rFlatTimeDeadModPerLevel: number;
  rPercentTimeDeadMod: number;
  rPercentTimeDeadModPerLevel: number;
  rFlatGoldPer10Mod: number;
  rFlatMagicPenetrationMod: number;
  rFlatMagicPenetrationModPerLevel: number;
  rPercentMagicPenetrationMod: number;
  rPercentMagicPenetrationModPerLevel: number;
  FlatEnergyRegenMod: number;
  rFlatEnergyRegenModPerLevel: number;
  FlatEnergyPoolMod: number;
  rFlatEnergyModPerLevel: number;
  PercentLifeStealMod: number;
  PercentSpellVampMod: number;
}

export interface Maps {
  1: boolean;
  8: boolean;
  10: boolean;
  12: boolean;
}

export interface GroupsEntity {
  id: string;
  MaxGroupOwnable: string;
}

export interface TreeEntity {
  header: string;
  tags?: (string)[] | null;
}

export interface ItemsData {
  1001: 1001;
}
export interface Items {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  into?: (string)[] | null;
  image: Image;
  gold: Gold;
  tags?: (string)[] | null;
  maps: Maps;
  stats: Stats;
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
export interface Gold {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}
export interface Maps {
  11: boolean;
  12: boolean;
  21: boolean;
  22: boolean;
  30: boolean;
}
export interface Stats {
  FlatMovementSpeedMod: number;
}