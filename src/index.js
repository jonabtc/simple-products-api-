import app from './app'
import './database'
const PORT = 8081;

app.listen(PORT, () => {
    console.log('Server listen on port', PORT);
})