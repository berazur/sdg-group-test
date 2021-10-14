import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { BarChart } from '@mui/icons-material';
import { Female } from '@mui/icons-material';
import { Male } from '@mui/icons-material';
import { Transgender } from '@mui/icons-material';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Grafico from './components/Grafico';



 const App = () => {

  const [comarca, setComarca] = useState([])
  const [value, setValue] = useState(0);

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = async () => {
        const url = `https://api.idescat.cat/pob/v1/geo.json?p=tipus/com`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        const dataComarcas = data.feed.entry;
        setComarca(dataComarcas)
    }
    
    const comarcasCat = comarca.map(item => item.title)
    const habitantesM = comarca.map(item => parseInt(item["cross:DataSet"]["cross:Section"]["cross:Obs"][0].OBS_VALUE));
    const habitantesF = comarca.map(item => parseInt(item["cross:DataSet"]["cross:Section"]["cross:Obs"][1].OBS_VALUE));
    const habitantesT = comarca.map(item => parseInt(item["cross:DataSet"]["cross:Section"]["cross:Obs"][2].OBS_VALUE));
    

   return ( 
     <Router> 
     <div>
      <AppBar position="static">
      <Toolbar>
        <BarChart />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Datos geográficos - Comarcas de Cataluña
          </Typography>
      </Toolbar>
      </AppBar>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Toda la población"component={Link} to="/" icon={<Transgender />}/>
        <BottomNavigationAction label="Población masculina" component={Link} to="/masculino" icon={<Male />}/>
        <BottomNavigationAction label="Población femenina" component={Link} to="/femenino" icon={<Female />}/>
      </BottomNavigation>

       <Switch>
         <Route path="/" exact>
           <Grafico  
           comarcasCat={comarcasCat}
           habitantes={habitantesT}
           titulo={'Todos los habitantes'}
           />
         </Route>
         <Route path="/masculino">
            <Grafico 
            comarcasCat={comarcasCat}
            habitantes={habitantesM}
            titulo={'Población masculina'}
            />
         </Route>
         <Route path="/femenino">
         <Grafico 
            comarcasCat={comarcasCat}
            habitantes={habitantesF}
            titulo={'Población femenina'}
            />
         </Route>
       </Switch>
     </div>
     </Router>
    );
 }
  
 export default App;