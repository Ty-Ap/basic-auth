'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      const record = await this.model.create(json);
      return record;
    } catch (e) {
      console.error('error in the collection model');
      return e;
    }
  }

  async read(id = null) {
    try {
      if (!id) {

        const records = await this.model.findAll();
        return records;
      } else {

        const singleRecord = await this.model.findByPk(id);
        return singleRecord;
      }
    } catch (e) {
      console.error('error in the collection interface');
      return e;
    }
  }


  async update(json, id) {
    try {
      const record = await this.model.update(json, { where: { id } });
      return record;
    } catch (error) {
      console.error('error in the collection interface');
      return error;
    }
  }

  async delete(id) {
    try {
      await this.model.destroy({ where: { id } });

    } catch (error) {
      console.error('error in the collection interface');
      return error;
    }
  }
}


module.exports = Collection;
