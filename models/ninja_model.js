const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//URL de conexão
const dbURI = 'dburl';

//Conecta à base de dados
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

//Cria o modelo de dados de localização
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

//Cria o modelo de dados
const ninjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O Nome é obrigatório']
    },
    rank: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const Ninja = mongoose.model('ninja', ninjaSchema);

module.exports = Ninja;