/**
 * The Coffee Compass Engine (Plugin Module)
 * Architecture based on Barista Hustle's Coffee Compass by Matt Perger
 * Mindful Drip Lab · Specialty Coffee Extraction & Diagnosis
 */

export const COMPASS_VECTORS = {
  BALANCED: {
    id: 'balanced',
    nameEn: 'Balanced',
    nameZh: '黄金平衡',
    angle: 0,
    color: '#10b981',
    actionEn: 'Balanced',
    actionZh: '完美平衡 · 享受当前冲煮',
    guidanceEn: "You've nailed it! Sweetness, acidity, and body are in harmony with negligible dryness or bitterness.",
    guidanceZh: '恭喜！萃取酸甜高度均衡、触感多汁顺滑、杂味干涩极低。保持当前研磨刻度与冲煮手法！',
    adjustments: { grind: '保持', time: '保持', temp: '保持', ratio: '保持' }
  },
  OVER_EXTRACTED: {
    id: 'over_extracted',
    nameEn: 'Over Extracted',
    nameZh: '过度萃取',
    angle: 335,
    color: '#ef4444',
    actionEn: 'Extract Less',
    actionZh: '减少萃取 (Extract Less)',
    guidanceEn: 'Use a coarser grind and/or shorter brew time to extract less.',
    guidanceZh: '调粗研磨度 1~2 格（如手冲研磨调粗 50~100μm），或缩短冲煮耗时 15~30 秒，降低难溶苦味析出。',
    adjustments: { grind: '调粗 1~2 格', time: '缩短 15~30s', temp: '降低 1~2°C', ratio: '保持不变' }
  },
  OE_W: {
    id: 'oe_w',
    nameEn: 'Over Extracted & Weak',
    nameZh: '过萃且偏淡',
    angle: 25,
    color: '#f43f5e',
    actionEn: 'Extract Less + More Coffee / Less Water',
    actionZh: '减少萃取并增加浓度 (Extract Less + Stronger)',
    guidanceEn: 'Grind coarser to reduce over-extraction, and use more coffee or less water to increase strength.',
    guidanceZh: '调粗研磨度以避免细粉过萃发涩，同时减小粉水比（例如从 1:16 调整为 1:15）以充实体感。',
    adjustments: { grind: '调粗 1 格', time: '缩短 10~20s', temp: '微降 1°C', ratio: '加大粉量或减少水量' }
  },
  WEAK: {
    id: 'weak',
    nameEn: 'Weak',
    nameZh: '水感过淡',
    angle: 70,
    color: '#8b5cf6',
    actionEn: 'Less Water / More Coffee',
    actionZh: '增加浓度 (Less Water / More Coffee)',
    guidanceEn: 'Use less water or more coffee to increase extraction strength.',
    guidanceZh: '保持研磨度不变，提高咖啡粉量（或减少总注水量），将粉水比从 1:16 浓缩至 1:14.5~1:15。',
    adjustments: { grind: '保持或微细', time: '保持', temp: '保持', ratio: '减少注水量或增加咖啡粉' }
  },
  UE_W: {
    id: 'ue_w',
    nameEn: 'Under Extracted & Weak',
    nameZh: '欠萃且偏淡',
    angle: 115,
    color: '#06b6d4',
    actionEn: 'Extract More + More Coffee / Less Water',
    actionZh: '增加萃取并提升浓度 (Extract More + Stronger)',
    guidanceEn: 'Grind finer to extract more flavors, and use more coffee or less water to balance strength.',
    guidanceZh: '调细研磨度以萃出更多成熟糖分与芳香物质，同时减小粉水比提高浓度与醇厚感。',
    adjustments: { grind: '调细 1~2 格', time: '增加 15~20s 浸润', temp: '提升 1~2°C', ratio: '增加粉量' }
  },
  UNDER_EXTRACTED: {
    id: 'under_extracted',
    nameEn: 'Under Extracted',
    nameZh: '欠萃 (萃取不足)',
    angle: 180,
    color: '#14b8a6',
    actionEn: 'Extract More',
    actionZh: '增加萃取 (Extract More)',
    guidanceEn: 'Use a finer grind and/or longer brew time to extract more.',
    guidanceZh: '调细研磨度 1~2 格，或提高冲煮水温至 92~94°C，延长闷蒸与核心段萃取时间。',
    adjustments: { grind: '调细 1~2 格', time: '延长闷蒸 10s', temp: '升高 1~2°C', ratio: '保持不变' }
  },
  UE_S: {
    id: 'ue_s',
    nameEn: 'Under Extracted & Strong',
    nameZh: '欠萃且过浓',
    angle: 245,
    color: '#eab308',
    actionEn: 'Extract More + More Water / Less Coffee',
    actionZh: '增加萃取并适度稀释 (Extract More + Weaker)',
    guidanceEn: 'Grind finer to extract more sweetness, and use more water or less coffee to reduce strength.',
    guidanceZh: '调细研磨度拉出中后段甜感，同时加大注水量（例如将 1:14 放大至 1:16）化解刺舌高浓尖酸。',
    adjustments: { grind: '调细 1 格', time: '增加注水段数', temp: '保持或微升', ratio: '增加注水量' }
  },
  STRONG: {
    id: 'strong',
    nameEn: 'Strong',
    nameZh: '过浓发沉',
    angle: 280,
    color: '#f97316',
    actionEn: 'More Water / Less Coffee',
    actionZh: '降低浓度 (More Water / Less Coffee)',
    guidanceEn: 'Use more water or less coffee to dilute strength to ideal drinking range.',
    guidanceZh: '保持现有研磨，适当增加总注水量（或减少 1~2g 咖啡粉），稀释过于沉重的口感。',
    adjustments: { grind: '保持不变', time: '保持', temp: '保持', ratio: '增加水量或减少粉量' }
  },
  OE_S: {
    id: 'oe_s',
    nameEn: 'Over Extracted & Strong',
    nameZh: '过萃且过浓',
    angle: 305,
    color: '#dc2626',
    actionEn: 'Extract Less + More Water / Less Coffee',
    actionZh: '减少萃取并降低浓度 (Extract Less + Weaker)',
    guidanceEn: 'Grind coarser to extract less bitterness, and use more water or less coffee to dial back strength.',
    guidanceZh: '调粗研磨度 1~2 格降低焦苦，并适度放大粉水比，使风味舒展通透。',
    adjustments: { grind: '调粗 1~2 格', time: '缩短冲煮时间', temp: '降低 2°C', ratio: '增加注水量' }
  }
};

