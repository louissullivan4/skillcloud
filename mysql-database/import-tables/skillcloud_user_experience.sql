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
-- Table structure for table `user_experience`
--

DROP TABLE IF EXISTS `user_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_experience` (
  `user_email` text,
  `experience_name` text,
  `experience_title` text,
  `experience_start` text,
  `experience_end` text,
  `experience_desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_experience`
--

LOCK TABLES `user_experience` WRITE;
/*!40000 ALTER TABLE `user_experience` DISABLE KEYS */;
INSERT INTO `user_experience` VALUES ('sullivanlouis0@gmail.com','IBM','Software Engineer Intern','2022-03-16','2022-08-31','For the work placement programme during the degree, joined the APIConnect team in IBM. Assisted a team of eight people on a business automation tool named Watson Orchestrate. Spent a large majority of the time developing a cloud computing driven application called APICatalog. Kubernetes, Docker and Golang were technologies used daily. An example of a feature implemented would be a script wrote that allowed other teams to import APIs to the catalog automatically. This accelerated the speed at which they could make updates to their APIs on a live environment. Learnt several non-technical skills such as how an Agile Development team works, how to communicate within a team and with others, documentation skills, presentation skills and how to take initiative when developing software.'),('sullivanlouis0@gmail.com','Bausch Health Ireland','Software Engineer Intern','2021-05-01','2021-08-31','Chosen as the recipient of Bausch & Lombs Scholars Bursary Award in 2018. This included both monetary support and an internship with the company during the summer holidays while completing my degree. Placed in the Projects Engineering office for three months. Spent time learning C# and then building web apps that are now used on the machines in the company. The web apps displayed data from stored procedures and then tables and line graphs were created to display this data. Engineers could then actively use this data to discover issues in the process and work to fix them.'),('sarah@gmail.com','J.P Morgan','Software Engineer','2021-01-30','2022-01-20','Worked as a software engineer at J.P Morgan for 2 years. Worked on various projects including the development of a new feature for J.P Morgans trading platform. Worked with multiple technology stacks including the following Node.Js, Python, Java, .Net, React, Angular, MySQL, NoSQL, Relational Databases (Oracle, SQLServer). An example of what my team and I worked on would be integrating java-based features with modern APIs and cloud native environments to support JPMorgan Chases 5k+ retail branches and 17k+ ATMs across the U.S.'),('john@gmail.com','Amazon Web Services','Software Engineer','2018-02-08','2020-12-19',' Worked as a software development engineer at Amazon for 3 years. Worked on the development of new features for the Amazon website. I was responsible for the development of new features and the maintenance of existing features. I also collaborated with the design and product teams to ensure the features met user needs and were user-friendly. Technologies used includes Java, MySQL, Docker, AWS, Spring and AJAX'),('john@gmail.com','Amazon Web Services','Software Engineer','2018-02-08','2020-12-19',' Worked as a software development engineer at Amazon for 3 years. Worked on the development of new features for the Amazon website. I was responsible for the development of new features and the maintenance of existing features. I also collaborated with the design and product teams to ensure the features met user needs and were user-friendly. Technologies used includes Java, MySQL, Docker, AWS, Spring and AJAX'),('jacob@gmail.com','Amazon','QA Tester','2018-02-24','2022-06-16','Tested multiple software applications and products across different platforms including desktop, mobile and web applications. Performed manual and automated testing using Selenium, JMeter, and Appium. Collaborated with developers, designers and product managers to ensure that products met user requirements and were of high quality'),('jacob@gmail.com','Microsoft','Senior QA Tester','2022-07-07','2023-03-09','Designed and implemented test plans and test cases for various products including Windows and Office suites. Performed manual and automated testing using Selenium, JMeter, and Postman. Mentored junior testers on testing best practices and methodologies'),('rachel@gmail.com','Shopify','QA Tester','2020-05-14','2022-06-13','Developed and executed test plans and test cases for web applications using Selenium and JIRA. Worked collaboratively with developers, designers and product managers to ensure that products met user requirements and were of high quality. Conducted manual and automated testing of Shopify\'s mobile applications using Appium, identifying and addressing issues to ensure optimal app performance on both iOS and Android platforms.'),('rachel@gmail.com','IBM','QA Tester','2022-09-01','2023-03-09','Designed and executed test plans and test cases for various software products including IBM Watson. Performed manual and automated testing of RESTful APIs using Postman'),('ingrid@gmail.com','Ogilvy','Digital Marketing Strategist','2017-06-16','2020-09-16','Developed and executed successful digital marketing campaigns for Fortune 500 clients, utilizing channels such as social media, PPC, email marketing, and SEO. Analyzed campaign performance data using Google Analytics and other tools, making data-driven optimizations to improve ROI. Worked collaboratively with cross-functional teams to ensure campaigns aligned with overall marketing and business objectives'),('ingrid@gmail.com','Blue Fountain Media','Senior Digital Marketing Strategist','2021-07-17','2023-03-07','Led digital marketing strategy for a portfolio of clients, specializing in SEO and PPC advertising. Managed a team of digital marketing specialists to execute on campaigns and achieve business goals. Worked directly with clients to identify needs and goals, and to provide regular reporting and insights on campaign performance. Used different tools such as Google Ads, Google Analytics and Hubspot'),('katie@gmail.com',' XYZ Construction','Builder','2014-02-13','2019-08-31','Managed residential and commercial building projects from start to finish, including planning, estimating, scheduling, and overseeing construction. Coordinated with architects, engineers, subcontractors, and suppliers to ensure timely and cost-effective project completion. Maintained strict adherence to building codes, safety regulations, and quality standards\n'),('katie@gmail.com','ABC Builders','Site Supervisor','2019-09-07','2023-03-15','Supervised construction sites for residential and commercial building projects, ensuring that work was completed according to plans, specifications, and schedules. Coordinated with tradespeople and subcontractors to ensure work was completed safely and to the highest quality standards. Conducted regular inspections to ensure compliance with building codes and safety regulations.'),('ben@gmail.com','Canva',' UX Designer','2021-02-11','2023-03-08','Led design projects for Canva\'s mobile and web platforms. Conducted user research and usability testing to inform design decisions. Worked with cross-functional teams to create user flows, wireframes, and high-fidelity prototypes. Tools used in role included Sketch, Adobe Creative Suite, Figma, and InVision'),('sofia@gmail.com','National Institutes of Health (NIH)','Postdoctoral Fellow','2019-05-17','2021-07-16','Conducted research on the immune system and cancer immunotherapy. Investigated the molecular mechanisms underlying the immune response to cancer and developed novel immunotherapeutic strategies. Published several research papers in high-impact scientific journals and presented findings at international conferences. Mentored graduate and undergraduate students in the lab.'),('sofia@gmail.com','Genentech','Medical Researcher','2021-10-07','2023-03-09','Worked on the discovery and development of new treatments for cancer. Collaborated with interdisciplinary teams to design and execute experiments aimed at identifying new targets for drug development. Conducted in vitro and in vivo assays to assess the efficacy and safety of potential drug candidates. Developed and implemented new protocols for high-throughput screening assays. Presented findings to senior management and external partners.'),('sebastian@gmail.com','Google','Machine Learning Engineer','2018-01-18','2023-03-08','Worked on developing machine learning models for Google\'s search and advertising products. Developed a deep learning model for image recognition that improved the accuracy of image search results by 10%. Conducted research on reinforcement learning algorithms for optimizing ad campaigns. Collaborated with software engineers to integrate machine learning models into Google\'s products.'),('madison@gmail.com','Facebook','Meta','2022-06-10','2023-03-22','Worked on analyzing user behavior data to improve user engagement on Facebook\'s platform. Developed predictive models for ad targeting and content recommendation systems. Conducted A/B testing to evaluate the effectiveness of new features and algorithms. Collaborated with product managers and software engineers to integrate data-driven solutions into Facebook\'s products.'),('alicia@gmail.com','Glovo','Android Developer','2015-06-25','2020-02-05','Worked on developing the Glovo app, which is a platform that allows users to order anything from their favorite restaurants, shops, and stores. Collaborated with product managers, designers, and software engineers to create new features and improve the user experience. Developed clean and efficient code following the latest Android design patterns and best practices. Used various tools and libraries such as Retrofit, Dagger, and RxJava to make the app performant and scalable.'),('alicia@gmail.com','Apple','iOS Developer','2021-02-14','2023-03-14','Worked on developing the Apple Store app, which is a platform that allows users to browse and purchase products from Apple. Developed new features and improved the app\'s performance and user experience. Worked with the latest iOS design patterns and best practices. Used various tools and libraries such as Alamofire, SwiftyJSON, and Kingfisher to make the app performant and scalable. Collaborated with product managers, designers, and software engineers to ensure the app\'s quality and success.'),('paul@gmail.com','Skidmore, Owings & Merrill LLP','Architect','2021-05-11','2023-03-02','Worked on various projects ranging from large-scale commercial buildings to residential properties. Collaborated with other architects, engineers, and consultants to create design concepts and drawings. Used various software such as AutoCAD, Revit, and SketchUp to produce detailed drawings and models.'),('hans@gmail.com','Züblin AG','Project Manager','2007-02-15','2023-03-13','Managed a €30 million commercial office building project in Munich from start to finish. Oversaw all aspects of the project, including design, permitting, construction, and final occupancy. Successfully delivered the project on time and within budget while maintaining a high level of quality.'),('jim@gmail.com','JM Carpentry','Owner/Carpenter','2009-11-21','2023-03-07','As the owner of my own carpentry business, I am responsible for all aspects of the business, from customer relations to project management to carpentry work. I work closely with clients to understand their needs and design custom woodwork solutions that meet their requirements. I manage projects from start to finish, ensuring that they are completed on time and on budget. Examples of projects I have completed include custom cabinetry, built-in bookshelves, and hardwood flooring installations.'),('sean@gmail.com','ESB Networks','Electrician','2021-01-07','2023-03-07','As an electrician for ESB Networks, I was responsible for maintaining and repairing the electrical distribution network in the Galway area. This involved troubleshooting and repairing faults in the network, installing and maintaining electrical equipment, and ensuring that all work was completed to the highest standards of safety and quality. I also worked closely with other electricians and engineers to plan and execute large-scale projects, such as the installation of new substations and upgrading the electrical infrastructure in the area.'),('jack@gmail.com','Dublin City Council','Plumber','2016-07-14','2023-03-07','As a plumber for Dublin City Council, I was responsible for maintaining and repairing the plumbing systems in public buildings and facilities. This involved troubleshooting and repairing faults in the plumbing systems, installing and maintaining plumbing fixtures and appliances, and ensuring that all work was completed to the highest standards of safety and quality. I also worked closely with other tradespeople and engineers to plan and execute large-scale projects, such as the installation of new heating and plumbing systems in public buildings.');
/*!40000 ALTER TABLE `user_experience` ENABLE KEYS */;
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