import { createRoles } from './libs/initialSetup';
import authRoutes from './routes/auth.routes'
import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'
import productRoutes from './routes/products.routes'

const app = express();
createRoles();

app.set('packageJson', pkg);
app.use(express.json())
app.use(morgan('dev'));

app.get('/', (request, response) => {
    response.json({
        name: app.get('packageJson').name,
        author: app.get('packageJson').author,
        description: app.get('packageJson').description,
        version: app.get('packageJson').version
    })
})

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

export default app;
