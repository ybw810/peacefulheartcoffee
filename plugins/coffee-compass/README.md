# The Coffee Compass Plugin for Mindful Drip

> 灵感源自 **Barista Hustle by Matt Perger** 的经典咖啡萃取风味罗盘模型。  
> 专为 **Mindful Drip** 设计的高内聚、可独立插拔插件模块。

---

## 🧭 模块架构与功能

1. **8 维萃取向量诊断 (8-Quadrant Vectors)**：
   - `Balanced` (黄金平衡点，酸甜顺滑多汁)
   - `Over Extracted` (过度萃取 ➔ 减少萃取，调粗研磨)
   - `OE / W` (过萃且偏淡 ➔ 调粗研磨并增加粉量)
   - `Weak` (水感过淡 ➔ 减少水量或增加粉量)
   - `UE / W` (欠萃且偏淡 ➔ 增加萃取并适度提高浓度)
   - `Under Extracted` (欠萃不足 ➔ 增加萃取，调细研磨或提高水温)
   - `UE / S` (欠萃且过浓 ➔ 调细研磨拉出甜感，并加大注水稀释尖酸)
   - `Strong` (浓度发沉 ➔ 增加水量或减少粉量)
   - `OE / S` (过萃且过浓 ➔ 调粗研磨并加大水量)

2. **40+ 专业风味词典 (`FLAVOR_DATABASE`)**：
   - 涵盖从核心均衡甜感（Sweet, Fruity, Creamy, Transparent）到典型缺陷味（Bitter, Dry, Astringent, Sour, Salty, Vegetal, Muddy, Burnt 等）；
   - 中英双语对照与严重程度分级 (Ring 0-3)。

3. **智能处方生成**：
   - 包含明确的物理参数调整方向：
     - **Grind** (研磨度)
     - **Time** (注水耗时)
     - **Temp** (冲煮水温)
     - **Ratio** (粉水比例)

---

## 🔌 引入与挂载使用

```javascript
import { CoffeeCompassEngine } from './plugins/coffee-compass/compass-engine.js';

const compass = new CoffeeCompassEngine();

// 1. 根据喝到的风味痛点诊断
const result = compass.diagnose('bitter');
console.log(result.vector.actionZh); // "减少萃取 (Extract Less)"
console.log(result.vector.guidanceZh); // "调粗研磨度 1~2 格..."
console.log(result.vector.adjustments); // { grind: '调粗 1~2 格', time: '缩短 15~30s', ... }

// 2. 搜索风味
const matches = compass.searchFlavors('酸');
```
