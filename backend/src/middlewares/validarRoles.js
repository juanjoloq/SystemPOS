const validarRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                message: "Debe ejecutar validarJWT antes de validar roles."
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                ok: false,
                message: "No tiene permisos para realizar esta acción."
            });
        }

        next();
    };

};

export default validarRoles;