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
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` char(8) NOT NULL,
  `project_title` text,
  `project_author` text,
  `project_createdate` text,
  `project_startdate` text,
  `project_enddate` text,
  `project_summary` text,
  `project_state` text,
  `project_city` text,
  `project_country` text,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('02308994','Two Floor House Construction','sebastian@gmail.com','2023-03-14','2023-04-13','2023-07-14','We are seeking a team of experienced professionals to design and construct a two floor house in a specified location. The house will include standard amenities such as bedrooms, bathrooms, kitchen, living room, and garage. The house will be built to local building codes and regulations.','Open','Galway','Ireland'),('06128312','Skin Disease Detection System','sullivanlouis0@gmail.com','2023-03-14','2023-03-31','2023-07-31','This project aims to develop a skin disease detection system using convolutional neural networks (CNNs). The system will be able to classify different types of skin diseases based on images and provide an accurate diagnosis to users. The system will be accessible via a mobile application, allowing users to easily take a picture of their skin and receive a diagnosis.','Open','Cork','Ireland'),('06490152','WhatsApp Competitor','sarah@gmail.com','2023-03-10','2023-03-25','2023-09-01',' We are seeking a team of professionals to develop a new messaging app that will rival WhatsApp in terms of functionality and user experience. The app will feature a range of advanced features such as end-to-end encryption, group chat capabilities, and seamless integration with other popular apps and services. The ultimate goal is to create a messaging platform that is both secure and user-friendly.','Open','Paris','France');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-15 14:53:18
