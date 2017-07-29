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
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model!');
        }
        const result = this.collection.insert(model);

        if (this.modelClass.toViewModel) {
            return result.then(() => this.modelClass.toViewModel(model));
        }

        return result;
    }

    _getCollectionName() {
        return this.modelClass.name.toLowerCase() + 's';
    }

    _isModelValid(model) {
        return this.validator.isValid(model);
    }
}

module.exports = BaseData;
