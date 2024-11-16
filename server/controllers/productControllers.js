export const getProducts = (req, res, next) =>{
    try {
        res.send("welcome")
    } catch (error) {
        res.send("no")
    }
}