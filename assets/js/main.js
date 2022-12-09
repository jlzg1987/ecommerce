const shopContent =document.getElementById("ShopContent")
const verCarrito=document.getElementById("verCarrito")
const modalcontainer=document.getElementById("modal-container")
const cantidadCarrito=document.getElementById("cart-counte")

//cambio de color body
const btnTheme = document.getElementById("theme-btn")
const body=document.body
const darkThemChange=()=>{
    {
       
     if(btnTheme.classList.contains("bx-sun")){
         btnTheme.classList.replace("bx-sun","bx-moon")
     }else{
         btnTheme.classList.replace("bx-moon","bx-sun")
     }
     body.classList.toggle("dark")
     }
}
btnTheme.addEventListener("click", e=>darkThemChange())

let carrito= JSON.parse(localStorage.getItem("carrito"))||[]

items.forEach((product)=>{
  let contentItem= document.createElement("div")
  contentItem.className="Card-item"
  contentItem.innerHTML = `
  <img src="${product.image}"> 
  <h2 class="Prince">$${product.price} </h2> 
  <h4 class="Stock-h4">Stock: ${product.quantity}</h4> 
  <h3 class="Name-h3">${product.name}</h3> 
  `
  shopContent.append(contentItem)
 
  let comprar= document.createElement("button")
  comprar.className="card-button"
  comprar.innerText = "+"
  contentItem.append(comprar)
  
  //agregar al carrito
  
  comprar.addEventListener("click",()=>{
    const repeat = carrito.some((repeatProduct)=>repeatProduct.id===product.id)

    if (repeat){
      carrito.map((prod)=>{
        if (prod.id===product.id){
          prod.cantidad++
          prod.quantity--
        }
      })
    }else {
    carrito.push({
      id: product.id,
      image: product.image,
      price:product.price,
      quantity:product.quantity,
      name:product.name,
      cantidad:product.cantidad
    }) 
    }
    carritoCounter()
    saveLocal()
  })
  
 
  })
  const pintarCarrito =()=>{
    //verCarrito.addEventListener("click",()=>{
    modalcontainer.innerHTML=""
    modalcontainer.style.display="flex"
    const modalHeader = document.createElement("div")
    modalHeader.className="modal-header"
    modalHeader.innerHTML= `                                                                         
    <h1 class="modal-header-title">Carrito</h1>
    `
    modalcontainer.append( modalHeader)

    const modalbutton =document.createElement("h1")
    modalbutton.innerText="x"
    modalbutton.className="modal-header-button"
    modalbutton.addEventListener("click",()=>{
      modalcontainer.style.display="none"
    })
    modalHeader.append(modalbutton)
    //Ingreso de carrito
    carrito.forEach((product)=>{
    let CarritoContent=document.createElement("div")
    CarritoContent.className="modal-content"
    CarritoContent.innerHTML=
      `
    <img src="${product.image}"> 
    <h2 class="Prince">Precio: $${product.price} </h2> 
    <h4 class="Stock-h4">Stock: ${product.quantity}</h4> 
    <h3 class="Name-h3">${product.name}</h3> 
    <p>Cantidad: ${product.cantidad}</p>
    <p class="restar"> - </p>
    <p class="sumar"> + </p>
    <p class="total-p">Total: ${product.cantidad * product.price}</p>
    <h3 class="delete-product">x</h3>
    `
      modalcontainer.append(CarritoContent)
      //aumnetar
      let sumar =CarritoContent.querySelector(".sumar")
     sumar.addEventListener("click",()=>{
        if(product.cantidad >= 0){
        product.cantidad++
      }
        saveLocal()
        pintarCarrito()
      })
      //restar
      let restar =CarritoContent.querySelector(".restar")
      restar.addEventListener("click",()=>{
        if(product.cantidad !== 0){
        product.cantidad--
      }
        pintarCarrito()
      })

      //eliminar cart
      let eliminar =CarritoContent.querySelector(".delete-product")
      eliminar.addEventListener("click",()=>{
        eliminarProducto(product.id)
        pintarCarrito()
      })

    })
    const total= carrito.reduce((acc,el)=> acc + el.price * el.cantidad,0)

    const totalBuying =document.createElement("div")
    totalBuying.className="total-content"
    totalBuying.innerHTML=  `Total a pagar: $${total}`
    modalcontainer.append(totalBuying)
  }
  verCarrito.addEventListener("click",pintarCarrito  )
//eliminar producto
  const eliminarProducto=(id)=>{
    const foundId = carrito.find((Element)=>Element.id===id)
    carrito=carrito.filter((carritoId)=>{
      return carritoId !== foundId
    })
    carritoCounter()
    saveLocal()
    pintarCarrito()
  }
  //contador del carrito
  const carritoCounter =()=>{
    cantidadCarrito.style.display="flex"
    
    cantidadCarrito.innerText=carrito.length
  }
  carritoCounter()


  //set Item
  const saveLocal =()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito) )
  }
 
  //get Item
  JSON.parse(localStorage.getItem("carrito"))