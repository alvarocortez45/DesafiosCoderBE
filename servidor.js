const express = require('express')
const fs = require('fs')


const app = express()

const server = app.listen( 8080 , ()=>{
    console.log(`Servidor en puerto ${server.address().port}`)
})

class Contenedor{
    constructor(fileName){
        this.fileName = fileName
    }

    async save(product) {
       
        try {
                try {
                    await fs.promises.readFile('./' + this.fileName)

                    console.log('Archivo existente')

                    let data  = await fs.promises.readFile('./' + this.fileName )
                    data = await JSON.parse(data)
                  
                    const lastProd = data[data.length - 1].id

                    product.id = lastProd+ 1
                    data.push(product)
                    
                    await fs.promises.writeFile( this.fileName, JSON.stringify(data, null, 2))

                } catch(error) {
                  
                    console.log('No existe el archivo')
                    
                    product.id = 1
                    const products = []
                    products.push(product)
                    await fs.promises.writeFile('./' + this.fileName,   JSON.stringify(products, null, 2))
                }
                
            return  product.id

        } catch (error) {
            
            console.log(error);
        
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile('./' + this.fileName)
            data = JSON.parse(data)
            const prod = data.find(product => product.id === id)
            if (prod){
                return prod
            } else{
                return null
            }
        } catch (error) {
            
            console.log(error);
        }
    }

    async getAll() {

        try {
            let data = await fs.promises.readFile('./' + this.fileName)
            data = await JSON.parse(data)
         
            return data
        } catch (error) {
            
            console.log(error);
        }

    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile('./' + this.fileName)
            data = await JSON.parse(data)
           
            data.splice(id-1, 1)
            fs.writeFileSync(this.fileName, JSON.stringify(data, null, 2))

        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile('./'+ this.fileName, '')

            console.log('Contenido del archivo borrado exitosamente')

        } catch (error) {
            
            console.log(error);
        
        }
    }

    async getRandom () { 
        try {
            let data = await fs.promises.readFile('./' + this.fileName)
            const dataObj = JSON.parse(data)
            const randomP = dataObj[Math.round(Math.random() *( dataObj.length - 1 ))]
            
            return randomP}
        catch (error) {
            console.log(error)
        }
}

}

const contProductos = new Contenedor('productos.txt')

/*const test = async () => {
    const contProductos = new Contenedor('productos.txt')
    const id = await contProductos.save({
      title: 'Raqueta Wilson Clash 100',
      price: '$49000',
      thumbnail: 'https://img.tenniswarehouse-europe.com/watermark/rs.php?path=BPSTTO-1.jpg&nw=296'
    })
    console.log(id)
    const mostrarTodos=await contProductos.getAll()
    console.log(mostrarTodos)
    contProductos.deleteAll()
    contProductos.deleteById(1)
    /*const mostrarId= await contProductos.getById(1)
    console.log(mostrarId)
  }


test()*/

app.get('/productos',async ( req, res) =>{
    let productos = await contenedorProducts.getAll()
    res.send(productos)
})

app.get('/productoRandom',async ( req, res) =>{
    let random = await JSON.stringify(contenedor.getRandom())
    !random ? res.status(404).send('Producto Encontrado') : res.send(random)
})