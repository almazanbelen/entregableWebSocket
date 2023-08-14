const socket = io();


const productForm = document.getElementById("productForm")
const inputsForm = document.querySelectorAll(".inputsForm")

const products = []



productForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const lastId = products.length > 0 ? products[
        products.length -1].id : 0
    const newId = lastId + 1
    const id = newId
    const title = inputsForm[0].value
    const description = inputsForm[1].value
    const code = inputsForm[2].value
    const price = inputsForm[3].value
    const stock = inputsForm[4].value
    const category = inputsForm[5].value    

    const productDetail = {
       id,
       title,
       description,
       code,
       price,
       stock,
       category
    }    
    products.push(productDetail) 
    socket.emit("newProduct", productDetail)
    productForm.reset()
})


socket.on("productsList", (product) =>{
   const productsList = document.getElementById("productsList");
   const newProduct = document.createElement("div");
   newProduct.innerHTML = 
   `<br>
        <strong>PRODUCTO</strong>
    </br>
   <br>
        <strong>Id:</strong>
        ${product.id}
    </br> 
   <br>
        <strong>Producto:</strong>
        ${product.title}
    </br> 
    <br>
        <strong>Descripcion:</strong>
        ${product.description} 
    </br>
    <br>
        <strong>Code:</strong>
        ${product.code}
    </br> 
    <br>
        <strong>Price:</strong>
        ${product.price}
    </br>
    <br>
        <strong>Stock:</strong>
        ${product.stock}
    </br>
    <br>
        <strong>Category:</strong>
        ${product.category}
    </br>    
    <br>
    <button type="submit">Eliminar producto</button>
    </br>`
   productsList.appendChild(newProduct)
   
})


