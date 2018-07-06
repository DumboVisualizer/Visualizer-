module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
        username: {
            type:DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len:[1,50]
            }
        },
        password: {
            type:DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len:[1,200]
            }
        }
    });
    return Account;
};