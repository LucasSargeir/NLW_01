# <center> Curso New Level Week - Rocket Seat</center>

<br>

<hr>

<br>

# Configuração do ambiente para projetos em node.js e React

## Criar base do projeto em Node

Para começar o projeto em **node.js**  será necessário instalar algumas dependências  para o desenvolvimento. Antes de começar precisamos criar um arquivo **JSON** que guardará todas as informações do projeto, tais como versões das dependências instaladas, nome do projeto, versão do projeto e muito mais. Dividiremos então em duas etapas:

- Criação do JSON do projeto;
- Instalação das dependências. 

<br>

### 1 - Criação do JSON 

Para criação do JSON podemos utilizar o **npm** para gerar esse arquivo. Para isso, dentro do diretório do seu projeto crie uma pastar `\server`, abra o terminal na pasta criada e execute o comando.

        npm init

_**OBS: O npm é instaldo junto ao node.js**_

Após isso você pode perceber que um arquivo `package.json` foi criado, contendo informações básicas sobre o projeto e que podem ser alteradas por você.

<br>

### 2 - Intalação das Dependências

O `express` é um framework criado para desenvolvimento de aplicações web e APIs. Ele é a estrutura padrão para estruturar servidores em `node.js`. Para utilizar esse framework é necessário instalar o `express`, isso pode ser feito com o npm pelo comando abaixo:

        npm install express

Para manter seus códigos organizados crie um diretório `\src` dentro da pasta server para colocar os códigos que serão criados.

<br>

### Criação do servidor

Para começar a criar as rotas do seu servidor é necessário criar o arquivo do servidor (nesse passo a passo utilizaremos typescript). Para isso, dentro do diretório `\server\src` crie um arquivo com o nome `server.ts`.

Para utilização do typescript é necessário instalar a dependência de tipagem para o express com o comando:

~~~
    npm install @types/express -D
~~~

O `node.js`, por padrão não entende o `typescript`. Para que isso seja possível é necessário instalar algumas dependências. Primeiro é necessário instalar o `typescript` e após a dependência para que o `node.js` entenda ele. Para isso utilize os comandos abaixo:

~~~
    npm install typescript -D

    npm install ts-node -D
~~~

_**OBS: o parâmetro -D é utilizado para indicar que a depêndencia está sendo instalada para deselvolvimento. Isso é feito pois ao subir o sistema para o ambiente de produção ela não será necessária.**_

Após a instalação do `typescript` o `node.js` ainda não entende as tipagens, então é necessário criar o arquivo de configuração do typescript com o comando:

        npx tsc --init

A partir de agora você pode usar o `npm` para iniciar os servidores com o comando:

        npm ts-node src/server.ts

<br>

<hr>

# Dicas

### Servidor reiniciar automaticamente

Toda mudança que você fazos códigos do servidor é necessário que ele seja reinicido para que as alterações sejam feitas. Para evitar esse trabalho podemos instalar uma dependência que ficará obeservando mudanças, sempre que ocorrer ele reiniciará o servidor automaticamente. Para instalar use:

        npm install ts-node-dev -D

<br>

### Reduzir o comando para iniciar o servidor

Iniciar o servidor com o comando `npm ts-node src\server.ts` é um pouco trabalhoso, para melhorar isso crie um script em `\server\package.json` para alterar a chamada desse comando. Assim:

~~~json
   "scripts":{
        "dev": "ts-node-dev src/server.ts"
    }
~~~

Agora podemos iniciar o servidor executando:

        npm run dev

<br>

<hr>

# React

Para criamos a nossa base de projeto `React` nós voltamos para a pasta do projeto (onde fica localizado a pasta `\server`) e criamos um diretório com o nome da nossa aplicação. Para esse exemplo chamarei de `web`. Podemos utilizar o npx para criar a base do projeto com um template da linguagem que estamos utilizando, facilitando nosso trabalho. Para isso utilize o comando:

        npx create-react-app web --template=typescript

_**OBS: web é o nome da nossa aplicação, pode ter o nome que você desejar, além disso você também pode escolher utilizar outra linguagem, nesse caso troque typescript pela linguagem escolhida**

<br>

<hr>

# Noções de Rotas

