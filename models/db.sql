

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `status` */

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `status` */

insert  into `status`(`id`,`name`) values
(1,'Not started'),
(2,'In progress'),
(3,'Done');

/*Table structure for table `task` */

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `status_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_status` (`status_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `task` */

insert  into `task`(`id`,`title`,`description`,`created`,`updated`,`due_date`,`status_id`,`user_id`) values
(1,'Wash clothes','Title says it all.','2017-10-25 06:54:16','2017-10-15 13:05:09',NULL,2,1),
(2,'Become a billionaire','This should not take long, just invent a time machine, travel back to 2010 and buy bitcoin','2017-09-26 03:06:46','2017-10-08 06:14:31','2017-12-22 20:58:03',3,6),
(3,'Plan meeting with London office','We will probably use skype','2017-10-04 18:07:37','2017-10-14 16:01:31','2017-12-05 19:42:15',2,8),
(4,'Order groceries online','The fridge is almost empty, we need eggs and milk','2017-09-20 19:34:43','2017-10-15 23:35:45','2017-12-24 16:00:46',1,1),
(5,'Empty the mailbox',NULL,'2017-09-27 15:17:08','2017-10-08 17:31:16',NULL,2,9),
(6,'Fix the flat tire on the bike','Tools are in the garage','2017-09-13 23:16:30','2017-10-06 04:03:52','2017-12-07 11:51:11',2,6),
(7,'Wash the car',NULL,'2017-10-06 19:39:16','2017-10-03 04:49:05','2017-12-04 17:43:16',2,10),
(8,'Walk the dog',NULL,'2017-09-03 02:47:17','2017-10-12 18:40:08',NULL,3,2),
(9,'Write a book','Maybe something about dragons?','2017-10-11 06:14:01','2017-10-17 12:19:08','2017-12-21 20:18:05',2,6),
(10,'Do HackYourFuture homework',NULL,'2017-10-04 13:55:16','2017-10-10 00:18:05','2017-12-19 17:01:10',1,3),
(11,'Iron shirts',NULL,'2017-09-23 03:59:58','2017-10-19 08:30:48','2017-12-08 11:00:35',3,9),
(12,'Water the potted plants','Maybe they need fertilizer as well','2017-09-29 23:38:42','2017-10-08 04:24:53',NULL,2,1),
(13,'Buy wine for the birthday party','Both red and white wine','2017-10-10 14:57:22','2017-10-14 14:03:30','2017-12-10 23:43:56',2,5),
(14,'Buy gift for Paul','He could use a shirt or a tie and some socks','2017-09-09 05:22:08','2017-10-17 15:58:05','2017-12-04 20:45:18',3,3),
(15,'Change lightbulb in hallway','Should be an LED bulb','2017-10-01 19:07:35','2017-10-03 10:02:27','2017-12-08 17:09:03',3,10),
(16,'Wash windows',NULL,'2017-10-02 22:15:17','2017-10-07 22:31:35','2017-12-06 03:36:09',2,8),
(17,'Setup salary databases for accounting','Use MySQL','2017-10-25 05:35:33','2017-10-10 23:22:33','2017-12-05 00:19:08',1,9),
(18,'Learn how databases work',NULL,'2017-09-06 03:16:47','2017-10-10 16:56:58','2017-12-18 05:08:05',3,5),
(19,'Make the databases perform better','It should be possible to optimize the indexes','2017-10-03 09:27:20','2017-10-01 16:27:46','2017-12-01 13:28:35',2,4),
(20,'Buy beer for the company party','2 or 3 cases should be enough','2017-10-08 01:39:02','2017-10-13 23:07:41',NULL,3,4),
(21,'Knit sweater',NULL,'2017-09-22 17:14:55','2017-10-08 09:01:35','2017-12-15 20:33:57',2,9),
(22,'Charge electric bicycle','It sucks to ride it without a battery!','2017-10-10 12:25:07','2017-10-07 21:45:01','2017-12-10 19:02:17',1,7),
(23,'Buy new phone','The battery in the current one only lasts 5 hours ?','2017-09-17 00:25:34','2017-10-09 11:48:12',NULL,3,NULL),
(24,'Ride bike aroud Sjælland','Remember rainclothes and tire repair kit!','2017-10-20 19:21:13','2017-10-07 01:38:06','2017-12-19 15:08:18',2,7),
(25,'Look at apartments in Ørestad','2 or 3 rooms','2017-10-30 09:47:00','2017-10-19 06:11:26',NULL,1,6),
(26,'Empty Mr Fluffy\'s litterbox',NULL,'2017-09-28 03:09:06','2017-10-13 10:38:34','2017-12-20 23:37:18',2,8),
(27,'Buy new dining room table and chairs','Ikea has some on sale','2017-09-21 12:02:34','2017-10-02 02:05:11','2017-12-06 00:14:30',1,3),
(28,'Renew buscard','3 zones','2017-10-07 22:47:51','2017-10-09 15:50:03','2017-12-01 14:25:40',2,6),
(29,'Sign up for linkedin','Make the CV awesome! ?','2017-09-04 00:57:47','2017-10-18 18:07:48','2017-12-07 23:04:38',3,2),
(30,'Remove facebook from phone','To avoid interruptions when working','2017-10-26 17:15:07','2017-10-13 03:36:47','2017-12-19 11:10:02',3,4),
(31,'Backup databases to external disk','Remember to store the disk in another physical location','2017-09-09 17:32:33','2017-10-01 21:18:59','2017-12-23 14:21:01',1,2),
(32,'Put up the new lamp in the hallway',NULL,'2017-10-15 05:45:54','2017-10-16 14:05:35','2017-12-29 02:29:26',3,3),
(33,'Hang up paintings in living room',NULL,'2017-09-10 05:36:11','2017-10-09 17:40:42',NULL,3,4),
(34,'Buy plane ticket to Auckland','Check prices online first!','2017-09-05 09:07:22','2017-10-15 09:36:06','2017-12-07 11:10:05',1,9),
(35,'Learn about NoSQL databases','MongoDB, CouchDB, etc.','2017-10-20 01:41:53','2017-10-04 07:19:56','2017-12-23 10:13:42',2,NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`email`,`phone`) values
(1,'Aarika Ellingworth','aellingworth0@harvard.edu','483-396-8795'),
(2,'Pren Goldsworthy','pgoldsworthy1@spotify.com','635-572-8467'),
(3,'Pablo Kisbee','pkisbee2@lulu.com','790-962-8683'),
(4,'Rodie Duncan','rduncan3@quantcast.com','646-743-6191'),
(5,'Aubry Polak','apolak4@indiatimes.com','302-678-7931'),
(6,'Maryrose Meadows','mmeadows5@comcast.net','251-524-6594'),
(7,'Pavel Brushneen','pbrushneen6@techcrunch.com','316-170-3640'),
(8,'Hedy Gerault','hgerault7@nymag.com','176-177-5579'),
(9,'王秀英','wang.xiuying@weebly.com','891-952-6749'),
(10,'إلياس','elias@github.com','202-517-6983'),
(11,'Donald Duck','donald@duck.com',NULL),
(12,'Adam Smith','smith@bla.com',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
