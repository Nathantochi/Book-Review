import { sequelize } from "../config/dbConfig.js";
import Book from "./bookModels.js";
import Review from "./reviewModels.js";
import User from "./userModels.js";

Book.hasMany(Review, {foreignKey : 'bookid', onDelete: 'CASCADE'})
Review.belongsTo(Book, {foreignKey: 'bookid'})

export { sequelize, Book, Review, User}