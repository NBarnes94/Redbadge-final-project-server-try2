const UserModel = require('./user');
const VGModel = require('./videoGame');
const MovieModel = require('./movie');
const BookModel = require('./book');
const CollectionModel = require('./collections');
const CollectionTable = require('./collectionTable');

VGModel.belongsToMany(CollectionModel, {through: CollectionTable});

BookModel.belongsToMany(CollectionModel, {through: CollectionTable});

MovieModel.belongsToMany(CollectionModel, {through: CollectionTable});

CollectionModel.belongsToMany(VGModel, {through: CollectionTable})


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