Uma rota é um caminho que o seu sistema vai usar para trocar informações com o _back-end_ da sua aplicação. Um exemplo de rota é:

`http://localhost:7777/users`

O endereço completo da requisição é denominado rota. Um recurso especifica qual entidade so sistema estamos acessando, um exemplo de recurso na rota mostrada é o `/users` ele indica que estaremos acessando informações de usuários.

Uma rota pode servir para diversas coisas, mas as principais são: receber informações do sistema e prover informações para o sistema. Os principais tipos de rota são `GET` e `POST`. E vamos ver quais as principais diferenças entre elas e quando utiliza-las.

- GET

    Uma rota `GET` é utilizada quando o sistema precisa buscar uma ou mais informações no `back-end`, por exemplo, quando o sistema precisa pegar uma lista de todos os usuários do sistema.

- POST

    Uma rota `POST` é utilizada quando o sistema precisa receber uma ou mais informações do sistema para criar algo no `back-end`, por exemplo, quando o sistema precisa criar  um novo usuário no sistema.

<br>

### Criação de Rotas

Para começar a criar suas rotas é necessário preparar o arquivo `\server\src\server.ts`. Para isso precisamos:

- Importar o express;
- Criar uma variavel para manipular o servidor;
- Indicar em qual porta vamos trabalhar (deve ficar no final do arquivo).

No arquivo `\server\src\server.ts` escreva:

<br>

~~~typescript
    import express from 'express';
    
    const app = express();
    

    //AQUI FICAM AS ROTAS


    app.listen(7777);

    //PARA TRABALHAR NA PORTA 7777
    //PODE SER UMA PORTA DA SUA ESCOLHA
~~~

Agora que o servidor foi preparado você está pronto para criar suas rotas. O primeiro passo é definir qual será o tipo da sua rota `GET` ou `POST`. Após isso a estrutura é a mesma:

~~~typescript
    
    app.get('/users', (request, response) =>{

        //COMANDOS

    });

~~~

_**OBS: se a rota for do tipo POST a única mudança sera que ao invés de `app.get` será `app.post`**_

### Request e Response

O Request e Response utilizados nas rotas são responsáveis por receber e passar informações entre a rota e quem está acessando ela. Vamos falar um pouco sobre cada um deles.

**Request**

O parâmetro request serve para receber informações de quem está acessando a rota. Em geral ele pode ser de três tipos:

- _Request Param_

    O parâmetro vem na própria rota. Por exemplo:

    `http://localhost:7777/users/1`

    O `"/1"` é um _request param_, ele é enviado como parte da rota quando ela é acessada, no exemplo dado ele pode ser utilizado para indicar o ID de um usuário.

    Para declarar que uma rota possui um _request param_ basta usar a seguinte notação na sua rota `app.get('/server/:id')`. O `:` indica que a proxima palavra será um parêmetro. O valor desse parâmetro pode ser recuperado na sua rota atrvés do comando:
    
    ~~~typescript
        const id = request.params.id;

        //SE A VARIÁVEL POSSUIR O MESMO NOME DO REQUEST PARAM,
        //ELA PODE SER RECUPERADA DE FORMA ALTERNATIVA ASSIM:
        //const {id} = request.params;
    ~~~

<br>

- _Query Param_
    
    O parametro vem na query. Por exemplo:

    `http://localhost:7777/users?pag=1&log=true`

    Após a rota podemos notar um `?pag=1&log = true` isso são os parâmetros passados na query. O `?` indica que a partir dali serão passados os parâmetros e seus respectivos valores, no caso do exemplo os parâmetros `pag` com o valor `1` e o `log` com o valor `true`. Esse tipo de parâmetro costuma ser usado quando a passagem de parâmetro é opcional, como por exemplo busca com filtros e paginação.

    Para recuperar esse tipo de parâmetro na sua rota você pode usar o seguinte comando:

    ~~~typescript
        const pag = request.query.pag;
        const log = request.query.log;

        //SE AS VARIÁVEIES POSSUIREM OS MESMOS NOMES DOS QUERY PARAMS,
        //ELAD PODEM SER RECUPERADAS DE FORMA ALTERNATIVA ASSIM:
        //const {pag, log} = request.query;    
    ~~~

<br>

