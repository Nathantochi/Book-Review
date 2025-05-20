import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Review = sequelize.define ('Review', {
    rating : { type : DataTypes.INTEGER, allowNull:false},
    comment : { type : DataTypes.TEXT, allowNull:false},
    bookid : { type : DataTypes.INTEGER, allowNull:false},
    
},
    {
        timestamps: true
    }
)

export default Review