import type { Category, Difficulty } from "./word-database";
import type { Locale } from "@/lib/site";

type ExtraWords = Record<
  Locale,
  Record<Difficulty, Record<Category, string[]>>
>;

/** Additional words merged into the main database (doubles pool size). */
export const extraWords: ExtraWords = {
  en: {
    easy: {
      animals: ["Horse", "Sheep", "Cow", "Duck", "Frog", "Bear", "Wolf", "Deer", "Owl", "Fish"],
      movies: ["Finding Nemo", "Moana", "Cinderella", "Aladdin", "Shrek", "Cars", "Up", "Zootopia", "Minions", "Encanto"],
      sports: ["Soccer", "Skating", "Hiking", "Yoga", "Karate", "Jogging", "Cycling", "Bowling", "Skateboard", "Skiing"],
      food: ["Bread", "Cheese", "Soup", "Taco", "Sushi Roll", "Donut", "Popcorn", "Steak", "Salad", "Milk"],
      famous: ["Obama", "Mandela", "Gandhi", "Churchill", "Tesla", "Darwin", "Galileo", "Lincoln", "Cleopatra", "Picasso"],
    },
    medium: {
      animals: ["Flamingo", "Chameleon", "Platypus", "Narwhal", "Cheetah", "Jaguar", "Pelican", "Armadillo", "Meerkat", "Walrus"],
      movies: ["Jurassic Park", "The Matrix", "Gladiator", "Whiplash", "La La Land", "Parasite", "Mad Max", "Joker", "Coco", "Inside Out"],
      sports: ["Marathon", "Triathlon", "Curling", "Fencing", "Polo", "Cricket", "Lacrosse", "Parkour", "Snowboard", "Table Tennis"],
      food: ["Ramen", "Tacos", "Paella", "Lasagna", "Dumplings", "Falafel", "Burrito", "Pancakes", "Waffles", "Smoothie"],
      famous: ["Churchill", "Frida Kahlo", "Marie Curie", "Nikola Tesla", "Ada Lovelace", "Walt Disney", "Steve Jobs", "Oprah", "Pelé", "Messi"],
    },
    hard: {
      animals: ["Axolotl", "Tardigrade", "Quokka", "Blobfish", "Okapi", "Fossa", "Tapir", "Manatee", "Pangolin", "Komodo Dragon"],
      movies: ["Apocalypse Now", "Blade Runner", "The Shining", "Amélie", "Oldboy", "Spirited Away", "There Will Be Blood", "No Country for Old Men", "The Prestige", "Memento"],
      sports: ["Decathlon", "Biathlon", "Skeleton", "Bobsleigh", "Dressage", "Synchronized Swimming", "Sumo", "Kabaddi", "Sepak Takraw", "Ultramarathon"],
      food: ["Ratatouille", "Bouillabaisse", "Tiramisu", "Baklava", "Kimchi", "Pho", "Goulash", "Churros", "Moussaka", "Risotto"],
      famous: ["Socrates", "Confucius", "Turing", "Hawking", "Arendt", "Curie", "Bach", "Chopin", "Van Gogh", "Michelangelo"],
    },
  },
  zh: {
    easy: {
      animals: ["马", "羊", "牛", "鸭", "青蛙", "熊", "狼", "鹿", "猫头鹰", "鱼"],
      movies: ["海底总动员", "海洋奇缘", "灰姑娘", "阿拉丁", "怪物史莱克", "赛车总动员", "飞屋环游记", "疯狂动物城", "小黄人", "魔法满屋"],
      sports: ["滑冰", "徒步", "瑜伽", "空手道", "慢跑", "骑行", "保龄球", "滑板", "滑雪", "跳绳"],
      food: ["面包", "奶酪", "汤", "塔可", "寿司卷", "甜甜圈", "爆米花", "牛排", "沙拉", "牛奶"],
      famous: ["奥巴马", "曼德拉", "甘地", "丘吉尔", "特斯拉", "达尔文", "伽利略", "林肯", "克利奥帕特拉", "毕加索"],
    },
    medium: {
      animals: ["火烈鸟", "变色龙", "鸭嘴兽", "独角鲸", "猎豹", "美洲豹", "鹈鹕", "犰狳", "猫鼬", "海象"],
      movies: ["侏罗纪公园", "黑客帝国", "角斗士", "爆裂鼓手", "爱乐之城", "寄生虫", "疯狂的麦克斯", "小丑", "寻梦环游记", "头脑特工队"],
      sports: ["马拉松", "铁人三项", "冰壶", "击剑", "马球", "板球", "长曲棍球", "跑酷", "单板滑雪", "乒乓球"],
      food: ["拉面", "塔可", "海鲜饭", "千层面", "饺子", "炸豆丸子", "卷饼", "煎饼", "华夫饼", "奶昔"],
      famous: ["丘吉尔", "弗里达", "居里夫人", "特斯拉", "阿达·洛芙莱斯", "迪士尼", "乔布斯", "奥普拉", "贝利", "梅西"],
    },
    hard: {
      animals: ["美西螈", "水熊虫", "短尾矮袋鼠", "水滴鱼", "㺢㹢狓", "马岛獴", "貘", "海牛", "穿山甲", "科莫多龙"],
      movies: ["现代启示录", "银翼杀手", "闪灵", "天使爱美丽", "老男孩", "千与千寻", "血色将至", "老无所依", "致命魔术", "记忆碎片"],
      sports: ["十项全能", "冬季两项", "钢架雪车", "雪橇", "盛装舞步", "花样游泳", "相扑", "卡巴迪", "藤球", "超级马拉松"],
      food: ["蔬菜杂烩", "马赛鱼汤", "提拉米苏", "果仁蜜饼", "泡菜", "越南粉", "炖牛肉", "吉事果", "慕沙卡", "意大利烩饭"],
      famous: ["苏格拉底", "孔子", "图灵", "霍金", "阿伦特", "居里", "巴赫", "肖邦", "梵高", "米开朗基罗"],
    },
  },
};
