const homeController = (req, res) => {
    res.json({title: 'Hey there, Welcome.'})
}

const testController = (req, res) => {
    res.json(['Test worked fine.', 12, false, ['hello test']])
}

const userController = (request, response) => {
    response.status(200).json("Hey its me Vrapi, How can I help")
}


module.exports = {homeController, testController, userController}