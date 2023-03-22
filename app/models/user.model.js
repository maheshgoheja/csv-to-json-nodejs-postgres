module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
        "user", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            address: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            additional_info: {
                type: DataTypes.JSONB,
                allowNull: true
            }
        }
    );

    return User;
};