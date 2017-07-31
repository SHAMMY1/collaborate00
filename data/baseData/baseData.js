const { ObjectId } = require('mongodb');

class BaseData {
    constructor(db, modelClass, validator) {
        this.db = db;
        this.modelClass = modelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = db.collection(this.collectionName);
    }
    getAll() {
        let result = this.collection.find({})
            .toArray();
        if (this.modelClass.toViewModel) {
            result = result.then((models) => {
                return models.map(this.modelClass.toViewModel);
            });
        }
        return result;
    }

    create(model) {
        const modelValidation = this._isModelValid(model);
        if (!modelValidation.isModelValid) {
            return Promise.reject(modelValidation);
        }
        let result = this.collection.insert(model);

        if (this.modelClass.toViewModel) {
            result = result.then(() => this.modelClass.toViewModel(model));
        }

        return result;
    }

    findById(id) {
        let result = this.collection.findOne({ _id: new ObjectId(id) });

        if (this.modelClass.toViewModel) {
            result = result.then((model) => {
                if (model) {
                    model = this.modelClass.toViewModel(model);
                }
                return model;
            });
        }
        return result;
    }

    _getCollectionName() {
        return this.modelClass.name.toLowerCase() + 's';
    }

    _isModelValid(model) {
        return this.validator.validateModel(model);
    }
}

module.exports = BaseData;
