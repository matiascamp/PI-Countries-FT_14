const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('activity', {
    nameAct: {
      type: DataTypes.STRING,
    },
    difficult: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            min:1,
            max:5
        }
      },
    duration: {
        type: DataTypes.INTEGER
    },
    season : {
        type: DataTypes.ENUM('Verano','Invierno','Primavera','Otoño')
    }
  })
}