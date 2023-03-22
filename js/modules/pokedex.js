export default class initPokedex {
  constructor() {
    this.nome = document.querySelector('.pokemon-nome');
    this.btn = document.querySelector('.dpad');
  
    this.id = document.querySelector('.id-span');
    this.prev = document.querySelector('.prev');
    this.next = document.querySelector('.next');
  
    this.img = document.querySelector('.topo-img img');
    this.shinyBtn = document.querySelector('.shiny-btn');
    this.info = document.querySelector('.informacoes-texto');
  }
  


  nomeApi() {
  this.search = this.nome.value;
  this.buscaApi(this.search);
  }


  async buscaApi(busca) {
    try{
      document.querySelector('.informacoes').classList.add('ativo');
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${busca}`);
      this.pokemonId = response.data.id
      this.id.innerText = this.pokemonId;
      this.nome.value = response.data.forms[0].name;

      this.imgShiny = response.data.sprites.versions["generation-v"]["black-white"].animated.front_shiny;
      this.imgDefault = response.data.sprites.versions["generation-v"]["black-white"].animated.front_default;
      this.img.src = this.imgDefault;

      this.stats(response);
    }
    catch (error) {
      console.log('Ta errado aí, nego!');
      console.log(error);
    }
  }

  stats(url) {
    try {
      this.info.innerHTML = 
      `<strong>Name:</strong> ${url.data.name} <br>
      <br>
      <strong>Stats:</strong> <br>
      <br>
      <strong>HP:</strong> ${url.data.stats[0].base_stat} <br>
      <strong>Attack:</strong> ${url.data.stats[1].base_stat} <br>
      <strong>Defense:</strong> ${url.data.stats[2].base_stat} <br>
      <strong>Special-Attack:</strong> ${url.data.stats[3].base_stat} <br>
      <strong>Special-Defense:</strong> ${url.data.stats[4].base_stat} <br>
      <strong>Speed:</strong> ${url.data.stats[5].base_stat} <br>
      <br>
      <br>
      <strong>Tipos:</strong> <br>
      <br>
      <strong>1:</strong> ${url.data.types[0].type.name} <br> `;
      if(Object.keys(url.data.types).length == 2){
        this.info.innerHTML += `<strong>2:</strong> ${url.data.types[1].type.name} <br>`
      }
      
      if(Object.keys(url.data.types).length == 3){
        this.info.innerHTML += `<strong>3:</strong> ${url.data.types[2].type.name} <br>`
      }

    } catch (error) {
      console.log('Tem algo errado aí meu bom (stat)')
      console.log(error);
    }
  }

  trocaSprite() {
    this.img.classList.toggle('shiny');
    if (this.img.classList.contains('shiny')) {
      this.img.src = this.imgShiny
    } else {
      this.img.src = this.imgDefault;
    }
  }

  prevId() {
    this.buscaApi(+this.pokemonId - 1);
  }

  nextId() {
    this.buscaApi(+this.pokemonId + 1);
  }


  addBind() {
    this.nomeApi = this.nomeApi.bind(this);
    this.trocaSprite = this.trocaSprite.bind(this);
    this.prevId = this.prevId.bind(this);
    this.nextId = this.nextId.bind(this);
  }

  addEvents() {
    this.btn.addEventListener('click', this.nomeApi);
    this.shinyBtn.addEventListener('click', this.trocaSprite);
    this.prev.addEventListener('click', this.prevId);
    this.next.addEventListener('click', this.nextId);
  }

   init() {
    this.addBind()
    this.addEvents();
  }

  }