export const FLAVOR_DATABASE = [
  // Core Balanced Flavors
  { id: 'balanced', nameEn: 'Balanced', nameZh: '均衡', vector: 'balanced', ring: 0 },
  { id: 'sweet', nameEn: 'Sweet', nameZh: '清甜', vector: 'balanced', ring: 1 },
  { id: 'fruity', nameEn: 'Fruity', nameZh: '果香多汁', vector: 'balanced', ring: 1 },
  { id: 'tasty', nameEn: 'Tasty', nameZh: '鲜美适口', vector: 'balanced', ring: 1 },
  { id: 'creamy', nameEn: 'Creamy', nameZh: '奶油般丝滑', vector: 'balanced', ring: 1 },
  { id: 'smooth', nameEn: 'Smooth', nameZh: '顺滑', vector: 'balanced', ring: 1 },
  { id: 'mouth_filling', nameEn: 'Mouth-Filling', nameZh: '饱满充盈', vector: 'balanced', ring: 1 },
  { id: 'soft', nameEn: 'Soft', nameZh: '柔和温润', vector: 'balanced', ring: 1 },
  { id: 'transparent', nameEn: 'Transparent', nameZh: '通透干净', vector: 'balanced', ring: 1 },
  { id: 'gentle', nameEn: 'Gentle', nameZh: '温雅', vector: 'balanced', ring: 1 },
  { id: 'delicate', nameEn: 'Delicate', nameZh: '细腻', vector: 'balanced', ring: 1 },
  { id: 'pleasing', nameEn: 'Pleasing', nameZh: '愉悦舒适', vector: 'balanced', ring: 1 },
  { id: 'aromatic', nameEn: 'Aromatic', nameZh: '芳香馥郁', vector: 'balanced', ring: 1 },
  { id: 'rich', nameEn: 'Rich', nameZh: '浓郁深邃', vector: 'balanced', ring: 1 },
  { id: 'luscious', nameEn: 'Luscious', nameZh: '甜美多汁', vector: 'balanced', ring: 1 },

  // Over Extracted (OE)
  { id: 'bitter', nameEn: 'Bitter', nameZh: '苦涩', vector: 'over_extracted', ring: 2 },
  { id: 'dry', nameEn: 'Dry', nameZh: '舌面干燥', vector: 'over_extracted', ring: 2 },
  { id: 'intense', nameEn: 'Intense', nameZh: '刺喉焦辛', vector: 'over_extracted', ring: 3 },
  { id: 'severe', nameEn: 'Severe', nameZh: '灼痛焦烈', vector: 'over_extracted', ring: 3 },
  { id: 'harsh', nameEn: 'Harsh', nameZh: '粗糙毛刺', vector: 'over_extracted', ring: 3 },
  { id: 'soupy', nameEn: 'Soupy', nameZh: '泥汤杂浑', vector: 'over_extracted', ring: 2 },

  // Over Extracted & Weak (OE / W)
  { id: 'astringent', nameEn: 'Astringent', nameZh: '收敛发紧', vector: 'oe_w', ring: 3 },
  { id: 'dusty', nameEn: 'Dusty', nameZh: '尘土燥感', vector: 'oe_w', ring: 2 },
  { id: 'empty', nameEn: 'Empty', nameZh: '空洞乏味', vector: 'oe_w', ring: 2 },
  { id: 'powdery', nameEn: 'Powdery', nameZh: '粉末沙涩', vector: 'oe_w', ring: 2 },
  { id: 'limp', nameEn: 'Limp', nameZh: '软塌无力', vector: 'oe_w', ring: 3 },

  // Weak (W)
  { id: 'watery', nameEn: 'Watery', nameZh: '水感寡淡', vector: 'weak', ring: 3 },
  { id: 'insipid', nameEn: 'Insipid', nameZh: '索然无味', vector: 'weak', ring: 3 },
  { id: 'flimsy', nameEn: 'Flimsy', nameZh: '稀薄脆弱', vector: 'weak', ring: 2 },
  { id: 'tea_like', nameEn: 'Tea-Like', nameZh: '寡淡茶感', vector: 'weak', ring: 2 },
  { id: 'sparse', nameEn: 'Sparse', nameZh: '结构稀疏', vector: 'weak', ring: 2 },
  { id: 'dilute', nameEn: 'Dilute', nameZh: '过度稀释', vector: 'weak', ring: 2 },
  { id: 'bland', nameEn: 'Bland', nameZh: '平淡清汤', vector: 'weak', ring: 3 },

  // Under Extracted & Weak (UE / W)
  { id: 'sour_thin', nameEn: 'Sour & Thin', nameZh: '尖酸单薄', vector: 'ue_w', ring: 2 },
  { id: 'sharp_weak', nameEn: 'Sharp & Weak', nameZh: '生硬浅薄', vector: 'ue_w', ring: 3 },
  { id: 'green_vegetal', nameEn: 'Green & Vegetal', nameZh: '青草蔬菜生味', vector: 'ue_w', ring: 3 },
  { id: 'quick_finish', nameEn: 'Quick Finish', nameZh: '尾韵瞬间断层', vector: 'ue_w', ring: 2 },

  // Under Extracted (UE)
  { id: 'sour', nameEn: 'Sour', nameZh: '尖酸', vector: 'under_extracted', ring: 2 },
  { id: 'sharp', nameEn: 'Sharp', nameZh: '生硬刺舌', vector: 'under_extracted', ring: 2 },
  { id: 'salty', nameEn: 'Salty', nameZh: '咸酸无糖感', vector: 'under_extracted', ring: 3 },
  { id: 'citrusy_sharp', nameEn: 'Citrusy Sharp', nameZh: '尖锐柠檬酸', vector: 'under_extracted', ring: 2 },
  { id: 'raw', nameEn: 'Raw / Unripe', nameZh: '生豆未熟涩感', vector: 'under_extracted', ring: 3 },

  // Under Extracted & Strong (UE / S)
  { id: 'aggressive', nameEn: 'Aggressive', nameZh: '侵略性强酸', vector: 'ue_s', ring: 3 },
  { id: 'piercing', nameEn: 'Piercing', nameZh: '穿透刺喉', vector: 'ue_s', ring: 3 },
  { id: 'puckering', nameEn: 'Puckering', nameZh: '皱眉酸缩', vector: 'ue_s', ring: 2 },

  // Strong (S)
  { id: 'heavy', nameEn: 'Heavy', nameZh: '沉重发闷', vector: 'strong', ring: 2 },
  { id: 'muddy', nameEn: 'Muddy', nameZh: '浑浊混杂', vector: 'strong', ring: 3 },
  { id: 'thick', nameEn: 'Thick', nameZh: '过于浓稠', vector: 'strong', ring: 2 },
  { id: 'syrupy_heavy', nameEn: 'Heavy Syrupy', nameZh: '黏滞重糖浆', vector: 'strong', ring: 2 },

  // Over Extracted & Strong (OE / S)
  { id: 'overwhelming', nameEn: 'Overwhelming', nameZh: '压舌浓重', vector: 'oe_s', ring: 3 },
  { id: 'choking', nameEn: 'Choking', nameZh: '焦苦锁喉', vector: 'oe_s', ring: 3 },
  { id: 'burnt', nameEn: 'Burnt & Heavy', nameZh: '焦黑重味', vector: 'oe_s', ring: 3 }
];

export class CoffeeCompassEngine {
  constructor() {
    this.vectors = COMPASS_VECTORS;
    this.flavors = FLAVOR_DATABASE;
  }

  getFlavor(flavorId) {
    return this.flavors.find(f => f.id === flavorId) || null;
  }

  diagnose(flavorId) {
    const flavor = this.getFlavor(flavorId);
    if (!flavor) return null;
    const vectorKey = flavor.vector.toUpperCase();
    const vector = this.vectors[vectorKey] || this.vectors.BALANCED;
    return {
      flavor,
      vector,
      timestamp: Date.now()
    };
  }

  searchFlavors(query) {
    if (!query) return this.flavors;
    const q = query.toLowerCase().trim();
    return this.flavors.filter(f => 
      f.nameEn.toLowerCase().includes(q) || 
      f.nameZh.includes(q)
    );
  }

  getFlavorsByVector(vectorId) {
    return this.flavors.filter(f => f.vector === vectorId);
  }
}
