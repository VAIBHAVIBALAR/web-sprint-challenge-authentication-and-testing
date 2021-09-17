const  db = require('../../data/dbConfig')

function find() {
    return db("users").select("id", "username").orderBy("id")
}

function findBy(filter){
    return db("users").where(filter).orderBy("id")
}

async function add(user) {
    const [id] = await db("users").insert( user, "id")
    return id
}

function findById(id) {
    return db("users").where({ id }).first()
}

module.exports = {
    find,
    findBy,
    findById,
    add
}