- _Body Param_

    O parâmetro vem no corpo de uma rota e é invisível a olho nú. Normalmente é utlizados em rotas do tipo POST. Diversas estruturas diferentes podem ser passadas nesse tipo de parâmetro, mas a mais comum é a `JSON`, e é essa que vamos trabalhar aqui. 

    Para recuperar esse tipo de parâmetro na sua rota podemos utilizar o seguinte comando:

    ~~~typescript
        const data = request.body;

        const user = {
            name: data.name,
            email: data.email
        };

    ~~~

**Response**

O parâmetro response serve para enviar informações de quem está acessando a rota. As informações podem ser passadas em diversos formatos diferentes, vamos falar de dois deles.

- Texto
    
    Para retornar um texto ao usuário podemos utilizar o seguinte comando:

        response.send('Hello World!');

- JSON

    Para retornar informações ao usuário em formato JSON utilizamos o seguinte comando:

        response.json({message: "Hello World"});

<br>

### Desacoplamento das rotas

Um sistema pode possuir muitas rotas, e com isso o arquivo `\server\server.ts` pode ficar muito cheio dificultando a visualização e até criação de novas rotas. Para resolver esse problema podemos desacoplar as rotas criando classes controladoras pra elas. 

Fazemos isso da seguinte forma. Criamos um arquivo `\server\src\routes.ts` que servirá para guardar nossas rotas. Ele terá instâncias das classes controladoras que por fim terão as rotas, ficará mais fácil de entender exemplificando, então vamos criar uma classe de controle para itens

~~~typescript
import express from 'express';
import ItemsController from "./controllers/ItemsController";


const routes = express.Router();


const itemsController = new ItemsController;
routes.get('/items', itemsController.index);


export default routes;
~~~

_**OBS: Por padrão a função `index` é utilizada para listar todos os itens de uma tabela. Seguindo as regras `show` server para mostrar apenas um elemento, `create` serve para inserir elementos, `update` serve para atualizar elementos e `delete` para deletar elementos**_

<br>

Após a criação do arquivo de rotas vamos criar nossos controladores, crie o diretório `\server\src\controllers` para armazenar nossas classes. Então crie um arquivo `ItemsController.ts` para ser nossa classe (classes por padrão tem seus nomes iniciados por letra maiúscula). A classe segue a seguinte estrutura:

~~~typescript
    import { Request, Response } from 'express';
    
    class ItemsController{
    
        index(request: Request, response: Response){
    
            //COMANDOS DA NOSSA ROTA
    
        }
    
    }
    
    export default ItemsController;
~~~

<br>

Terminado a criação destes, vamos arrumar nosso arquivo `server.ts` para que tudo funcione perfeitamente.

~~~typescript
    import express from 'express';
    import routes from './routes';
    
    const app = express();
    
    app.use(express.json());
    app.use(routes);
    
    app.listen(7777);
~~~

### Rotas Estáticas

As precisamos criar rotas para servir informações estáticas ao sistema, como imagens, PDFs, etc. Para fazer isso podemos utilizar o express. Para exemplificar vamos criar uma pasta `\server\uploads` para prover as imagens da aplicação. Para criar a rota e acessas essas imagens basta modificar o `server.ts` como abaixo:

~~~typescript
    import express from 'express';
    import routes from './routes';
    import path from 'path';
    
    const app = express();
    
    app.use(express.json());
    app.use(routes);
    
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    
    app.listen(7777);
~~~

_**OBS: A biblioteca path nos auxilia para indicar os diretórios que vamos acessar, ele é importante pois usa o sistema operacional para indicar corretamente o caminho.**_

<br>

### Cors

Mais pra frente será importante ter o controle de quem pode acessar nossas rotas. Para isso utilizaremos o `cors`, por hora vamos deixa-lo instanciado no nosso arquivo `server.ts`. Vamos entrar em mais detalhes mais a frente.

~~~typescript
    import express from 'express';
    import routes from './routes';
    import path from 'path';
    import cors from 'cors';
    
    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    
    app.listen(7777);
 ~~~

Se você não possuir o `cors` instalado, instale com os comandos abaixo:

~~~
    npm install cors
    
    npm install @types/cors -D
~~~

<br>

<hr>

# Database

