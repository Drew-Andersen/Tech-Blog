// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPass(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// User Table Model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, INFINITY]
            }
        }
    },
    {
        // Hooks -- hash the passwords
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.email = await newUserData.email.toLowerCase();
                return newUserData.email
            },
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData.password
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.email = await updatedUserData.email.toLowerCase();
                return updatedUserData.email;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt(updatedUserData.password, 10);
                return updatedUserData.password;
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

// Export User
module.exports = User;