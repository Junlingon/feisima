"use client"

import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductDetailSection } from "@/components/product-detail-section"

// 产品数据
const products = [
  {
    id: "1",
    name: "VIESMAR 英伦淋浴房",
    price: "¥12,890",
    originalPrice: "¥15,890",
    category: "淋浴房系列",
    description: "采用英国设计理念，融合现代简约风格与传统工艺精髓。精选安全钢化玻璃配合304不锈钢框架，为您打造安全舒适的淋浴空间。",
    longDescription: "VIESMAR英伦淋浴房系列，源自英国皇室御用工艺传承，每一件产品都经过严格的品质检验。采用8mm安全钢化玻璃，通过3C认证，抗冲击性能是普通玻璃的5倍以上。304不锈钢框架经过特殊防腐处理，即使在潮湿环境中也能保持光亮如新。",
    features: [
      "8mm安全钢化玻璃，防爆防裂",
      "304不锈钢框架，防锈耐腐蚀", 
      "德国进口五金配件，开合顺滑",
      "防水胶条密封，滴水不漏",
      "可定制尺寸，适配各种空间"
    ],
    specifications: {
      "尺寸": "W: 120cm × D: 90cm × H: 200cm",
      "材质": "8mm钢化玻璃 + 304不锈钢",
      "开启方式": "推拉门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "5年质保"
    },
    images: [
      "/images/products/shower/shower-prod-0-0.jpg",
      "/images/products/shower/shower-prod-0-1.jpg", 
      "/images/products/shower/shower-prod-0-2.jpg",
      "/images/products/shower/shower-prod-0-3.jpg",
    ],
    badge: "New",
    materials: ["安全钢化玻璃", "304不锈钢框架"],
  },
  {
    id: "2", 
    name: "VIESMAR 不锈钢浴室柜1",
    price: "¥8,250",
    originalPrice: "¥9,980",
    category: "浴室柜系列",
    description: "采用304食品级不锈钢材质，一体成型工艺，搭配高品质陶瓷盆。防水防潮，经久耐用，是现代家庭的理想选择。",
    longDescription: "VIESMAR不锈钢浴室柜系列，采用食品级304不锈钢材质，通过SGS认证，安全环保无甲醛。一体成型工艺确保产品的整体性和耐用性，搭配高品质陶瓷盆，易清洁不变色。多层收纳设计，充分利用空间，让您的浴室整洁有序。",
    features: [
      "304食品级不锈钢，安全环保",
      "一体陶瓷盆，易清洁不变色",
      "多层收纳设计，空间利用率高",
      "静音导轨，开合无声",
      "防水LED镜前灯"
    ],
    specifications: {
      "尺寸": "W: 80cm × D: 45cm × H: 85cm",
      "材质": "304不锈钢 + 陶瓷",
      "台面": "一体陶瓷盆",
      "收纳": "双门柜 + 抽屉",
      "保修期": "3年质保"
    },
    images: [
      "/images/products/stainless/stainless-prod-0-0.png",
      "/images/products/stainless/stainless-prod-0-1.png",
      "/images/products/stainless/stainless-prod-0-2.jpg",
      "/images/products/stainless/stainless-prod-0-3.jpg",
    ],
    badge: "Hot",
    materials: ["304食品级不锈钢", "一体陶瓷盆"],
  },
  {
    id: "3",
    name: "VIESMAR 实木浴室柜1", 
    price: "¥15,675",
    originalPrice: "¥18,900",
    category: "实木系列",
    description: "精选进口橡木，经过多道工艺处理，具有天然木纹质感。配备德国进口五金配件，展现自然与工艺的完美结合。",
    longDescription: "VIESMAR实木浴室柜系列，精选北美进口橡木，每一块木材都经过严格筛选。经过12道工艺处理，包括烘干、防腐、防潮等，确保产品在潮湿环境中也能保持稳定。天然木纹质感，每一件都是独一无二的艺术品。",
    features: [
      "进口橡木材质，天然环保",
      "多层防水处理，防潮防霉",
      "德国进口铰链，承重力强",
      "天然木纹，每件独一无二",
      "专业安装服务"
    ],
    specifications: {
      "尺寸": "W: 100cm × D: 50cm × H: 85cm",
      "材质": "进口橡木 + 陶瓷",
      "表面处理": "环保清漆",
      "台面": "人造石台面",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/wood/wood-prod-0-0.jpg",
      "/images/products/wood/wood-prod-0-1.jpg",
      "/images/products/wood/wood-prod-0-2.jpg",
      "/images/products/wood/wood-prod-0-3.jpg",
      "/images/products/wood/wood-prod-0-4.jpg"
    ],
    badge: "Limited",
    materials: ["进口橡木", "人造石台面"],
  },
  // 淋浴房系列
  {
    id: "4",
    name: "VIESMAR 简约淋浴房",
    price: "¥10,580",
    originalPrice: "¥12,580",
    category: "淋浴房系列",
    description: "简约现代设计，极致简约风格，适合各种卫生间装修风格。采用优质钢化玻璃，安全耐用。",
    longDescription: "VIESMAR简约淋浴房系列，采用极简主义设计理念，去除多余装饰，保留最纯粹的几何线条。10mm厚钢化玻璃，通过3C认证，表面易洁涂层处理，水垢一擦即净。铝合金框架，阳极氧化处理，长久不变色。",
    features: [
      "10mm厚钢化玻璃，安全防爆",
      "铝合金框架，轻便耐用",
      "易洁涂层，抗水垢",
      "静音滑轮，推拉顺滑",
      "多种尺寸可选"
    ],
    specifications: {
      "尺寸": "W: 100cm × D: 80cm × H: 195cm",
      "材质": "10mm钢化玻璃 + 铝合金",
      "开启方式": "推拉门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "3年质保"
    },
    images: [
      "/images/products/shower/shower-prod-1-0.jpg",
      "/images/products/shower/shower-prod-1-1.jpg", 
    ],
    badge: "Hot",
    materials: ["10mm钢化玻璃", "铝合金框架"],
  },
  {
    id: "7",
    name: "VIESMAR 推拉淋浴房",
    price: "¥9,680",
    originalPrice: "¥11,680",
    category: "淋浴房系列",
    description: "推拉式设计，节省空间，适合小户型卫生间。优质五金配件，经久耐用。",
    longDescription: "VIESMAR推拉淋浴房系列，专为小空间设计，推拉门结构不占用额外空间。采用高精度导轨系统，顺滑无声。304不锈钢五金配件，防锈耐腐蚀。双层密封胶条，防水性能卓越，确保干湿分离。",
    features: [
      "节省空间设计",
      "304不锈钢五金",
      "双层密封胶条",
      "静音导轨",
      "干湿分离"
    ],
    specifications: {
      "尺寸": "W: 90cm × D: 85cm × H: 190cm",
      "材质": "8mm钢化玻璃 + 304不锈钢",
      "开启方式": "推拉门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "3年质保"
    },
    images: [
           "/images/products/shower/shower-prod-2-0.jpg",
      "/images/products/shower/shower-prod-2-1.jpg",
    ],
    badge: "Limited",
    materials: ["8mm钢化玻璃", "304不锈钢"],
  },
  {
    id: "10",
    name: "VIESMAR 智能淋浴房",
    price: "¥15,980",
    originalPrice: "¥18,980",
    category: "淋浴房系列",
    description: "融合智能科技，带触控式淋浴系统，LED氛围灯，打造智能化沐浴体验。",
    longDescription: "VIESMAR智能淋浴房系列，将现代科技与传统卫浴完美融合。内置智能控制系统，可通过触控屏调节水温、水流量和喷射模式。LED氛围灯系统，可根据心情变换颜色。自清洁玻璃，一键开启紫外线杀菌功能。",
    features: [
      "触控式智能控制系统",
      "LED氛围灯系统",
      "多模式喷射功能",
      "自清洁玻璃",
      "紫外线杀菌功能"
    ],
    specifications: {
      "尺寸": "W: 120cm × D: 90cm × H: 200cm",
      "材质": "防爆钢化玻璃 + 铝合金",
      "开启方式": "推拉门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "2年质保"
    },
    images: [
       "/images/products/shower/shower-prod-3-0.jpg",
      "/images/products/shower/shower-prod-3-1.jpg", 
      "/images/products/shower/shower-prod-3-2.jpg",
    ],
    badge: "New",
    materials: ["防爆钢化玻璃", "铝合金"],
  },
  {
    id: "13",
    name: "VIESMAR 方形淋浴房",
    price: "¥11,280",
    originalPrice: "¥13,280",
    category: "淋浴房系列",
    description: "方形设计，充分利用空间，适合规整的卫生间布局。简约大气，易于清洁。",
    longDescription: "VIESMAR方形淋浴房系列，采用经典方形设计，空间利用率最大化。全玻璃结构，视觉通透不压抑。人性化设计，预留毛巾架位置。防水条采用优质橡胶，耐老化，密封性能佳。",
    features: [
      "方形空间设计",
      "全玻璃结构",
      "防水防雾功能",
      "简易安装",
      "预留毛巾架位置"
    ],
    specifications: {
      "尺寸": "W: 100cm × D: 100cm × H: 195cm",
      "材质": "8mm钢化玻璃",
      "开启方式": "平开门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "3年质保"
    },
    images: [
            "/images/products/shower/shower-prod-4-0.jpg",
      "/images/products/shower/shower-prod-4-1.jpg", 
      "/images/products/shower/shower-prod-4-2.jpg",
    ],
    badge: "Hot",
    materials: ["8mm钢化玻璃"],
  },
  {
    id: "16",
    name: "VIESMAR 弧形淋浴房",
    price: "¥12,580",
    originalPrice: "¥14,580",
    category: "淋浴房系列",
    description: "弧形设计，线条流畅，减少碰撞风险。适合有老人或儿童的家庭使用。",
    longDescription: "VIESMAR弧形淋浴房系列，采用人体工学设计，圆润弧形边角，安全无隐患。超白钢化玻璃，透光率高，视觉通透。底部挡水条设计独特，有效防止水外溢。五金配件采用304不锈钢，防锈耐腐蚀。",
    features: [
      "弧形安全设计",
      "超白高透玻璃",
      "防滑地面处理",
      "儿童安全锁",
      "防撞缓冲条"
    ],
    specifications: {
      "尺寸": "W: 110cm × D: 85cm × H: 195cm",
      "材质": "8mm钢化玻璃 + 304不锈钢",
      "开启方式": "推拉门",
      "安装方式": "地面固定 + 墙面固定",
      "保修期": "3年质保"
    },
    images: [
      "/images/products/shower/shower-prod-5-0.jpg",
      "/images/products/shower/shower-prod-5-1.jpg", 
    ],
    badge: "New",
    materials: ["8mm钢化玻璃", "304不锈钢"],
  },
  // 不锈钢浴室柜系列
  {
    id: "5",
    name: "VIESMAR 不锈钢浴室柜2",
    price: "¥4,980",
    originalPrice: "¥5,980",
    category: "不锈钢浴室柜系列",
    description: "不锈钢镜柜一体设计，兼具储物与梳妆功能。防潮防锈，经久耐用。",
    longDescription: "VIESMAR不锈钢镜柜系列，镜面与储物柜完美结合，节省空间的同时提升功能性。镜面采用防雾处理，热水沐浴后依然清晰明亮。内置多层储物格，合理分区，便于物品分类。LED镜前灯，光线柔和自然。",
    features: [
      "防雾镜面设计",
      "多层储物空间",
      "LED镜前灯",
      "防水防潮",
      "静音铰链"
    ],
    specifications: {
      "尺寸": "W: 60cm × D: 15cm × H: 70cm",
      "材质": "304不锈钢 + 防雾镜面",
      "功能": "储物 + 梳妆",
      "储物": "双层隔板",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/stainless/stainless-prod-1-0.jpg",
      "/images/products/stainless/stainless-prod-1-1.jpg", 
      "/images/products/stainless/stainless-prod-1-2.jpg",
      "/images/products/stainless/stainless-prod-1-3.jpg",
    ],
    badge: "New",
    materials: ["304不锈钢", "防雾镜面"],
  },
  {
    id: "8",
    name: "VIESMAR 不锈钢浴室柜3",
    price: "¥3,680",
    originalPrice: "¥4,380",
    category: "不锈钢浴室柜系列",
    description: "简约设计不锈钢洗手台，防水防锈，易清洁。适合现代简约风格卫生间。",
    longDescription: "VIESMAR不锈钢洗手台系列，采用304不锈钢一体成型，无缝设计，不积水垢。表面拉丝处理，质感细腻，不易留指纹。台下式陶瓷盆，美观实用。底部可调节设计，适应不同高度需求。",
    features: [
      "304不锈钢一体成型",
      "拉丝表面处理",
      "台下式陶瓷盆",
      "可调节高度",
      "易清洁不积水"
    ],
    specifications: {
      "尺寸": "W: 70cm × D: 45cm × H: 85cm",
      "材质": "304不锈钢 + 陶瓷",
      "台面": "台下式陶瓷盆",
      "功能": "洗手台",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/stainless/stainless-prod-2-0.jpg",
      "/images/products/stainless/stainless-prod-2-1.jpg", 
      "/images/products/stainless/stainless-prod-2-2.jpg",
      "/images/products/stainless/stainless-prod-2-3.jpg",
    ],
    badge: "Hot",
    materials: ["304不锈钢", "陶瓷"],
  },
  {
    id: "11",
    name: "VIESMAR 不锈钢浴室柜4",
    price: "¥2,980",
    originalPrice: "¥3,680",
    category: "不锈钢浴室柜系列",
    description: "壁挂式不锈钢吊柜，节省地面空间。防潮防锈，适合潮湿的浴室环境。",
    longDescription: "VIESMAR不锈钢吊柜系列，采用壁挂式设计，不占用地面空间，使卫生间更显宽敞。304不锈钢材质，防潮防锈，使用寿命长。隐形铰链设计，开门更美观。内部可调节隔板，灵活应对不同储物需求。",
    features: [
      "壁挂式设计",
      "隐形铰链",
      "可调节隔板",
      "防潮防锈",
      "安装简便"
    ],
    specifications: {
      "尺寸": "W: 60cm × D: 25cm × H: 70cm",
      "材质": "304不锈钢",
      "安装方式": "壁挂式",
      "储物": "单层隔板",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/stainless/stainless-prod-3-0.jpg",
      "/images/products/stainless/stainless-prod-3-1.jpg", 
      "/images/products/stainless/stainless-prod-3-2.jpg",
      "/images/products/stainless/stainless-prod-3-3.jpg",
    ],
    badge: "New",
    materials: ["304不锈钢"],
  },
  {
    id: "14",
    name: "VIESMAR 不锈钢浴室柜5",
    price: "¥880",
    originalPrice: "¥1,280",
    category: "不锈钢浴室柜系列",
    description: "多功能不锈钢置物架，可放置洗浴用品。镂空设计，沥水通风，不易积水。",
    longDescription: "VIESMAR不锈钢置物架系列，多层设计，分类收纳各种洗浴用品。镂空结构，沥水通风，保持用品干爽。可调节高度，灵活适应不同尺寸的洗浴用品。安装简便，无需钻孔，不损坏墙面。",
    features: [
      "多层收纳设计",
      "镂空沥水结构",
      "可调节高度",
      "免钻孔安装",
      "承重力强"
    ],
    specifications: {
      "尺寸": "W: 40cm × D: 15cm × H: 60cm",
      "材质": "304不锈钢",
      "层数": "3层",
      "安装方式": "免钻孔粘贴",
      "保修期": "1年质保"
    },
    images: [
      "/images/products/stainless/stainless-prod-4-0.png",
      "/images/products/stainless/stainless-prod-4-1.png", 
      "/images/products/stainless/stainless-prod-4-2.jpg",
      "/images/products/stainless/stainless-prod-4-3.jpg",
      "/images/products/stainless/stainless-prod-4-4.jpg",
    ],
    badge: "Hot",
    materials: ["304不锈钢"],
  },
  {
    id: "17",
    name: "VIESMAR 不锈钢浴室柜6",
    price: "¥680",
    originalPrice: "¥980",
    category: "不锈钢浴室柜系列",
    description: "不锈钢材质毛巾架，防锈耐用。可折叠设计，节省空间，不使用时可收起。",
    longDescription: "VIESMAR不锈钢毛巾架系列，采用304不锈钢材质，防锈耐腐蚀。可折叠设计，不使用时可收起，节省空间。多杆设计，可同时晾晒多条毛巾。静音轴承，收展开合无声。安装简便，不损坏墙面。",
    features: [
      "可折叠设计",
      "多杆晾晒",
      "静音轴承",
      "防锈材质",
      "安装简便"
    ],
    specifications: {
      "尺寸": "W: 50cm × D: 20cm × H: 60cm",
      "材质": "304不锈钢",
      "层数": "2层",
      "安装方式": "免钻孔粘贴",
      "保修期": "1年质保"
    },
    images: [
      "/images/products/stainless/stainless-prod-2-0.jpg",
      "/images/products/stainless/stainless-prod-2-1.jpg", 
      "/images/products/stainless/stainless-prod-2-2.jpg",
      "/images/products/stainless/stainless-prod-2-3.jpg",
    ],
    badge: "New",
    materials: ["304不锈钢"],
  },
  // 实木浴室柜系列
  {
    id: "6",
    name: "VIESMAR 实木浴室柜2",
    price: "¥6,580",
    originalPrice: "¥7,980",
    category: "实木系列",
    description: "实木材质镜柜，自然纹理，温馨舒适。防潮防霉处理，适合浴室环境。",
    longDescription: "VIESMAR实木镜柜系列，选用北美进口橡木，天然木纹，每件独一无二。多重防水处理，有效防潮防霉。镜面防雾设计，热水沐浴后依然清晰。内置LED灯光，柔和自然。智能感应开关，使用便捷。",
    features: [
      "北美进口橡木",
      "防雾镜面设计",
      "LED灯光系统",
      "多重防水处理",
      "智能感应开关"
    ],
    specifications: {
      "尺寸": "W: 70cm × D: 18cm × H: 75cm",
      "材质": "进口橡木 + 防雾镜面",
      "表面处理": "环保清漆",
      "功能": "储物 + 梳妆",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/wood/wood-prod-1-0.jpg",
      "/images/products/wood/wood-prod-1-1.jpg", 
      "/images/products/wood/wood-prod-1-2.jpg",
    ],
    badge: "New",
    materials: ["进口橡木", "防雾镜面"],
  },
  {
    id: "9",
    name: "VIESMAR 实木浴室柜3",
    price: "¥5,880",
    originalPrice: "¥7,180",
    category: "实木系列",
    description: "实木材质洗手台，自然温馨，质感细腻。防潮防霉处理，经久耐用。",
    longDescription: "VIESMAR实木洗手台系列，精选进口橡木，纹理自然优美。表面采用环保漆处理，防水耐磨。陶瓷台盆一体成型，易清洁不积水。底部可调节设计，适应不同高度需求。简约设计风格，适合各种装修风格。",
    features: [
      "进口橡木材质",
      "环保防水漆面",
      "一体陶瓷台盆",
      "可调节高度",
      "简约设计风格"
    ],
    specifications: {
      "尺寸": "W: 80cm × D: 45cm × H: 85cm",
      "材质": "进口橡木 + 陶瓷",
      "表面处理": "环保清漆",
      "台面": "一体陶瓷盆",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/wood/wood-prod-2-0.jpg",
      "/images/products/wood/wood-prod-2-1.jpg", 
      "/images/products/wood/wood-prod-2-2.jpg",
    ],
    badge: "Hot",
    materials: ["进口橡木", "陶瓷"],
  },
  {
    id: "12",
    name: "VIESMAR 实木浴室柜4",
    price: "¥3,980",
    originalPrice: "¥4,780",
    category: "实木系列",
    description: "壁挂式实木吊柜，节省地面空间。防潮防霉处理，适合潮湿的浴室环境。",
    longDescription: "VIESMAR实木吊柜系列，采用壁挂式设计，不占用地面空间。进口橡木材质，经过多道防潮防霉处理，确保在潮湿环境中稳定耐用。隐形铰链设计，美观大方。内部可调节隔板，灵活应对不同储物需求。",
    features: [
      "壁挂式设计",
      "隐形铰链",
      "可调节隔板",
      "防潮防霉处理",
      "进口橡木材质"
    ],
    specifications: {
      "尺寸": "W: 60cm × D: 25cm × H: 70cm",
      "材质": "进口橡木",
      "安装方式": "壁挂式",
      "表面处理": "环保清漆",
      "保修期": "2年质保"
    },
    images: [
      "/images/products/wood/wood-prod-3-0.jpg",
      "/images/products/wood/wood-prod-3-1.jpg", 
      "/images/products/wood/wood-prod-3-2.jpg",
      "/images/products/wood/wood-prod-3-3.jpg",
    ],
    badge: "Limited",
    materials: ["进口橡木"],
  },
  {
    id: "15",
    name: "VIESMAR 实木浴室柜5",
    price: "¥1,280",
    originalPrice: "¥1,680",
    category: "实木系列",
    description: "实木材质置物架，自然美观。防潮处理，适合放置各种洗浴用品。",
    longDescription: "VIESMAR实木置物架系列，精选进口橡木，保留天然木纹美感。多重防潮处理，适合浴室潮湿环境。多层设计，分类收纳各种洗浴用品。圆角打磨处理，安全无尖锐边角。安装简便，无需钻孔。",
    features: [
      "进口橡木材质",
      "多层收纳设计",
      "圆角安全处理",
      "防潮处理",
      "安装简便"
    ],
    specifications: {
      "尺寸": "W: 40cm × D: 15cm × H: 60cm",
      "材质": "进口橡木",
      "层数": "3层",
      "表面处理": "环保清漆",
      "保修期": "1年质保"
    },
    images: [
       "/images/products/wood/wood-prod-4-0.jpg",
      "/images/products/wood/wood-prod-4-1.jpg", 
      "/images/products/wood/wood-prod-4-2.jpg",
    ],
    badge: "Hot",
    materials: ["进口橡木"],
  },
 
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />
      <ProductDetailSection product={product} />
      <Footer />
    </main>
  )
}