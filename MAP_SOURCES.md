# 旅行地图数据

## 中国地图

省级边界来自阿里云 DataV.GeoAtlas 公开地图数据接口。旅行视图显示包含 34 个省级地区的主图。生成脚本跳过原先绘制在右下角附图中的多边形。地区标识采用来源数据中的六位行政区划代码。[DataV.GeoAtlas](https://datav.aliyun.com/portal/school/atlas/area_selector)

原始数据地址为 [100000_full.json](https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json)，获取日期为 2026 年 11 月 4 日。

## 世界地图

世界边界采用 Natural Earth 的 1:50m Admin 0 Countries 数据。除南极洲外，当前交互层包含 241 个国家与地区，因此界面使用“国家与地区”作为计数单位。Natural Earth 数据为公共领域数据。[原始 GeoJSON](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson) · [使用条款](https://www.naturalearthdata.com/about/terms-of-use/)

获取日期为 2026 年 11 月 4 日。地区标识优先使用来源数据中的三位 ISO 代码，少数无对应代码的要素沿用其 ADM0_A3 标识。

## 显示与到访记录

原始多边形经投影、简化与坐标取整后，保存在 `dist/assets/maps.js` 中。较小地区附有点状标记，也可以通过下拉列表选择。所有地图边界和名称均随网站本地提供。

实际到访名单独立保存在 `dist/content.js` 的 `life.travel` 中。当前两份名单均为空数组。蓝色表示已到访，暗蓝灰色表示未到访。选中地区只改变描边，并展示名称及状态。
