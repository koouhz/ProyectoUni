DROP DATABASE IF EXISTS `proyecto`;
CREATE DATABASE IF NOT EXISTS `proyecto`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `proyecto`;

DROP TABLE IF EXISTS `troles`;
CREATE TABLE `troles` (
  `IdRol` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(30) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1',
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `troles` WRITE;
INSERT INTO `troles` VALUES 
  (1,'Cliente',1,'2025-08-17'),
  (2,'Tecnico',1,'2025-08-17'),
  (3,'Administrador',1,'2025-08-17');
UNLOCK TABLES;

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

LOCK TABLES `tusuarios` WRITE;
INSERT INTO `tusuarios` VALUES 
  (1,1,'Juan','Pérez','juan.cliente@example.com','cliente123',1,'2025-08-17'),
  (2,2,'María','López','maria.tecnico@example.com','tecnico123',1,'2025-08-17'),
  (3,3,'Carlos','García','carlos.admin@example.com','admin123',1,'2025-08-17');
UNLOCK TABLES;

DROP TABLE IF EXISTS `tcategorias`;
CREATE TABLE `tcategorias` (
  `IdCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Estado` tinyint(1) NOT NULL DEFAULT '1',
  `FechaRegistro` date DEFAULT (CURDATE()),
  PRIMARY KEY (`IdCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `tcategorias` WRITE;
INSERT INTO `tcategorias` VALUES 
  (1,'Procesadores',1,'2025-08-17'),
  (2,'Tarjetas Gráficas',1,'2025-08-17'),
  (3,'Memorias RAM',1,'2025-08-17');
UNLOCK TABLES;

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

LOCK TABLES `tcomponentes` WRITE;
INSERT INTO `tcomponentes` VALUES 
  (1,1,'Intel Core i5',10,200.00,1,2,0,'2025-08-17'),
  (2,1,'AMD Ryzen 5',8,180.00,0,1,1,'2025-08-17'),
  (3,2,'NVIDIA GTX 1660',5,300.00,0,1,0,'2025-08-17'),
  (4,2,'AMD Radeon RX 580',7,250.00,1,0,1,'2025-08-17'),
  (5,3,'Kingston 8GB DDR4',15,40.00,0,3,2,'2025-08-17'),
  (6,3,'Corsair 16GB DDR4',12,80.00,1,2,1,'2025-08-17');
UNLOCK TABLES;

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

LOCK TABLES `tcomputadoras` WRITE;
INSERT INTO `tcomputadoras` VALUES (1,1,'PC 12456','2025-08-17');
UNLOCK TABLES;

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

LOCK TABLES `tensambles` WRITE;
INSERT INTO `tensambles` VALUES 
  (1,2,1,'2025-08-17 19:16:34',NULL,500.00,'P'),
  (2,2,1,'2025-08-17 19:16:34','2025-08-17 19:16:34',750.00,'E');
UNLOCK TABLES;

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

LOCK TABLES `tmantenimientos` WRITE;
INSERT INTO `tmantenimientos` VALUES (1,1,2,'2025-08-17',NULL,120.00,'P');
UNLOCK TABLES;

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

LOCK TABLES `treservas` WRITE;
INSERT INTO `treservas` VALUES (1,1,'2025-08-17',330.00,'P');
UNLOCK TABLES;

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

LOCK TABLES `tdetalleensamble` WRITE;
INSERT INTO `tdetalleensamble` VALUES 
  (1,1,1),(2,1,3),(3,1,5),(4,2,2),(5,2,4),(6,2,6);
UNLOCK TABLES;

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

LOCK TABLES `tdetallemantenimiento` WRITE;
INSERT INTO `tdetallemantenimiento` VALUES (1,1,1),(2,1,5);
UNLOCK TABLES;

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

LOCK TABLES `tdetallereserva` WRITE;
INSERT INTO `tdetallereserva` VALUES (1,1,3),(2,1,6);
UNLOCK TABLES;
