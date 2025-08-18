DELIMITER $$
CREATE PROCEDURE sp_obtener_usuarios()
BEGIN
    SELECT 
        u.IdUsuario,
        u.Nombre,
        u.Apellido1,
        u.Correo,
        r.Nombre AS Rol,
        u.Estado,
        u.FechaRegistro
    FROM TUsuarios u
    INNER JOIN TRoles r ON u.IdRol = r.IdRol
    WHERE u.Estado = 1;
END $$
DELIMITER ;