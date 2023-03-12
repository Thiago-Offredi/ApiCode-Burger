import exprees from "express"
import routes from "./routes"
import {resolve} from "path"

import './database'
class App {
    constructor() {
        this.app = exprees()
        this.middlewares()
        this.routes()
    }
    middlewares() {
        this.app.use(exprees.json())
        this.app.use('/product-file',exprees.static(resolve(__dirname,'..','uploads')))
        this.app.use('/category-file',exprees.static(resolve(__dirname,'..','uploads')))
    }
    routes() {
        this.app.use(routes)
    }
}
export default new App().app