Para facilitar a manipulação do banco de dados pelo `node.js` vamos utilizar uma biblioteca chamada `knex` que serve para gerar consultas SQL. A grande vantagem de se utilizar o `knex` é que ele trabalha com diversos tipos de bancos, logo, se sua aplicação precisar trocar de banco é muito mais fácil. Com isso podemos utilizar bancos diferentes em ambiente de produção e ambiente de testes. Então já pode ir instalando ele pelo comando abaixo:

        npm install knex

Para configurar o `knex` vamos precisar entender alguns conceitos que ele utiliza primeiro, são eles:

- Migrations 

    Migrations são basicamente o histórico do seu banco de dados, como são as criações e alterações feitas no seu esquema de BD. Neles são guardados as funções `up` e `down` para a manipulação do seu banco. Enquanro a função `up` cria alguma coisa, a função `down` deve desfazer tudo que a função `up` fez. Por exemplo, se criarmos uma migration para criar a tabela item a função `up` irá criar a tabela, enquanto a função `down` irá excluir ela.

- Seeds
    
    Seeds são utilizados para inserir informações no banco de dados no momento de início da aplicação, muito utilizado para inserir nomes de imagens por exemplo.

Para exemplificar o uso dessa biblioteca vamos utilizar o SQLite, pois ele possui uma forma simplificada de visualização pelo Visual Studio Code, o que vai facilitar no desenvolvimento. Então se você não possui o SQLite instalado no seu ambiente de desenvolvimento instale pelos comandos abaixo:

~~~
    npm install sqlite3
    
    sudo npm install sqlite3 
~~~

Para configurar precisamos criar o diretório `\server\src\database` nesse diretório vamos criar um arquivo para conexão com o banco, chamado `connection.ts` e nele vamos escrever o seguinte código:

~~~typescript
    import knex from 'knex';
    import path from 'path';
    
    const connection = knex({
    
        client: 'sqlite3',
        connection:{
            filename: path.resolve(__dirname,'database.sqlite'),
        },
        useNullAsDefault: true,
    });
    
    export default connection;
~~~

Além disso precisamos criar o seguinte arquivo `\server\knexfile.ts` e nele colocar o seguinte código:

~~~typescript
    import path from 'path';
    
    module.exports = {
        client: 'sqlite3',
        connection:{
            filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        },
        useNullAsDefault: true,
    }; 
~~~

Agora precisamos criar nossas `migrations` e `seeds` para que nossas tabelas sejam crias e populadas quando o banco for gerado.

**Criar Migrations**

Para organizar as migrations vamos criar um diretório `\server\database\migrations`. As migrations são executadas na ordem em que aparecem quando o banco é criado, por isso precisamos criar o nome delas com numeros na frente, afim de ter controle sobre a ordem que elas vão ser criadas. A base para criar uma migration é a seguinte:

~~~typescript
    import Knex from 'knex';
    
    export async function up(knex: Knex){
        // Criar tabela
    }
    
    export async function down(knex :Knex){
        // DESFAZER O QUE FOI FEITO NO UP
    }
~~~

A partir dai criamos nossas tabelas, abaixo deixo dois exemplos de criação de tabela, com e sem relacionamentos:

- Sem Relacionamento
~~~typescript
        export async function up(knex: Knex){
        
            return knex.schema.createTable('points', table => {
                table.increments('id').primary
                table.string('image').notNullable();
                table.string('email').notNullable();
                table.string('name').notNullable();
                table.string('whatsapp').notNullable();
                table.decimal('latitude').notNullable();
                table.decimal('longitude').notNullable();
                table.string('city').notNullable();
                table.string('uf',2).notNullable();
            });
        
        }
        
        export async function down(knex :Knex){
        
            return knex.schema.dropTable('points'); 
        
        }
~~~

- Com Relacionamentos

~~~typescript
        export async function up(knex: Knex){
        
            return knex.schema.createTable('point_items', table => {
                table.increments('id').primary
                table.integer('point_id')
                    .notNullable()
                    .references('id')
                    .inTable('points');
                table.integer('item_id')
                .notNullable()
                .references('id')
                .inTable('items');     
            });
        
        }
        
        export async function down(knex :Knex){
        
            return knex.schema.dropTable('point_items'); 
        
        }
~~~

