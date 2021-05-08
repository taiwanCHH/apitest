-- -------------------------------------------------------------
-- TablePlus 3.12.6(366)
--
-- https://tableplus.com/
--
-- Database: apidb
-- Generation Time: 2021-05-08 10:40:16.4890
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `Products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext,
  `Content` longtext,
  `ImgUrl` longtext,
  `Price` int NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Products` (`Id`, `Name`, `Content`, `ImgUrl`, `Price`) VALUES
(1, '486 翻譯筆1.2版', '新增三段語速播放調整/n◆ 此為繁體中文版/n◆ 新增三段語速播放調整/n◆ 極速查詞大幅提升查詞效率/n◆ 收錄150萬詞條，一秒掃描15字符/n◆ 獨立使用，不需配套書籍', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P1912170005c651/960_506319f290612d8dcb7af3de4c13b663_1617858588.jpg', 6990),
(2, 'Blaupunkt 藍寶冷熱眼部按摩器 BPB-M08E', '◆ 折疊180°方便㩦帶/n◆ 加長設計更貼合眼周穴位/n◆ 獨家專利內凹式伸縮眼窩墊/n◆ 10分鐘停止設定讓護眼更科學/n◆ 3秒疾速享受冷、熱 、冷熱循環按摩/n◆ 仿真人3D雙層氣袋氣壓按摩', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P21010900018084/960_838a4e0b7b8ce343dfe06238cd6e0d07_1611822709.jpg', 2200),
(4, '【昭和西川】特級羽絨舒眠頸椎枕', '✩ JIS日本工業局嚴格標準/n✩ 70%歐產鴨絨完美比例/n✩ 柔軟舒適，溫和分散肩頸壓力/n✩ 特殊三橫三豎設計一顆枕頭擁有二種不同感受', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P1809220001473e/960_f3aeba65beb22171d828cc15b39cadc3_1552896789.jpg', 5566),
(5, '日本獅王PROTEC沐浴乳｜洗髮精組合', '√全身清爽，散發讓人忍不住靠近的清香魅力~/n√ 特別針對潔淨汗液和皮脂設計，清爽洗淨感/n√ 沖洗後不黏膩，舒爽潔淨', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P1912040003aabe/960_307c1f03fa4af3dad911115e4c60bc81_1575457253.jpg', 377),
(6, '486 G-PLUS 紫外線殺菌燈', '✩ 無線遙控，安全方便/n✩ 紫外線波長254nm/n✩ 內鍵兒童鎖，防止誤觸操作', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P2008190010a7f2/960_85bcc0598628f4799811075d0933b76a_1604649570.jpg', 2880),
(7, '紐西蘭空運麥蘆卡蜂膠噴霧', '● 小噴瓶，外出攜帶方便/n●不怕季節變化，家庭必備良品/n● 味道溫和濃郁，不含酒精、口感不刺激', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P190923000240b4/960_eb17083621a824d07fceffd7e312f8ac_1595322607.jpg', 770),
(8, '12in1多用途萬用剪刀 台灣製', '● MIT．12in1多功能/n● 收納方便安全', 'https://www.486shop.com/vimg/640x640_pdt1/?src=fileproduct_list/P180627000477af/960_df89f7c2de0ee8ae27ce552ccf21497c_1615265811.jpg', 399);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;