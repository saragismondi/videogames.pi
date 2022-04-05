const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//falta timestamp
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // le paso esta propiedad, creado en baso de datos, por si solo quiero hacer el llamado en la bse de datos.
    // es mas facil acceder al personaje que cree en mi base de datos, va a tener datos diferente a lso demas
  });
};
 // PONER TIMESTAMP EN FALSE PARA QU E ME QUITE DE LA BASE DE DATOS EL CRATED Y ELL UPGRADEAT 
 //