_**OBS: Uma tabela com elacionamento so pode ser criada se a tabela que ela se relaciona já existir, fique atento aos nomes que serão dados**_

<br>

**Criar Seeds**

Para organizar as seeds vamos criar um diretório `\server\database\seeds`. Agora podemos criar as `seeds` que serão criadas junto ao banco. Abaixo um modelo de como uma seed deve ser criada:

~~~typescript
    import Knex from 'knex';
    
    export async function seed(knex: Knex){
    
        await knex('items').insert([
    
            { title:'Lâmpadas', image:'lampadas.svg' },
            { title:'Pilhas e Baterias', image:'baterias.svg' },
            { title:'Papéis e Papelão', image:'papeis-papelao.svg' },
            { title:'Resíduos Eletrônicos', image:'eletronicos.svg' },
            { title:'Resíduos Orgânicos', image:'organicos.svg' },
            { title:'Óleo de Cozinha', image:'oleo.svg' }
    
        ]);
    
    }
~~~

**Criar Banco**

Feito isso, precisamos criar o nosso banco e subir as seeds. E para isso podemos utilizar o npx com o seguinte comando:

~~~
        npx knex --knexfile knexfile.ts migrate:latest

        npx knex --knexfile knexfile.ts seed:run
~~~

Após a execução desse comando, podemos ver que o arquivo `\server\src\database\database.sqlite` foi criado. Para facilitar futuramente esses comandos, vamos adicionar scripts no `\server\package.json` como o exemplo abaixo:

~~~JSON
    "scripts": {
        "dev": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts",
        "knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
        "knex:seed": "knex --knexfile knexfile.ts seed:run"
      },
~~~

<br>

<hr>

# Voltando a Aplicação em React

Agora vamos começar o desenvolvimento da nossa aplicação em `React`. Não será fácil, mas fique ligado para não perder nenhum passo importante. Antes de começar, vamos limpar um pouco o ambiente que foi criado automaticamente quando geramos o template, depois disso vamos entender alguns conceitos.

### Limpando o Ambiente

Alguns arquivos gerados pelo `React` no seu modelo de projeto não são necessários, então vamos exclui-los para evitar lixo no projeto. Dos diretórios listados exclua:

## _`Dir: ./web/`_

- `README`

## _`Dir: ./web/public`_

- Deixar apenas o `index.html`

## _`Dir: ./web/src`_

- `app.test`
- `index.css`
- `logo.svg`
- `serviceWorker.ts`
- `setupTest.ts`

_**OBS: Os arquivos que sobraram certamente tem referência aos que você acabou de excluir, então remova essas referências.**_

Agora, antes de começar a programar precisamos entender alguns conceitos do `React` e como os arquivos estão conectados nele para gerar a sua página. Vamos falar um pouco sobre:

- JSX
- Comunicação dos arquivos
- Componentes
- Propriedades
- Estado e imutabilidade

<br>

## JSX

Basicamente JSX é o que permite que coloquemos tags `XML` dentro de um código `JavaScript`. Assim podemos retornar conteúdos paras nossas páginas de forma muito mais fácil. Veremos mais pra frente alguns exemplos.

## Comunicação dos Arquivos

Para entender como funciona o `React` temos que olhar basicamente para 2 arquivos. Primeiro o `\web\public\index.html` ele será a nossa página inicial, mas se você olhar pra ele vai percer que ele não possui muitas tags, e não será lá onde vamos colocar nosso HTML. O `React` se utiliza muito do conceito de componentização, que vamos ver em detalhes mais a frente. Pra você entender melhor abra o arquivo `\web\src\index.tsx`. Nele podemos ver o seguinte trecho de código:

~~~tsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    
    
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
~~~

A função `ReactDom.render()` é a que vai renderizar a tela da nossa aplicação. Se você perceber ela faz mudanças no elemento de id root, que se refere a `<div>` que temos no nosso HTML. 

Esse arquivo possui as tags `React.StricMode` que não mostra nada visível, mas server para verificar erros na renderização, e a tag `<App>` que é um componente criado por nós. 

Se abrirmos o arquivo `\web\src\App.tsx` poderemos ver os conteúdos da nossa aplicação, o `HTML` que é retornado é recebido pelo nosso `index.tsx` e renderizado no `index.html`. 

