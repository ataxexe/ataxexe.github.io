---
layout: post
title:  Cuidado com a Herança!
category: devoops
language: pt_BR
tags:
  - orientação a objetos
  - herança
  - composição
  - juquinha
  - programação
images: /assets/images/devoops/heranca-composicao
---

Muitos autores dizem para evitarmos a herança e usarmos composição sempre que possível. Muitos leitores não entendem o porquê. Ou por falta de conhecimento de boas práticas ou por as conhecerem tão bem que fica difícil entender como algo aparentemente tão óbvio possa ser motivo de discórdia.

Neste post tentarei mostrar qual é a herança perigosa e o porquê de ser preferível usar a composição em vez dela.

## Entendendo o cenário

Juquinha está escrevendo uma API de listas e logo começa o trabalho usando o recurso que mais gosta da orientação a objetos: a herança. Juquinha logo cria uma classe `Lista` para representar uma lista de objetos e já vê, de cara, duas especializações possíveis dela: uma lista que utiliza um array e uma lista Ligada. A herança permitiu reaproveitar o código bastando herdar a classe `Lista`. Pronto! Uma maravilha! Juquinha é o cara!

![Primeira versão da API]({{ page.images }}/listas-heranca-1.png)

## Primeiro upgrade

Tudo está uma maravilha e a API de listas é o assunto do momento. Surge, agora, a necessidade de listas sincronizadas para compartilhá-las com várias *threads*. Juquinha nem hesita e já senta o dedo na herança. O resultado fica lindo e o código foi praticamente reaproveitado!

![Atualização... ainda parece legal]({{ page.images }}/listas-heranca-2.png)

Novamente o sucesso da API é ecoado em todos os corredores, só se fala no design maravilhoso e... antes que Juquinha tirasse uma folga, veio a necessidade de listas duplamente Ligadas. Juquinha logo toma uma dose de energético com cafeína e arrebenta com a versão 3.0 da API:

![Hummmm...parece complexo]({{ page.images }}/listas-heranca-3.png)

Juquinha foi promovido e sua API foi utilizada em quase todos os sistemas da empresa. Algum tempo depois, foi solicitado ao Juquinha que incluísse na API alguma funcionalidade para permitir Listas imutáveis, pois acharam melhor a ideia de usar objetos imutáveis em vez de métodos sincronizados. Juquinha passa um pouco mais de tempo para implementar desta vez, mas libera a versão:

![Pronto! A cagada está feita!]({{ page.images }}/listas-heranca-bagunca.png)

## Tem alguma coisa cheirando mal aqui

Agora volte um pouco e dê mais uma olhada nas figuras acima. Perceba que a quantidade de classes aumenta consideravelmente por causa de uma mera adição de funcionalidade. Seria isso um indício de que herança não presta? Não! Isso é um indício de que ela foi usada pelo pior motivo possível: **reaproveitamento de código**.

## O que raios é a herança

A herança é uma forma de uma classe se acoplar a outra de modo que a primeira herde atributos e comportamentos da segunda. A herança define, então, um relacionamento do tipo **É-UM** entre as classes. A API do Juquinha parece estar certa, pois uma `ListaLigadaSincronizada` **É-UMA** `ListaLigada`. Será que é mesmo?

## O problema está na maldita seta

Perceba que, embora pareça que uma `ListaLigadaSincronizada` seja uma `ListaLigada`, uma outra relação possível seria que uma `ListaLigadaSincronizada` **É-UMA** `Lista`. Isso significa que a herança deveria ser com a classe `Lista` e não com `ListaLigada`.

Tudo bem! O Juquinha não sabia que poderia fazer daquele jeito. Depois que deram uma bronca nele porque a API estava ficando muito confusa, Juquinha resolveu estudar um pouco mais e a refatorou.

![Versão com composição]({{ page.images }}/listas-composicao.png)

Note aqui que, além de `Lista` ser agora uma interface, não temos mais a classe `ListaLigadaSincronizada` e, sim, uma `ListaSincronizada`. Isso faz muito mais sentido porque a responsabilidade da `ListaSincronizada` é simplesmente de ser sincronizada. Uma `ListaLigadaSincronizada` tem responsabilidades demais. Fazendo dessa forma, Juquinha exterminou aquela colônia de classes e criou um modelo muito mais simples.

