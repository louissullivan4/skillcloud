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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `project_id` text,
  `role_category` text,
  `role_title` text,
  `role_desc` text,
  `role_no_needed` text,
  `role_id` text,
  `roles_filled` text,
  `role_remote` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('06490152','- Software Engineer, Full Stack Developer, Programmer, Web Developer','Software Engineer','A developer with experience in building messaging apps and a strong understanding of end-to-end encryption. Should be proficient in several programming languages (Python, Java, etc) and have experience with cloud infrastructure such as AWS, Google Cloud Platform or others..','2','07942085','0','Yes'),('06490152','- UX Designer','UX Designer','A designer with a strong portfolio of work in mobile app design, who can create intuitive and visually pleasing interfaces for the messaging app. Experience with tools such as Adobe or Figma ','1','01650056','0','Yes'),('06490152','- QA Tester, Test Analyst','QA Engineer','A QA Engineer who has experience in testing and quality assurance of messaging apps and has knowledge of automated testing.','1','01196658','0','Yes'),('06128312','- Software Engineer, Full Stack Developer, Programmer, Web Developer','Machine Learning Engineer','A developer with experience in building and training CNNs for image classification. Must have good knowledge in deep learning and computer vision.','1','08188356','0','Yes'),('06128312','- Software Engineer, Full Stack Developer, Programmer, Web Developer','Mobile App Developer','A developer with experience in developing mobile applications for Android and iOS. Knowledge in integrating machine learning models into mobile apps is a plus.','1','01875870','0','Yes'),('06128312','- Software Engineer, Full Stack Developer, Programmer, Web Developer','Data Scientist','A data scientist with experience in data preprocessing, feature extraction, and data augmentation for image classification. Knowledge in medical imaging is a plus.','1','03657893','0','Yes'),('06128312','- Other Healthcare Practitioners and Technical Occupation','Medical Expert','A medical professional with expertise in the medical field. Will be responsible for providing medical guidance and validation of the systems diagnoses. Experience with skin diseases, cancers and other conditions essential.','1','03410410','0','Yes'),('02308994','- Architect, Surveyor, or Cartographer','Architect','A professional with experience in designing residential buildings and creating detailed plans and blueprints.','1','09147609','0','No'),('02308994','- Construction and Extraction (e.g., Construction Laborer, Carpenter, Electrician)','Carpenter','A professional with experience in constructing and installing wooden structures, including framing and finishing.','1','06835473','0','No'),('02308994','- Construction and Extraction (e.g., Construction Laborer, Carpenter, Electrician)','Electrician','A professional with experience in installing and maintaining electrical systems in residential buildings.','1','07854879','0','No'),('02308994','- Construction and Extraction (e.g., Construction Laborer, Carpenter, Electrician)','Plumber','A professional with experience in installing and maintaining plumbing systems in residential buildings.','1','07235373','0','No'),('02308994','- Construction and Extraction (e.g., Construction Laborer, Carpenter, Electrician)','General Contractor','A professional with experience in managing the construction process, including coordinating subcontractors and overseeing all aspects of the project.','1','01920081','0','No');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
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
