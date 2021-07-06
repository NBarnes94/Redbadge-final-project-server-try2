const UserModel = require('./user');
const VGModel = require('./videoGame');
const MovieModel = require('./movie');
const BookModel = require('./book');
const CollectionModel = require('./collections');
const CollectionTable = require('./collectionTable');

// CollectionModel.hasMany(VGModel);
// VGModel.belongsTo(CollectionModel)

// VGModel.belongsToMany(CollectionModel, {through: CollectionTable});
CollectionModel.belongsToMany(VGModel, {through: CollectionTable})

// CollectionModel.hasMany(BookModel);
// BookModel.belongsTo(CollectionModel)

// BookModel.belongsToMany(CollectionModel, {through: CollectionTable});
CollectionModel.belongsToMany(BookModel, {through: CollectionTable})

// CollectionModel.hasMany(MovieModel);
// MovieModel.belongsTo(CollectionModel)

// MovieModel.belongsToMany(CollectionModel, {through: CollectionTable});
CollectionModel.belongsToMany(MovieModel, {through: CollectionTable})



UserModel.hasMany(CollectionModel);
CollectionModel.belongsTo(UserModel);

module.exports ={
    UserModel, 
    VGModel,
    MovieModel,
    BookModel,
    CollectionModel, 
    CollectionTable
}