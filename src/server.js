'use strict';

require('dotenv').config();
const express = require('express');
const fourOhFour = require('./handlers/404');
const fiveOh = require('./handlers/500');
const user = require('./routes/userRoute')


const app = express();
app.use(express.json());
app.use(user);

app.get('/', (req,res,next) => {
  res.status(200).send('/ success');
});

const PORT = process.env.PORT;

function start(){
  app.listen(PORT,()=>console.log(`congrats youve got thumbs aka an active server on port ${PORT}`));
}

app.get('/bad', fiveOh);
app.get('*',fourOhFour);

module.exports = {start, app};

// sequelize.sync()
//   .then(() => {
//     router.listen(PORT, () => console.log(`server up on ${PORT}`));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });
