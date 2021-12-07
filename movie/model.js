import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import seq from 'sequelize';
const { Sequelize, DataTypes } = seq;

const __dirname = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '\movie.db'),
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
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false },
);

export async function getAll() {
  return Movies.findAll();
}

export async function get(id) {
  Movies.findByPk(id);
}

export async function remove(id) {
  Movies.destroy({ where: { id } });
}

export function save(movie) {
  return Movies.upsert(movie);
}