O interessante é notar que houve uma alteração significativa: `Lista` é agora uma interface! Mas o que isso representa?

## A interface

Como já foi dito, a herança define uma relação do tipo **É-UMA**. Isso é algo muito profundo e mexe com a identidade ~~do ser~~ da classe. A interface, por sua vez, é algo apenas comportamental. Ela define uma relação do tipo **SE-COMPORTA-COMO**.

Vamos esquecer o exemplo das listas por um momento e pensar em um animal de estimação. Como você modelaria? Uma possível resposta poderia ser:

- Uma classe `Animal`
- Uma classe `AnimalDeEstimacao` herdando de `Animal`

A partir daí, pode-se modelar uma classe `Cachorro` como sendo filha de `AnimalDeEstimacao`, uma classe `Tigre` como filha de `Animal` e assim por diante.

Agora, se tivéssemos um daqueles nipônicos robôs em formato de animal e completamente domesticados, um belo robô de estimação. Como isso seria modelado? Não faz muito sentido herdar a classe `AnimalDeEstimacao` porque o robô não é um animal, mas **comporta-se** como um animal de estimação. A partir daí, poderíamos remodelar a galerinha para:

- Uma classe `Animal`
- Uma **interface** `Estimacao`

Agora poderemos ter a classe `Cachorro` herdando `Animal` e implementando `Estimacao`. Bem como poderemos ter a classe `RoboDomestico` implementando `Estimacao` também.

E o que isso significa para um algoritmo? Significa mais ou menos o seguinte: *não me importo com o que você é, desde que se comporte como eu preciso*. Poético, não?

Voltando à última implementação das listas do Juquinha. O que ele queria era manipular algo que pudesse se comportar como uma lista, não importando o que realmente era aquele algo. Mais importante ainda: como não temos herança múltipla em todas as linguagens (felizmente!), utilizar uma herança acaba com a única chance da classe ter uma identidade ~~e um papel na sociedade~~ que faça sentido, portanto, Juquinha foi cauteloso em não expor a identidade de suas listas. (Tá, fui longe demais agora...voltarei à Terra em algumas palavras.)

Outro ponto interessante é que o comportamento definido nas interfaces evidencia um **contrato**, ou seja, para alguma coisa qualquer ser tratada como uma `Lista`, é necessário que ela tenha os comportamentos descritos na interface `Lista`.

## A composição

Voltando à última implementação das listas do Juquinha, perceba que as especializações sincronizada e imutável de lista não possuem, de fato, uma implementação concreta de uma lista pois a implementação em si é passada pelos construtores. É aí que está a composição: uma `ListaImutavel` é composta de outra `Lista` que detém, de fato, a implementação concreta de como uma lista deve ser, deixando a `ListaImutavel` com a implementação de como a imutabilidade deve ser.

É justamente essa herança que deve ser evitada em favor da composição: a herança para **adicionar comportamento**. Nesse caso, a `ListaImutavel` irá apenas adicionar o comportamento da imutabilidade a uma implementação de `Lista`, delegando tudo aquilo o que não for relacionado à imutabilidade à instância de `Lista` passada pelo construtor. Exemplo:

~~~java
public class ListaTemperamental implements Lista {

  private final Lista lista;
  
  public ListaTemperamental(Lista lista) {
    this.lista = lista;
  }
  
  public void adicionar(Object objeto) {
    if(System.currentTimeMillis() % 2 == 0) {
      throw new Exception("Estou de TPM, não vou adicionar elemento nenhum!");
    } else {
      lista.adicionar(objeto); //delegação para quem realmente vai fazer o trabalho sujo
    }
  }

}
~~~

Para quem sentiu uma certa familiaridade com esse código, esse é o padrão de projeto **Decorator**.

Péra aê! Volta...volta... `ListaTemperamental` é um comportamento e está como uma classe? Sim! Comportamentos que não necessariamente definem um contrato (claro, no contexto onde será utilizado) podem estar em uma class em vez de uma interface. Melhor ainda, pode estar em um método que encapsula a criação dessa classe:

