import "dotenv/config"
import app from "./app.js"

app.listen(process.env.PORT, (error) => {
    if (!error) console.log(`Connected successfully at port - ${process.env.PORT}`)
})