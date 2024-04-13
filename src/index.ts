import { ConnectToDbUsecase } from 'src/domain/usecase/ConnectToDbUsecase';
import { container } from 'inversify.config';
import { TYPES } from 'types';
import loginRouter from './routes/login';
import signupRouter from './routes/signup';
import productRouter from './routes/product';
import shopRouter from './routes/shop'
import cartRouter from './routes/cart'
import express from 'express';
const app = express();
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv-safe';

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'images')));

container.get<ConnectToDbUsecase>(TYPES.ConnectToDbUsecase).invoke(process.env.DATABASE!);

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/product', productRouter);
app.use('/shop', shopRouter)
app.use('/cart', cartRouter)

app.listen(8080);
