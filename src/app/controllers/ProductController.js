/*import * as Yup from 'yup'
import Product from '../models/Products'
class ProductControoller {
    async store(request, response) {

        const schema = Yup.object().shape({

            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),

        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { filename: path } = request.file
        const { name, price, category } = request.body
        const product = await Product.create({
            name,
            price,
            category,
            path,
        });

        return response.json(product)
    }

    async index (request,response){
        const products = await Product.findAll()
      
        return response.json(products)
    }

}
export default new ProductControoller()*/
import * as Yup from 'yup'
import Products from '../models/Products'
import Category from '../models/Category'
import User from '../models/User'

class ProductController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json({ error: "You are not an administrator profile" })
        }


        const { filename: path } = request.file
        const { name, price, category_id, offer } = request.body
        const product = await Products.create({
            name,
            price: price,
            category_id,
            path,
            offer,

        })
        return response.json(product)

    }
    async index(request, response) {








        const product = await Products.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
            ],
        })
        return response.json(product)
    }
    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
        })


        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json({ error: "You are not an administrator profile" })
        }

        const { id } = request.params
        const product = await Products.findByPk(id)
        if (!product) {
            return response.status(401).json({ error: "Make sure your product ID is correct" })
        }

        let path
        if (request.file) {
            path = request.file.filename
        }


        const { name, price, category_id, offer } = request.body
        await Products.update({
            name,
            price,
            category_id,
            path,
            offer,

        },

            { where: { id } }


        )
        return response.status(200).json()
    }
}
export default new ProductController()