import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { onError, userRouter, branchRouter, serviceRouter, productRouter, clientRouter, ticketRouter, receiptVoucherRouter, calendarDentistRouter, devRouter, mainRouter } from './refs';

export const app = express();

app.use(cors());
app.use(json());
app.use(onError);

if (!process.env.NODE_ENV) app.use((req, res, next) => setTimeout(next, 200));

app.get('/', (req, res) => res.send({ success: true, server: 'DENTAL_APPLICATION' }));
app.use('/main', mainRouter);
app.use('/user', userRouter);
app.use('/branch', branchRouter);
app.use('/service', serviceRouter);
app.use('/product', productRouter);
app.use('/client', clientRouter);
app.use('/ticket', ticketRouter);
app.use('/receipt-voucher', receiptVoucherRouter);
app.use('/calendar-dentist', calendarDentistRouter);
// Dev Router
app.use('/dev', devRouter);

app.use((req, res) => res.status(404).send({ success: false, message: 'INVALID_ROUTE' }));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack)
    res.status(500).send({ success: false, message: 'INTERNAL_SERVER_ERROR' });
});
