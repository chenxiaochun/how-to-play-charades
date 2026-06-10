import type { Locale } from "@/lib/site";

export type Category = "animals" | "movies" | "sports" | "food" | "famous";
export type Difficulty = "easy" | "medium" | "hard";

type WordDatabase = Record<
  Locale,
  Record<Difficulty, Record<Category, string[]>>
>;

export const wordDatabase: WordDatabase = {
  zh: {
    easy: {
      animals: ["猫", "狗", "大象", "老虎", "狮子", "长颈鹿", "猴子", "熊猫", "兔子", "鸟"],
      movies: ["阿凡达", "泰坦尼克号", "狮子王", "冰雪奇缘", "玩具总动员", "哈利波特", "蜘蛛侠", "蝙蝠侠", "超人", "星球大战"],
      sports: ["足球", "篮球", "网球", "棒球", "游泳", "跑步", "羽毛球", "乒乓球", "排球", "高尔夫"],
      food: ["苹果", "香蕉", "披萨", "汉堡", "冰淇淋", "巧克力", "蛋糕", "面条", "米饭", "炸鸡"],
      famous: ["爱因斯坦", "牛顿", "莎士比亚", "莫扎特", "贝多芬", "居里夫人", "爱迪生", "拿破仑", "哥伦布", "达芬奇"],
    },
    medium: {
      animals: ["考拉", "树懒", "刺猬", "章鱼", "海马", "企鹅", "北极熊", "袋鼠", "狐狸", "浣熊"],
      movies: ["肖申克的救赎", "阿甘正传", "盗梦空间", "星际穿越", "黑客帝国", "指环王", "复仇者联盟", "变形金刚", "加勒比海盗", "速度与激情"],
      sports: ["拳击", "摔跤", "击剑", "射箭", "体操", "跳水", "冲浪", "滑雪", "攀岩", "自行车"],
      food: ["寿司", "刺身", "意大利面", "牛排", "火锅", "烧烤", "三明治", "沙拉", "咖啡", "奶茶"],
      famous: ["爱因斯坦", "牛顿", "莎士比亚", "莫扎特", "贝多芬", "居里夫人", "爱迪生", "拿破仑", "哥伦布", "达芬奇"],
    },
    hard: {
      animals: ["独角兽", "凤凰", "龙", "麒麟", "玄武", "白虎", "朱雀", "青龙", "雪人", "美人鱼"],
      movies: ["公民凯恩", "教父", "卡萨布兰卡", "乱世佳人", "辛德勒的名单", "低俗小说", "这个杀手不太冷", "七宗罪", "沉默的羔羊", "无间道"],
      sports: ["赛艇", "皮划艇", "帆板", "马术", "马球", "曲棍球", "手球", "水球", "橄榄球", "板球"],
      food: ["法式蜗牛", "鱼子酱", "松露", "鹅肝", "佛跳墙", "北京烤鸭", "麻婆豆腐", "鱼香肉丝", "宫保鸡丁", "糖醋排骨"],
      famous: ["尼采", "柏拉图", "亚里士多德", "黑格尔", "康德", "马克思", "恩格斯", "弗洛伊德", "荣格", "皮亚杰"],
    },
  },
  en: {
    easy: {
      animals: ["Cat", "Dog", "Elephant", "Tiger", "Lion", "Giraffe", "Monkey", "Panda", "Rabbit", "Bird"],
      movies: ["Avatar", "Titanic", "Lion King", "Frozen", "Toy Story", "Harry Potter", "Spiderman", "Batman", "Superman", "Star Wars"],
      sports: ["Football", "Basketball", "Tennis", "Baseball", "Swimming", "Running", "Badminton", "Table Tennis", "Volleyball", "Golf"],
      food: ["Apple", "Banana", "Pizza", "Hamburger", "Ice Cream", "Chocolate", "Cake", "Noodles", "Rice", "Fried Chicken"],
      famous: ["Einstein", "Newton", "Shakespeare", "Mozart", "Beethoven", "Madame Curie", "Edison", "Napoleon", "Columbus", "Da Vinci"],
    },
    medium: {
      animals: ["Koala", "Sloth", "Hedgehog", "Octopus", "Seahorse", "Penguin", "Polar Bear", "Kangaroo", "Fox", "Raccoon"],
      movies: ["Shawshank Redemption", "Forrest Gump", "Inception", "Interstellar", "Matrix", "Lord of the Rings", "Avengers", "Transformers", "Pirates of the Caribbean", "Fast and Furious"],
      sports: ["Boxing", "Wrestling", "Fencing", "Archery", "Gymnastics", "Diving", "Surfing", "Skiing", "Rock Climbing", "Cycling"],
      food: ["Sushi", "Sashimi", "Pasta", "Steak", "Hot Pot", "Barbecue", "Sandwich", "Salad", "Coffee", "Milk Tea"],
      famous: ["Einstein", "Newton", "Shakespeare", "Mozart", "Beethoven", "Madame Curie", "Edison", "Napoleon", "Columbus", "Da Vinci"],
    },
    hard: {
      animals: ["Unicorn", "Phoenix", "Dragon", "Qilin", "Xuanwu", "White Tiger", "Zhuque", "Azure Dragon", "Yeti", "Mermaid"],
      movies: ["Citizen Kane", "The Godfather", "Casablanca", "Gone with the Wind", "Schindler's List", "Pulp Fiction", "Léon", "Se7en", "Silence of the Lambs", "Infernal Affairs"],
      sports: ["Rowing", "Canoeing", "Windsurfing", "Equestrian", "Polo", "Hockey", "Handball", "Water Polo", "Rugby", "Cricket"],
      food: ["Escargot", "Caviar", "Truffle", "Foie Gras", "Buddha Jumps Over the Wall", "Peking Duck", "Mapo Tofu", "Yuxiang Shredded Pork", "Kung Pao Chicken", "Sweet and Sour Ribs"],
      famous: ["Nietzsche", "Plato", "Aristotle", "Hegel", "Kant", "Marx", "Engels", "Freud", "Jung", "Piaget"],
    },
  },
};

export function getRandomWord(
  locale: Locale,
  category: Category | "all",
  difficulty: Difficulty,
): string {
  let words: string[] = [];

  if (category === "all") {
    Object.values(wordDatabase[locale][difficulty]).forEach((cat) => {
      words = words.concat(cat);
    });
  } else {
    words = wordDatabase[locale][difficulty][category];
  }

  return words[Math.floor(Math.random() * words.length)];
}
