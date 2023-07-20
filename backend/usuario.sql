-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-07-2023 a las 06:00:46
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reserva`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `tipo_documento` varchar(100) NOT NULL,
  `documento` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `rolusuario` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `apellido`, `tipo_documento`, `documento`, `email`, `contrasena`, `rol`, `rolusuario`) VALUES
(14, 'Luis', 'Guerra', '', '', 'luis@guerra.com', '84b90ebb62cb2a59d5d525582ded3a9e', 'admin', 0),
(15, 'Luis', 'Guerra', '', '', 'luisa@guerra.com', 'a83f0f76c2afad4f5d7260824430b798', 'admin', 2),
(16, 'Luis', 'Perez', 'c', '6543713', 'luisperez@gmail.com', '', '', 1),
(17, 'Ramon', 'Juan', 'p ', '123456789', 'Ramon@gmail.com', '', '', 1),
(18, 'usuario', 'nuevo', 'p ', '5678909876543', 'user@gmail.com', '', '', 1),
(19, 'nuevo', 'usuario', 'c', '567890', 'nuevo@gmail.com', '', '', 1),
(20, 'perez', 'perez', 'c', '876543', 'al@al.com', '', '', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