## Componentes 

Componentes são partes de um `HTML` gerados por um código, no nosso caso em `typescript`, que são adicionados as nossas páginas. Um componente pode ter diversas funções, pode ser por exemplo um header de uma página, que irá se repetir em outras, ou até mesmo rotas que devem ser chamadas quando um certo link ou botão forem acionados. Vamos exemplificar:

Como a nossa página vai ficar alterando entre rotas, e afim de organizar essas rotas, vamos modificar o arquivo `App.tsx` e deixá-lo como abaixo:

~~~tsx
    import React from 'react';
    import './App.css';
    
    import Routes from './routes'
    
    function App() {
    
      return (
    
        <Routes/>
    
      );
    
    }
    
    export default App;
~~~

Nosso componente `Routes` ainda não existe, então vamos cria-lo. Crie `\web\src\Routes.tsx` com o  conteúdo abaixo:

~~~tsx
    import React from 'react';
    import {Route, BrowserRouter} from 'react-router-dom'
        
    const Routes = () => {
    
        return(
    
            <BrowserRouter>
            
                
            </BrowserRouter>
    
        );
    
    }
    
    export default Routes;
~~~

Para que nossa aplicação consiga alterar de rota sem recarregar a página precisaremos instalar uma dependencia de roteamento, e para isso use os comandos abaixo:

~~~
    npm install react-router-dom

    npm install @types/react-router-dom -D
~~~

Agora precisamos criar nossas rotas, que nesse caso serão para quais páginas o site será direcionado quando um link ou botão for criado. Para isso precisaremos fazer algumas coisas. Para começar vamos criar 2 diretórios.

- `\web\assets`

    Essa pasta servirá para guardar as imagens que serão utilizadas no site

- `\web\pages`

    Esse diretório guardará as nossas páginas, para que elas possam ser acessas pelas rotas que queremos. Dentro dessa pasta vamos criar pastas para nossas rotas, como exemplo crie uma pasta chamada `Home`. Nela serão guardados todos os dados referentes a nossa pagina principal, tais como o componente da página, seu arquivo `css` e qualque informação referente a ela. Vamos criar um arquivo `index.tsx` nessa rota para que quando ela for chamada esse componente seja exibido. Crie a página como abaixo:

    ~~~tsx
        import React from 'react';
        import logo from '../../assets/logo.svg';
        import { FiLogIn} from "react-icons/fi";
        import {Link} from 'react-router-dom';
        
        function Home(){
        
            return (
        
                <div id="page-home">
        
                    <div className="content">
                        <header>
        
                            <img src={logo} alt="Ecoleta"/>
        
                        </header>
                        
                        <main>
        
                            <h1>Seu marketplace de coleta de resíduos</h1>
                            <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                            <Link to="/create-point">
        
                                <span>
                                    <FiLogIn/>
                                </span>
                                <strong>Cadastre um ponto de coleta</strong>
        
                            </Link>
                        </main>
        
                    </div>
        
                </div>
        
        
            );
        
        }
        
        export default Home;
    ~~~

    _**OBS: Perceba que importamos icones para serem utilizados na página, e utilizamos o mesmo através de uma tag. Para isso instale a dependência de icones do `React` com o comando `npm install react-icons`**_

<br>

- `\web\services`

    Nesta pasta iremos guardar os arquivos de definição dos serviços, tal como o serviço para conectar a API que a gente criou. Para fazer isso precisamos instalar uma biblioteca chamada `axios`, que pode ser instalada com o comando abaixo:

        npm install axios   

    Essa biblioteca permite que a gente navegue pelas rotas definindo uma URL de base, facilitando a troca para o ambiente de produção futuramente, uma vez que só irá precisar editar um arquivo. Para configurarmos precisamos criar um arquivo que vamos chamar de `api.tsx` dentro do diretório de serviços, e nela vamos escrever:

    ~~~tsx
        import axios from "axios";
        
        const api = axios.create({
        
            baseURL: 'http://localhost:7777'
        
        });
        
        export default api;
    ~~~

    Uma vez feito isso podemos criar nossas rotas no arquivo de rotas. Voltamos ao `\web\src\Routes.tsx` e dentro da tag `<BrowserRouter>` vamos adicionar nossas rotas seguindo os modelos abaixo:
        
    ~~~ts
        //NÃO ESQUEÇA DE IMPORTAR A ROTA
        import Home from './pages/Home';

        //...

        <BrowserRouter>

            <Route component={Home} path="/" exact />
            //component={<nome da pasta da rota>} path="<caminho que queremos na URL>"

        </BrowserRouter>
    ~~~

