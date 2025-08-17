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
-- Table structure for table `tensambles`
--

DROP TABLE IF EXISTS `tensambles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tensambles` (
  `IdEnsamble` int NOT NULL AUTO_INCREMENT,
  `IdUsuarioTecnico` int DEFAULT NULL,
  `IdUsuarioCliente` int DEFAULT NULL,
  `FechaInicio` datetime DEFAULT (now()),
  `FechaFin` datetime DEFAULT NULL,
  `CostoTotal` decimal(10,2) DEFAULT NULL,
  `Estado` enum('A','P','E','C') NOT NULL,
  PRIMARY KEY (`IdEnsamble`),
  KEY `IdUsuarioCliente` (`IdUsuarioCliente`),
  KEY `IdUsuarioTecnico` (`IdUsuarioTecnico`),
  CONSTRAINT `tensambles_ibfk_1` FOREIGN KEY (`IdUsuarioCliente`) REFERENCES `tusuarios` (`IdUsuario`),
  CONSTRAINT `tensambles_ibfk_2` FOREIGN KEY (`IdUsuarioTecnico`) REFERENCES `tusuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tensambles`
--

LOCK TABLES `tensambles` WRITE;
/*!40000 ALTER TABLE `tensambles` DISABLE KEYS */;
INSERT INTO `tensambles` VALUES (1,2,1,'2025-08-17 16:32:54',NULL,500.00,'P'),(2,2,1,'2025-08-17 16:32:54','2025-08-17 16:32:54',750.00,'E');
/*!40000 ALTER TABLE `tensambles` ENABLE KEYS */;
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
