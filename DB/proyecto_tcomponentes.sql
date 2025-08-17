-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `tcomponentes`
--

DROP TABLE IF EXISTS `tcomponentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tcomponentes` (
  `IdComponente` int NOT NULL AUTO_INCREMENT,
  `IdCategoria` int DEFAULT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `StockDisponible` int DEFAULT NULL,
  `CostoUnitario` decimal(10,2) DEFAULT NULL,
  `StockDañado` int DEFAULT NULL,
  `StockEnUso` int DEFAULT NULL,
  `StockUsado` int DEFAULT NULL,
  `FechaRegistro` date DEFAULT (curdate()),
  PRIMARY KEY (`IdComponente`),
  KEY `IdCategoria` (`IdCategoria`),
  CONSTRAINT `tcomponentes_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `tcategorias` (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tcomponentes`
--

LOCK TABLES `tcomponentes` WRITE;
/*!40000 ALTER TABLE `tcomponentes` DISABLE KEYS */;
INSERT INTO `tcomponentes` VALUES (1,1,'Intel Core i5',10,200.00,1,2,0,'2025-08-17'),(2,1,'AMD Ryzen 5',8,180.00,0,1,1,'2025-08-17'),(3,2,'NVIDIA GTX 1660',5,300.00,0,1,0,'2025-08-17'),(4,2,'AMD Radeon RX 580',7,250.00,1,0,1,'2025-08-17'),(5,3,'Kingston 8GB DDR4',15,40.00,0,3,2,'2025-08-17'),(6,3,'Corsair 16GB DDR4',12,80.00,1,2,1,'2025-08-17');
/*!40000 ALTER TABLE `tcomponentes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-17 16:35:52