## Propriedades

Propriedades no `React` são como parametros em funções. Servem para passar informações para seus componentes. Por exemplo, ao criar um componente `<Header>` podemos ter uma propriedade title que seria exibida nesse header. Como isso funciona. Ao chamar o componente, a passagem das propriedades são feitas da seguinte forma:
~~~tsx 

    <Header title="Texto"/>

~~~

Para utilizar essa propriedade precisamos preparar nosso componete para receber essa propriedade. Preparando o componente:
Temos:
~~~tsx

    import React from 'react';

    function Header(){

        return(

          <h1>Ola Mundo</h1>  

        );

    }

~~~

Vamos precisar transformar nossa função em uma constante e usar uma Arrow Function para criar nossa função . Aṕos isso vamos colocar o tipo da nossa constante como `React.FC` (FC Function Component), assim podemos utilizar o generics para indicar qual o tipo está atrelado ao React.FC, neste caso criamos uma interface contendo todas as propriedades que nós queremos ter e usamos essa interface no genereics. Após isso tudo apenas colocamos um parâ metro que será por onde vamos acessar nossas propriedades. Parece confuso mas você entenderá melhor observando o exemplo abaixo:

~~~tsx

    import React from 'react';

    interface HeaderProps{
        title: string
        //title?: string -> caso n seja obrigatória
    }

    const Header: React.FC<HeaderProps> = (props) => {

        return(

          <h1>{props.title}</h1>  

        );

    }

~~~


## Estado e Imutabilidade 

O conceito de Estado é utilizado quando a gente precisa manter informações no próprio componente. Por exemplo os valores de input preenchido pelo usuário. 

Por exemplo, se a gente quiser criar um contador e um botão, e toda vez que o botão é presscionado o contador soma 1 e exibe o novo valor na tela. Para isso vamos começar modificando o nosso header e adicionando um botão.

~~~tsx
    import React from 'react';

    interface HeaderProps{
        title: string
    }

    const Header: React.FC<HeaderProps> = (props) => {

        
        const counter = 1;

        function handleButtonClick(){

            

        }

        return(

            <h1>{props.title}</h1>  
            
            <p>{counter}</p>
            <button type="button" onClick={handleButtonClick}>Aumentar</button>
        );

    }
~~~

Pelo conceito de imutabilidade não podemos simplesmente criar uma variável no nosso componente e alterar seu valor diretamente, precisamos criar um estado. Para isso precisamos importar do `React` o `useState`.  Essa função vai nos permitir criar estados seguindo os padrões estabelecidos, o `useState`, nos retona um Array no formato `[valor do estado, função para alterar o estado]`. Vamos ver na prática como funciona:

~~~tsx
    import React, {useState} from 'react';


    function Header(){

        const [counter, setCounter] = useState(0);

        function handleButtonClick(){

            setCounter(counter+1);
        }

        return(
            
            <p>{counter}</p>
            <button type="button" onClick={handleButtonClick}>Aumentar</button>
        );

    }
~~~

<br>

<hr>

## Dicas

### Use Effect

A função `useEffect` nos permite executar uma ação sempre que uma informação mudar. Essa função recebe dois parâmetros, o primeiro é qual função vai ser executada, e a segunda qual a informação que precisa ser mudada para startar a função. Nesse segundo parâmetro se for passado um Array vazio a ação vai ser executada uma unica vez, independente de qualquer alteração. Vamos dar um exemplo utilizando para receber os dados de uma API.

~~~tsx

    interface Item{

        id: number,
        title: string,
        image_url:string

    }

    const [items, setItems] = useState<Item[]>([])
    
    useEffect(() => {
        api.get('items').then(response =>{
            setItems(response.data);
        });
    }, []);
~~~

_**OBS: Sempre que estado for um Array ou um Objeto a gente precisa manualmente informar o tipo da variável que vai ser armazenada no useState**_


### Gerar HTML através de valores recebidos

