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
-- Table structure for table `user_education`
--

DROP TABLE IF EXISTS `user_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_education` (
  `user_email` text,
  `edu_type` text,
  `edu_degree` text,
  `edu_school` text,
  `edu_desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_education`
--

LOCK TABLES `user_education` WRITE;
/*!40000 ALTER TABLE `user_education` DISABLE KEYS */;
INSERT INTO `user_education` VALUES ('sullivanlouis0@gmail.com','BSc','Computer Science','University College Cork','Programming, Ethical Hacking, Cloud Infrastructure, Operating Systems, Relational Databases, Software Engineering'),('sarah@gmail.com','BSc','Computer Science','Imperial College London','Software Engineering, Object-Oriented Design, Algorithms and Data Structures, Database Systems, Web Development, Human-Computer Interaction'),('john@gmail.com','BSc','Computer Science','New York University','Object-Oriented Programming, Web Development, Database Systems, Artificial Intelligence, Operating Systems, Algorithms and Data Structures'),('jacob@gmail.com','BSc','Computer Science','University of Manchester','Object-Oriented Programming, Software Design and Development, Database Systems, Software Testing and Documentation, Operating Systems and Computer Networks, Web Technologies'),('jacob@gmail.com','MSc','Software Engineering','University of Leeds','Software Architecture, Advanced Software Engineering, Requirements Engineering, Formal Methods, Software Testing and Quality Assurance'),('rachel@gmail.com','BSc','Computer Science','University of Toronto','Object-Oriented Programming, Software Design and Development, Database Systems, Operating Systems and Computer Networks, Human-Computer Interaction'),('ingrid@gmail.com','BA','Marketing','Universitetet i Oslo','Principles of Marketing, Consumer Behavior, Marketing Research, Marketing Communications, Digital Marketing, Brand Management'),('katie@gmail.com','Certificate IV','Building and Construction','Dublin Institute of Technology','Construction technology and materials. Site surveying and set-out. Building codes and standards. Project management and scheduling. Occupational health and safety (OHS)'),('ben@gmail.com','BSc','Human-Computer Interaction','University of Amsterdam','User Experience Design, Usability Testing, Interaction Design, Information Architecture, Visual Design, Web Development'),('sofia@gmail.com','BSc','Biochemistry','University of California, Los Angeles','Organic Chemistry, Molecular Biology, Genetics, Cellular Biology, Biostatistics, Immunology'),('sofia@gmail.com','PhD','Biomedical Sciences','Stanford University','Advanced Research Methods, Cellular Signaling, Cancer Biology, Microbiology, Virology, Clinical Trials'),('sebastian@gmail.com','BSc','Computer Science','University of Toronto','Programming, Data Structures, Algorithms, Computer Networks, Database Systems, Operating Systems'),('sebastian@gmail.com','MSc','Machine Learning','Carnegie Mellon University','Statistical Machine Learning, Deep Learning, Reinforcement Learning, Natural Language Processing, Computer Vision'),('madison@gmail.com','BSc','Data Science','New York University','Data Mining, Machine Learning, Big Data Analytics, Natural Language Processing, Time Series Analysis, Visualization'),('alicia@gmail.com','BSc','Computer Science','Polytechnic University of Catalonia','Programming Fundamentals, Data Structures, Algorithms, Operating Systems, Databases, Software Engineering'),('alicia@gmail.com','MSc','Mobile App Development','Universitat Politècnica de Catalunya','Mobile App Development for iOS and Android, User Experience Design, Mobile App Security, Cross-Platform Mobile App Development, Web Services'),('paul@gmail.com','BSc','Architecture','University College Cork','Architectural Design, History of Architecture, Building Technology, Structures, Architectural Theory, Professional Practice.'),('hans@gmail.com','BSc','Civil Engineering','Technical University of Munich','Structural Engineering, Building Design, Construction Management, Materials Science, Surveying, Project Management'),('jim@gmail.com','Apprenticeship','Carpentry and Joinery','Dublin Institute of Technology','Framing, Finishing, Cabinetry, Woodworking Techniques, Safety Procedures'),('sean@gmail.com','Apprenticeship','Electrical Installation','Galway-Mayo Institute of Technology','Electrical Theory, Circuit Design, Wiring Techniques, Safety Procedures'),('jack@gmail.com','Apprenticeship','Plumbing and Heating','Dublin Institute of Technology','Plumbing Theory, Heating Systems, Pipe-fitting, Drainage');
/*!40000 ALTER TABLE `user_education` ENABLE KEYS */;
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
