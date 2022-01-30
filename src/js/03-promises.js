import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout( () => {
    if (shouldResolve) {
      resolve( Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    } else {
      reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
    }}, delay)
  }).catch(reject => { return reject })
}

const refs = {
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  form: document.querySelector('.form')
}



refs.form.addEventListener('submit', onFormSubmit)

function  onFormSubmit(evt) {
  evt.preventDefault(); 
  let positionsArray = [];
  
  for (let i = 0; i < refs.amount.value; i += 1) {
    positionsArray.push(i + 1)
  }
  let delay = Number(refs.delay.value)
  let step = 0;
  const promises = positionsArray.map(number => {
    delay+=step
   step = Number(refs.step.value)
    createPromise(number,delay)
  })
  
}




