import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Review = sequelize.define ('Review', {
    rating : { type : DataTypes.INTEGER, allowNull:false},
    reviewer : { type : DataTypes.TEXT, allowNull:false},
    comment : { type : DataTypes.TEXT, allowNull:false},
    bookId : { type : DataTypes.INTEGER, allowNull:false},
    // filePath : { type : DataTypes.STRING, allowNull:true},
    // fileName : { type : DataTypes.STRING, allowNull:true},
},
    {
        timestamps: true
    }
)

export default Review