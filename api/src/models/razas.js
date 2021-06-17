const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('razas', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    años_de_vida: {
      type: DataTypes.STRING
    }
  });
  
};
