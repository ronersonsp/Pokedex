export default function initPokedex() {

    const nome = document.querySelector('.pokemon-nome');
    const btn = document.querySelector('.dpad');
  
    const id = document.querySelector('.id-span');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
  
    const img = document.querySelector('.topo-img img');
    const shinyBtn = document.querySelector('.shiny-btn')
    const info = document.querySelector('.informacoes-texto');

    let search;


  function nomeApi() {
    search = nome.value;
    buscaApi(search);
  }
  
  

  async function buscaApi(busca) {
    try{
      // ${busca}
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/charizard`);
      id.innerText = response.data.id;
      
      let imgURL = response.data.sprites.versions["generation-v"]["black-white"].animated.front_default;
      img.src = imgURL;

      stats(response);
    }
    catch{
      console.log('Ta errado aí, nego!');
    }
  }

  async function stats(url) {
    try {
      info.innerHTML = 
      `<strong>Name:</strong> ${url.data.name} <br>
      <br>
      <strong>Stats:</strong> <br>
      <br>
      <strong>HP:</strong> ${url.data.stats[0].base_stat} <br>
      <strong>Attack:</strong> ${url.data.stats[1].base_stat} <br>
      <strong>Defense:</strong> ${url.data.stats[2].base_stat} <br>
      <strong>Special-Attack:</strong> ${url.data.stats[3].base_stat} <br>
      <strong>Special-Defense:</strong> ${url.data.stats[4].base_stat} <br>
      <strong>Attack:</strong> ${url.data.stats[1].base_stat} <br>
      <br>
      <br>
      <strong>Tipos:</strong> <br>
      <br>
      <strong>1:</strong> ${url.data.types[0].type.name} <br> `;
      if(Object.keys(url.data.types).length == 2){
        info.innerHTML += `<strong>2:</strong> ${url.data.types[1].type.name} <br>`
      }
      
      if(Object.keys(url.data.types).length == 3){
        info.innerHTML += `<strong>3:</strong> ${url.data.types[2].type.name} <br>`
      }
      
      console.log(url.data.types);
    } catch (error) {
      console.log('Tem algo errado aí meu bom (stat)')
      console.log(error);
    }
  }

  async function trocaSprite(event) {
    img.classList.toggle('shiny');
    console.log(event);
    if (img.classList.contains('shiny')) {
      // response.data.sprites.versions["generation-v"]["black-white"].animated.front_shiny;
    } else {
      img.src = response.data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    }
    
  }




  
  function addEvents() {
    btn.addEventListener('click', nomeApi);
    shinyBtn.addEventListener('click', trocaSprite);
  }

   function init() {
    addEvents();
  }

  init();
}



