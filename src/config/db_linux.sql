-- -----------------------------------------------------
-- Creación de la base de datos `proyecto`
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `proyecto`;
CREATE DATABASE IF NOT EXISTS `proyecto`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `proyecto`;


-- -----------------------------------------------------
-- Configuración inicial de sesión (compatible con MariaDB)
-- -----------------------------------------------------
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- -----------------------------------------------------
-- Table structure for table `troles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `troles`;
CREATE TABLE `troles` (
  `IdRol` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1',
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `troles`
LOCK TABLES `troles` WRITE;
/*!40000 ALTER TABLE `troles` DISABLE KEYS */;
INSERT INTO `troles` VALUES 
  (1,'Cliente',1,'2025-08-17'),
  (2,'Tecnico',1,'2025-08-17'),
  (3,'Administrador',1,'2025-08-17');
/*!40000 ALTER TABLE `troles` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tusuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tusuarios`;
CREATE TABLE `tusuarios` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `IdRol` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido1` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Contraseña` varchar(50) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1',
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdUsuario`),
  UNIQUE KEY `Correo` (`Correo`),
  KEY `idx_idrol` (`IdRol`),
  CONSTRAINT `tusuarios_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `troles` (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tusuarios`
LOCK TABLES `tusuarios` WRITE;
/*!40000 ALTER TABLE `tusuarios` DISABLE KEYS */;
INSERT INTO `tusuarios` VALUES 
  (1,1,'Juan','Pérez','juan.cliente@example.com','cliente123',1,'2025-08-17'),
  (2,2,'María','López','maria.tecnico@example.com','tecnico123',1,'2025-08-17'),
  (3,3,'Carlos','García','carlos.admin@example.com','admin123',1,'2025-08-17');
/*!40000 ALTER TABLE `tusuarios` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tcategorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcategorias`;
CREATE TABLE `tcategorias` (
  `IdCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1',
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tcategorias`
LOCK TABLES `tcategorias` WRITE;
/*!40000 ALTER TABLE `tcategorias` DISABLE KEYS */;
INSERT INTO `tcategorias` VALUES 
  (1,'Procesadores',1,'2025-08-17'),
  (2,'Tarjetas Gráficas',1,'2025-08-17'),
  (3,'Memorias RAM',1,'2025-08-17');
/*!40000 ALTER TABLE `tcategorias` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tcomponentes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcomponentes`;
CREATE TABLE `tcomponentes` (
  `IdComponente` int(11) NOT NULL AUTO_INCREMENT,
  `IdCategoria` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `StockDisponible` int(11) NOT NULL DEFAULT '0',
  `CostoUnitario` decimal(10,2) NOT NULL DEFAULT '0.00',
  `StockDañado` int(11) NOT NULL DEFAULT '0',
  `StockEnUso` int(11) NOT NULL DEFAULT '0',
  `StockUsado` int(11) NOT NULL DEFAULT '0',
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdComponente`),
  KEY `idx_idcategoria` (`IdCategoria`),
  CONSTRAINT `tcomponentes_ibfk_1` FOREIGN KEY (`IdCategoria`) REFERENCES `tcategorias` (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tcomponentes`
LOCK TABLES `tcomponentes` WRITE;
/*!40000 ALTER TABLE `tcomponentes` DISABLE KEYS */;
INSERT INTO `tcomponentes` VALUES 
  (1,1,'Intel Core i5',10,200.00,1,2,0,'2025-08-17'),
  (2,1,'AMD Ryzen 5',8,180.00,0,1,1,'2025-08-17'),
  (3,2,'NVIDIA GTX 1660',5,300.00,0,1,0,'2025-08-17'),
  (4,2,'AMD Radeon RX 580',7,250.00,1,0,1,'2025-08-17'),
  (5,3,'Kingston 8GB DDR4',15,40.00,0,3,2,'2025-08-17'),
  (6,3,'Corsair 16GB DDR4',12,80.00,1,2,1,'2025-08-17');
/*!40000 ALTER TABLE `tcomponentes` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tcomputadoras`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tcomputadoras`;
CREATE TABLE `tcomputadoras` (
  `IdComputadora` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdComputadora`),
  KEY `idx_idusuario` (`IdUsuario`),
  CONSTRAINT `tcomputadoras_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `tusuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tcomputadoras`
LOCK TABLES `tcomputadoras` WRITE;
/*!40000 ALTER TABLE `tcomputadoras` DISABLE KEYS */;
INSERT INTO `tcomputadoras` VALUES (1,1,'PC 12456','2025-08-17');
/*!40000 ALTER TABLE `tcomputadoras` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tensambles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tensambles`;
CREATE TABLE `tensambles` (
  `IdEnsamble` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuarioTecnico` int(11) NOT NULL,
  `IdUsuarioCliente` int(11) NOT NULL,
  `FechaInicio` datetime DEFAULT (NOW()),
  `FechaFin` datetime DEFAULT NULL,
  `CostoTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Estado` enum('A','P','E','C') NOT NULL,
  PRIMARY KEY (`IdEnsamble`),
  KEY `idx_idusuariocliente` (`IdUsuarioCliente`),
  KEY `idx_idusuariotecnico` (`IdUsuarioTecnico`),
  CONSTRAINT `tensambles_ibfk_1` FOREIGN KEY (`IdUsuarioCliente`) REFERENCES `tusuarios` (`IdUsuario`),
  CONSTRAINT `tensambles_ibfk_2` FOREIGN KEY (`IdUsuarioTecnico`) REFERENCES `tusuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tensambles`
LOCK TABLES `tensambles` WRITE;
/*!40000 ALTER TABLE `tensambles` DISABLE KEYS */;
INSERT INTO `tensambles` VALUES 
  (1,2,1,'2025-08-17 19:16:34',NULL,500.00,'P'),
  (2,2,1,'2025-08-17 19:16:34','2025-08-17 19:16:34',750.00,'E');
/*!40000 ALTER TABLE `tensambles` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tmantenimientos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tmantenimientos`;
CREATE TABLE `tmantenimientos` (
  `IdMantenimiento` int(11) NOT NULL AUTO_INCREMENT,
  `IdComputadora` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `FechaProgramada` date NOT NULL,
  `FechaRealizada` date DEFAULT NULL,
  `CostoTotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Estado` enum('A','P','E','C') NOT NULL,
  PRIMARY KEY (`IdMantenimiento`),
  KEY `idx_idusuario` (`IdUsuario`),
  KEY `idx_idcomputadora` (`IdComputadora`),
  CONSTRAINT `tmantenimientos_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `tusuarios` (`IdUsuario`),
  CONSTRAINT `tmantenimientos_ibfk_2` FOREIGN KEY (`IdComputadora`) REFERENCES `tcomputadoras` (`IdComputadora`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tmantenimientos`
LOCK TABLES `tmantenimientos` WRITE;
/*!40000 ALTER TABLE `tmantenimientos` DISABLE KEYS */;
INSERT INTO `tmantenimientos` VALUES (1,1,2,'2025-08-17',NULL,120.00,'P');
/*!40000 ALTER TABLE `tmantenimientos` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `treservas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `treservas`;
CREATE TABLE `treservas` (
  `IdReserva` int(11) NOT NULL AUTO_INCREMENT,
  `IdUsuario` int(11) NOT NULL,
  `FechaReserva` date DEFAULT (CURDATE()),
  `Pago` decimal(10,2) NOT NULL DEFAULT '0.00',
  `Estado` enum('P','E','C') NOT NULL,
  PRIMARY KEY (`IdReserva`),
  KEY `idx_idusuario` (`IdUsuario`),
  CONSTRAINT `treservas_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `tusuarios` (`IdUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `treservas`
LOCK TABLES `treservas` WRITE;
/*!40000 ALTER TABLE `treservas` DISABLE KEYS */;
INSERT INTO `treservas` VALUES (1,1,'2025-08-17',330.00,'P');
/*!40000 ALTER TABLE `treservas` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tdetalleensamble`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tdetalleensamble`;
CREATE TABLE `tdetalleensamble` (
  `IdDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `IdEnsamble` int(11) NOT NULL,
  `IdComponente` int(11) NOT NULL,
  PRIMARY KEY (`IdDetalle`),
  KEY `idx_idensamble` (`IdEnsamble`),
  KEY `idx_idcomponente` (`IdComponente`),
  CONSTRAINT `tdetalleensamble_ibfk_1` FOREIGN KEY (`IdEnsamble`) REFERENCES `tensambles` (`IdEnsamble`),
  CONSTRAINT `tdetalleensamble_ibfk_2` FOREIGN KEY (`IdComponente`) REFERENCES `tcomponentes` (`IdComponente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tdetalleensamble`
LOCK TABLES `tdetalleensamble` WRITE;
/*!40000 ALTER TABLE `tdetalleensamble` DISABLE KEYS */;
INSERT INTO `tdetalleensamble` VALUES 
  (1,1,1),(2,1,3),(3,1,5),(4,2,2),(5,2,4),(6,2,6);
/*!40000 ALTER TABLE `tdetalleensamble` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tdetallemantenimiento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tdetallemantenimiento`;
CREATE TABLE `tdetallemantenimiento` (
  `IdDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `IdMantenimiento` int(11) NOT NULL,
  `IdComponente` int(11) NOT NULL,
  PRIMARY KEY (`IdDetalle`),
  KEY `idx_idmantenimiento` (`IdMantenimiento`),
  KEY `idx_idcomponente` (`IdComponente`),
  CONSTRAINT `tdetallemantenimiento_ibfk_1` FOREIGN KEY (`IdMantenimiento`) REFERENCES `tmantenimientos` (`IdMantenimiento`),
  CONSTRAINT `tdetallemantenimiento_ibfk_2` FOREIGN KEY (`IdComponente`) REFERENCES `tcomponentes` (`IdComponente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tdetallemantenimiento`
LOCK TABLES `tdetallemantenimiento` WRITE;
/*!40000 ALTER TABLE `tdetallemantenimiento` DISABLE KEYS */;
INSERT INTO `tdetallemantenimiento` VALUES (1,1,1),(2,1,5);
/*!40000 ALTER TABLE `tdetallemantenimiento` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table structure for table `tdetallereserva`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tdetallereserva`;
CREATE TABLE `tdetallereserva` (
  `IdDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `IdReserva` int(11) NOT NULL,
  `IdComponente` int(11) NOT NULL,
  PRIMARY KEY (`IdDetalle`),
  KEY `idx_idreserva` (`IdReserva`),
  KEY `idx_idcomponente` (`IdComponente`),
  CONSTRAINT `tdetallereserva_ibfk_1` FOREIGN KEY (`IdReserva`) REFERENCES `treservas` (`IdReserva`),
  CONSTRAINT `tdetallereserva_ibfk_2` FOREIGN KEY (`IdComponente`) REFERENCES `tcomponentes` (`IdComponente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tdetallereserva`
LOCK TABLES `tdetallereserva` WRITE;
/*!40000 ALTER TABLE `tdetallereserva` DISABLE KEYS */;
INSERT INTO `tdetallereserva` VALUES (1,1,3),(2,1,6);
/*!40000 ALTER TABLE `tdetallereserva` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Restauración de configuración de sesión
-- -----------------------------------------------------
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -----------------------------------------------------
-- Fin del dump
-- -----------------------------------------------------
-- Dump completed on 2025-08-17