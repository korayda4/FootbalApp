import { useState, useEffect } from 'react';
import { Button, Flex } from 'antd';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [country, setCountry] = useState( "Turkey");
  const [detailList, setDetailList] = useState();
  const [mainUrl , setMainUrl] = useState(`https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`)
  const [extension , setExtension] = useState("leagues")

  const urlLeague = `https://api-football-v1.p.rapidapi.com/v3/leagues?country=${country}`;
  const urlTeam = `https://api-football-v1.p.rapidapi.com/v3/teams?country=${country}`;
  const urlPlayer = `https://api-football-v1.p.rapidapi.com/v3/teams?country=${country}`;
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'aab97a10efmsh009a93e544d35cap14d640jsn2f33093793fd',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  useEffect(() => {
    const getLeague = async () => {
      try {
        const response = await fetch(mainUrl, options);
        const result = await response.json();
        setData(result)
        setDetailList("")
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    getLeague();
  }, [mainUrl]); 


  return (
    <div className="container">
      
      {data ? (
        <div className="FootballContainer">
            <div className="FootbalHeader">
              <div className="headerDetails">
                <img src="../src/assets/img/Black & White Minimalist Business Logo (2)-Photoroom.png-Photoroom.png" alt="Logo" />
                <div className="detailText">
                  <h3>TURKEY</h3>
                  <h4>SEÇİLİ LİG / TAKIM / İNFO</h4>
                </div>
              </div>
                <div className="headerOptions">
                  <Button type="text">Oyuncu Ara</Button>
                  <Button type="text">Lig Ara</Button>
                  <Button type="text">Ülke Ligleri</Button>
                  <Button type="text">Maç Sonuçları</Button>
                  <Button type="text">Sıralama</Button>
                  
                </div>
            </div>
            <div className="DetailsList">
                {data ? data.response.map((x,i) => {


                  return(
                    <div id={x.extension?.id} key={i} className="leagueDetail">
                      <div className="detailText">
                        <img src={x.extension?.logo} alt="" />
                        <div className="info">
                          <h2>{x.extension?.name}</h2>
                          <h5>{x?.extension?.founded}</h5>
                        </div>
                      </div>
                      <img src={x.country?.flag} alt="" />
                      <button>{">"}</button>
                    </div>
                  )
                  
                }):"YÜKLENİYOR..."}
            </div>
        </div> 
          ):(<div>YÜKLENİYOR...</div>)}
      
    </div>
  );
}

export default App;
