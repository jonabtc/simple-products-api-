import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://nodeuser:<password>@first-cluster.1i7v5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(error => console.log)