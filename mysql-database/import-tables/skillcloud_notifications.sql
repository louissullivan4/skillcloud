-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: skillcloud
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `type` text,
  `project_author` text,
  `user_notified` text,
  `project_id` text,
  `date_created` text,
  `status` text,
  `role_id` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('project_invite','sarah@gmail.com','alicia@gmail.com','06490152','2023-03-14','pending','07942085'),('project_invite','sarah@gmail.com','john@gmail.com','06490152','2023-03-14','pending','07942085'),('project_invite','sarah@gmail.com','ben@gmail.com','06490152','2023-03-14','pending','01650056'),('project_invite','sarah@gmail.com','jacob@gmail.com','06490152','2023-03-14','pending','01196658'),('project_invite','sebastian@gmail.com','paul@gmail.com','02308994','2023-03-14','pending','09147609'),('project_invite','sebastian@gmail.com','jim@gmail.com','02308994','2023-03-14','pending','06835473'),('project_invite','sebastian@gmail.com','jack@gmail.com','02308994','2023-03-14','pending','07854879'),('project_invite','sebastian@gmail.com','jack@gmail.com','02308994','2023-03-14','pending','07235373'),('project_invite','sebastian@gmail.com','katie@gmail.com','02308994','2023-03-14','pending','01920081'),('project_invite','sullivanlouis0@gmail.com','sebastian@gmail.com','06128312','2023-03-14','pending','08188356'),('project_invite','sullivanlouis0@gmail.com','alicia@gmail.com','06128312','2023-03-14','pending','01875870'),('project_invite','sullivanlouis0@gmail.com','madison@gmail.com','06128312','2023-03-14','pending','03657893'),('project_invite','sullivanlouis0@gmail.com','sofia@gmail.com','06128312','2023-03-14','pending','03410410'),('project_invite','sarah@gmail.com','sullivanlouis0@gmail.com','06490152','2023-03-15','pending','07942085'),('project_invite','sarah@gmail.com','rachel@gmail.com','06490152','2023-03-15','pending','01196658');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-15 14:53:19
