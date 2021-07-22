const { Router } = require('express');
const axios = require('axios');
const {Op} = require('sequelize') 
const { Country, Activity, countries_activities } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Funcion asincronica que trae los datos de la API
const data = async () => {
    const response = await axios.get('https://restcountries.eu/rest/v2/all');
    return response.data
}

/////////////// GET COUNTRIES/:ID ///////////////
router.get("/countries/:id",async (req,res) => {
    const id = req.params.id;
    try {
        let ctri = await Country.findOne({
         where: {id: id      
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']},
        include: [{model: Activity,
            attributes:['nameAct', 'difficult','duration','season']}]
        });
        
        return res.json(ctri)
    } catch (error) {
        console.log(error)
    }
})

/////////////// GET /ACTIVITY  ///////////////////////
 router.get('/activity', async (req,res) => {
     try {     
         let activity = await Activity.findAll({
            include: {model: Country}
         })
         //console.log("RTA TABLA ACTIVITY: ",activity)
         return res.json(activity) 
    }catch (error) {
        console.log(error)
    }
 })

/////////////////// GET /COUNTRIES   /////////////////
router.get('/countries', async (req, res) => {
    let name = req.query.name;
    let countriesApi = await data();
    try {
        const dbCountries = await Country.findAll({
            include: {model: Activity}
        });
        if (!dbCountries.length) {
             await Country.bulkCreate(countriesApi)
        }
    } catch (error) {
        console.log(error)
    }
    //BUSQUEDA POR QUERY ?NAME=...
     if(name) {
         try {
             let country = await Country.findAll({
                 where: {
                     name: {
                         [Op.iLike]: '%' + name + '%'//COMPARA LOS SUBSTRINGS (CASE-INSENSITIVE)
                     }
                 }
             });
             return res.json(country)
         } catch (error) {
             console.log(error)
             console.log("EL PAIS NO EXISTE")
         }
     } else if(req.query.filter) {//FILTRAR LOS PAISES POR CONTINENTE 
         try {
             let country = await Country.findAll({
               where: {
                   region: req.query.filter
               },
               limit: 10,
               offset:req.query.page,
               order: [[req.query.tipo,req.query.order]],//req.query.order = ASC || DESC
               include: {model: Activity}
             });    
             return res.json(country)
         } catch(error) {
             console.log(error)
         }
     }else {//SI NO EXISTE FILTRO
         try {
             let country = await Country.findAll({
                 limit:10,
                 offset: req.query.page,
                 order: [[req.query.tipo, req.query.order]],//PAISES POR ORDEN ALFABETICO
                 include: {model: Activity}
             });
             return res.json(country)
         }catch (error) {
             console.log(error)
         }
     }
})

/////////////// POST /ACTIVITY  /////////////////////
router.post("/activity", async (req,res) => {
    const activity = req.body;
    try {
        let [act] = await Activity.findOrCreate({
            where: {
                nameAct: activity.nameAct,
                difficult: activity.difficult,
                duration: activity.duration,
                season: activity.season
            }
        });
        await act.setCountries(activity.countryid);     //SETEO RELACIONES ENTRE TABLAS
        return res.json(act)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