Podemos usar os valores recebidos no exemplo acima para criar uma lista por exemplo. Para isso utilizamos o `map`. É importante lembrar que ao fazer isso cada elemento deve ter um campo `key` que diferencie eles, pasa que o `React` saiba diferenciar cada um. Exemplo:

~~~tsx

    {items.map(item => (

        <li key={item.id}>
            {item.title}
        </li>
    ))}

~~~

<br>

### Integrando Mapas (LeafLet)

O mapa LeafLet é uma opção de mapa que podemos integrar aos nossos sites que é gratuita. Para integrar o LeafLet precisamos primeiro instalar ele e suas dependências.

        npm install leaflet react-leaflet
        npm install @types/leaflet -D

Feito isso precisamos importar o CSS do mapa para o nosso `index.html`
~~~html
    <link rel="stylesheet" 
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" 
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin=""/>
~~~

Agora vamos colocar o mapa no componente que desejamos, e para isso não podemos esquecer de importar as bibliotecas que instalamos. O mapa será inserido com um marcador na posição indicada

~~~tsx
import {Map, TileLayer, Marker} from 'react-leaflet'

//....

    <Map center={[-27.2345678, -49.9876543]} zoom={15}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-27.2345678, -49.9876543]} zoom={15}/>
    </Map>
~~~

Se quisermos que o usuário clique no mapa e selecione o marcador precisamos criar um estado para guardar as informações que ele clicou e alterar o valor do marcador. Para isso inclua os seguintes códigos:

~~~tsx
import {Map, TileLayer, Marker} from 'react-leaflet';
import { LeafletMouseEvent} from 'leaflet';

//...

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);
    
    function handleMapClick(event: LeafletMouseEvent){
    
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    
    }

        <Map center={[-27.2345678, -49.9876543]} zoom={15} onClick={handleMapClick}> 
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <Marker position={selectedPosition}/>
        </Map>
~~~

Agora para finalizar. Se você quise que o mapa começe na posição que o usuário está basta adocionar o código abaixo:

~~~tsx
import {Map, TileLayer, Marker} from 'react-leaflet';
import { LeafletMouseEvent} from 'leaflet';

    const [inicialPosition, setInicialPosition] = useState<[number, number]>([0,0]);

    useEffect(() => {
               
        navigator.geolocation.getCurrentPosition( position =>{
            const {latitude, longitude} = position.coords;
            setInicialPosition([latitude, longitude]);
        });
    }, []);

        <Map center={inicialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />                    
            <Marker position={selectedPosition}/>
        </Map>
~~~


<br>

### Enviar os Dados Através do Form

Para enviar dados guardados pelos nossos componentes para alguma rota atravé de um formulário precisamos de algumas coisas. Primeiramente preciamos colocar no nosso formulário a propriedade `onSubmit`, como abaixo 

~~~html
    <form onSubmit={handleSubmit}>
~~~

Precisamos usar essa propriedade, pois o formulário pode ser enviado de diversas formas, cliclando no botão com o mouse, presscionando enter etc.

Após isso precisamos de mais duas coisas. Por padrão o submit recarrega a página quando é enviado, para alterar isso precisamos importar o `FormEvent` e utilizar uma de suas funções para previnir a ação padrão. Após fazer isso podemos juntar os dados em uma unica variável e submeter para nossa API e então levar o usuário de volta para a página principal.

~~~tsx

import {useHistory} from 'react-router-dom';
import React, {FormEvent} from 'react';
import api from '../../services/api'

const App = () =>{
// ...

    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        const {name, email, whatsapp} = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        const data = {

            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items

        };

        await api.post('points', data);

        alert('Ponto de coleta criado!')

        history.push('/');

    }
}

export default CreatePoint;
    
~~~

<br>

<hr>

## React Native

Assim com o `React`, o `React Native` serve para criar interfaces, mas diferente do primeiro, ele é usado para criar aplicações mobile. É muito parecido com o `React`, tudo que foi aprendido antes se mantém com pequenas alterações. Vamos vê-las.

### Diferenças entre Reac e o Reac Native

O `React Native`, possui poucas diferenças, além de algumas bibliotecas que são usadas, e que vamos falar mais tarde, as principais diferenças são:

-
-