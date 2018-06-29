module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
        text: {
            type:DataTypes.STRING(140),
            allowNull: false,
            validate: {
                len:[1,50]
            }
        },
        complete: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Account;
};