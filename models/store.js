const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const StoreSchema = new mongoose.Schema(
  {
    name: String,
    cuit: String,
    concepts: Array,
    currentBalance: Number,
    active: Boolean,
    lastSale: Date,
  },
  { timestamps: true },
);

StoreSchema.plugin(aggregatePaginate);
StoreSchema.pre('save', async function (callback) {
  //completar de ser necesario
});

module.exports = mongoose.model('Store', StoreSchema);