~~~java
public static Lista listaTemperamental(Lista listaReal) {
  return new ListaTemperamental(listaReal);
}
~~~

Agora está bem mais legal. Já que uma lista temperamental não possui um comportamento que possa ser definido em um contrato, vamos tratá-la como uma lista apenas (e evitar expor uma classe a mais na sua API sem necessidade).

## Nem tudo são flores

Ok! Agora Juquinha já sabe de uma boa prática e irá usar composição sempre que quiser inserir um comportamento extra em uma classe. O problema é que estamos recheados de péssimos exemplos, sendo um deles a própria classe `Properties` do Java. Essa classe herda a classe `Hashtable`, que possui métodos para incluir objetos como chave. Conseguiu sentir o problema? Isso significa que você pode fazer algo assim:

~~~java
Properties props = new Properties();
props.put("chave", new HashMap()); // isso não pode, segundo a documentação da classe
props.setProperty("chave-com-valor-correto", "valor"); // deveria ser assim
props.get(new ArrayList()); // isso também não pode
props.get("chave"); // isso aqui também não
props.getProperty("chave"); // deveria ser assim, mas o retorno disso será null neste caso

Map mapa = new HashMap();
mapa.put(10, false);
mapa.put(new Object(), 42);
props.putAll(mapa); // Uhuuuuuuuuuu, merda no ventilador!! Corre pra debaixo da mesa!!
~~~

Fica bem claro a cagada que foi feita quando olhamos o código fonte da classe `Properties`:

~~~java
public class Properties extends Hashtable<Object,Object> {
  // mais um monte de esterco aqui
}
~~~

Como isso poderia ser evitado? Simples! Com uma composição:

~~~java
public class Properties {
  private Hashtable table;
  // bla bla bla
}
~~~

Dessa forma, os métodos de `Hashtable` não ficariam expostos e métodos que recebem `Hashtable` não poderiam receber `Properties`. O núcleo da catinga era justamente o `extends Hashtable`. Com isso, o contrato ficou definido na documentação, onde é explicado que não se pode chamar alguns métodos e... espera um pouco... a documentação definindo quais métodos podem ou não serem utilizados?!? Vou ali me enforcar e já volto!

## Violação de princípios

Essa implementação da API viola o [princípio de substituição de Liskov][liskov]. Esse princípio diz que, se **S** é um subtipo de **T**, então pode-se substituir **T** por **S** sem acarretar mudanças. Isso não ocorre com `Properties`.

Além de tudo o que vimos até agora, a herança tem alguns pontos fracos que precisam ser cuidadosamente analisados:

- Aumenta o acoplamento entre as classes
- Pode quebrar o encapsulamento

Aqui a coisa fede bastante, ao se acoplar a uma implementação, passamos a depender dela. Isso pode gerar alguns probleminhas, como pode ser visto na implementação de um `HttpServlet`:

~~~java
public class MeuIngenuoServlet extends HttpServlet {

  public void init(ServletConfig config) {
    // código lindo de inicialização aqui
    // não chamei o método da superclasse
  }
 
  public void doGet(HttpServletRequest request, HttpServletResponse response) {
    getServletConfig().getInitParameter("parametro"); // fudeu!!! NullPointerException
  }

}
~~~

Esse *servlet* será o maior produtor de `NullPointerException` de um sistema. Isso porque o método init da classe `HttpServlet` **precisa** ser chamado para guardar o objeto `ServletConfig`. Isso implica que o nosso ingênuo servlet deveria saber como foi implementada a classe `HttpServlet`, uma clara quebra de encapsulamento e, de brinde, uma solda industrial entre as classes.

Agora você já sabe: **evite a herança, favoreça a composição**. Existem técnicas para se trabalhar com herança e Joshua Bloch as explica no livro *Effective Java* como *Design for Inheritance*.

[liskov]: <http://pt.wikipedia.org/wiki/Princ%C3%ADpio_da_substitui%C3%A7%C3%A3o_de_Liskov>
