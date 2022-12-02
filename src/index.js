import {NuevoElementoCarrito} from './js/class';

const fichas = document.querySelector('.fichas');
const templateCard = document.getElementById('template-card').content;
//console.log(templateCard);

const carritoBody = document.querySelector('.carrito-body');
const templateCarrito = document.getElementById('template-carrito').content;

const carritoFooter = document.querySelector('.carrito-footer')
const templateFooter = document.getElementById('template-footer').content;

const fragment = document.createDocumentFragment();

//const producto = {};
let cont=0;
let carrito={};

let arrayCarrito =[];

document.addEventListener('DOMContentLoaded', ()=>{
    fetchData();
    
})

fichas.addEventListener('click', (e)=>{
    //console.log(e.target);
    addToCar(e);

    
})


//const apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto';
//const apiUrl = 'https://api.chucknorris.io/jokes/random';
const apiUrl = 'https://jsonplaceholder.typicode.com/users';


const fetchData = async () =>{
    try{
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        //console.log(data);
        pintarElement(data);      
       
    }catch (error){
        console.log(error);
    }
}

const pintarElement = (data)=>{
    //console.log(data);
    
    data.forEach(data =>{
        templateCard.querySelector('.name').textContent = data.name;
        templateCard.querySelector('.address').textContent = data.address.street;
        templateCard.querySelector('.company').textContent = data.company.name;
        templateCard.querySelector('.email').textContent = data.email;
        templateCard.querySelector('.phone').textContent = data.phone;
        templateCard.querySelector('.username').textContent = data.username;
        templateCard.querySelector('.website').textContent = data.website;
        templateCard.querySelector('.salary').textContent = data.id*10;
        templateCard.querySelector('.btn').setAttribute('data-id', data.id);
        const clone = templateCard.cloneNode(true);
        fragment.append(clone);
    })

    fichas.append(fragment);

}

const addToCar = (e) =>{
//console.log(e.target);
if (e.target.classList.contains('btn')){
    cont++;
    
    const objeto = e.target.parentElement;
    //console.log(objeto);
//usar clase para crear nuevos objetos en el carrito
    const id = objeto.querySelector('.btn').getAttribute('data-id');
    const name = objeto.querySelector('.name').textContent;
    const salary = objeto.querySelector('.salary').textContent;
    const cant = 1;
    
    //console.log(id);

    //SE VERIFICA SI EL OBJETO YA EXISTE EN EL CARRITO
    //SI YA EXISTE SOLO SE INCREMENTA LA CANTIDAD
    //SI NO EXISTE, SE CREA EL OBJETO Y SE HACE EL PUSH AL ARRAYCARRITO
    
    const elemCarrito = new NuevoElementoCarrito(id, name, cant, salary);
    //console.log(elemCarrito.id);
    if (arrayCarrito.length === 0){
        arrayCarrito.push(elemCarrito);

    }else if ( arrayCarrito.some(elem => elem.id === elemCarrito.id) ){
        const index = arrayCarrito.findIndex(elem =>elem.id === elemCarrito.id);
        arrayCarrito[index].cant++

    } else {
        arrayCarrito.push(elemCarrito);

    }
    
}
//console.log(arrayCarrito);

e.stopPropagation();
pintarArrayCarritoBody(arrayCarrito);
pintarArrayFooter();

}




const pintarArrayCarritoBody = (arrayCarrito)=>{
    //console.log(arrayCarrito);
    
    carritoBody.innerHTML = '';

    arrayCarrito.forEach(elem =>{
        templateCarrito.querySelector('.id').textContent = elem.id;
        templateCarrito.querySelector('.name').textContent = elem.name;
        templateCarrito.querySelector('.cant').textContent = elem.cant;
        templateCarrito.querySelector('.btn-danger').setAttribute('data-id', elem.id);
        templateCarrito.querySelector('.btn-info').setAttribute('data-id', elem.id);
        templateCarrito.querySelector('.salary').textContent = elem.salary;
        templateCarrito.querySelector('span').textContent = elem.cant*elem.salary;

        const clone = templateCarrito.cloneNode(true);
        fragment.append(clone);

    })
    carritoBody.append(fragment);


}


const pintarArrayFooter = ()=>{
    carritoFooter.innerHTML = '';

    if (arrayCarrito.length === 0){
        carritoFooter.innerHTML = `
        <th scope="row" colspan="5">Carrito vacio - Comience a comprar!!</th>
        `
        //console.log(arrayCarrito.length)
        return;
    } else {
        const conta2 = arrayCarrito.reduce((acc, {cant})=>acc + cant, 0)
        //console.log(conta2);

        const total2 = arrayCarrito.reduce((acc, {cant, salary})=>acc + cant*salary, 0);
        //console.log(total2);

        templateFooter.querySelector('.num').textContent = conta2;
        templateFooter.querySelector('span').textContent = total2;
        const clone = templateFooter.cloneNode(true);
        fragment.append(clone);
        carritoFooter.append(fragment);   
        
        const btnVaciar = document.getElementById('vaciar-carrito');
        btnVaciar.addEventListener('click', ()=>{
            arrayCarrito = [];
            pintarArrayFooter();
            pintarArrayCarritoBody(arrayCarrito);
        })
    }     

}


pintarArrayFooter();

carritoBody.addEventListener('click', (e)=>{
    //console.log(e.target.getAttribute('data-id'));

    
    if (e.target.classList.contains('btn-danger')){
        
       if (arrayCarrito.some(elem => elem.id === e.target.getAttribute('data-id'))){
        const index = arrayCarrito.findIndex(elem =>elem.id === e.target.getAttribute('data-id'));
        arrayCarrito[index].cant--;

        if (arrayCarrito[index].cant === 0){
            arrayCarrito.splice([index], 1);
        }
        //console.log(arrayCarrito[index].cant)
       
        }
               
    }


    
    if (e.target.classList.contains('btn-info')){

        if (arrayCarrito.some(elem => elem.id === e.target.getAttribute('data-id'))){
            const index = arrayCarrito.findIndex(elem =>elem.id === e.target.getAttribute('data-id'));
            arrayCarrito[index].cant++;
            //console.log(arrayCarrito[index].cant)
            }

    }
    
   

    pintarArrayFooter();
    pintarArrayCarritoBody(arrayCarrito);

    e.stopPropagation();

})