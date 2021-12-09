import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import seq from 'sequelize';
const { Sequelize, DataTypes } = seq;

const __dirname = dirname(fileURLToPath(import.meta.url));

/* const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '\movie.db'),
  logging: console.log,
}); */

// Variante mit mysql funktioniert.
const sequelize = new Sequelize('movies', 'wwwrun', 'zbw98',{
  dialect: 'mysql',
  logging: console.log,
});



const Movies = sequelize.define(
  'Movies',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false },
);

// Synchronisation forcieren, damit die Tabelle
// auch erstellt wird. Die Datenbank selbst muss aber
// existieren.
await sequelize.sync({force: true});

export function getAll() {
  return Movies.findAll();
}

export function get(id) {
  return Movies.findByPk(id);
}

export function remove(id) {
  Movies.destroy({ where: { id } });
}

export function save(movie) {
  return Movies.upsert(movie);
}
