---
layout: post
title:  "Desenhando uma API para o Robocode"
category: devoops
language: pt_BR
images: /assets/images/devoops/robocode
tags:
- java
- robocode
- padrões de projeto
- programação
- orientação a objetos
---

Quando eu aprendi a programar, fiquei fissurado por um projeto de um jogo educacional feito por um maluco chamado **Mathew Nelson**. Nele, o estudante programava robôs para serem postos em uma arena para uma rinha virtual. Apesar de ser um projeto muito legal, ele era um pouco perigoso devido ao ponto de partida ser uma herança mais perigosa que repolho com batata-doce, e nós sabemos que devemos tomar muito [cuidado com a herança][post-heranca]. O projeto era o excelente [Robocode](http://robocode.sourceforge.net).

A herança maldita é o que define os dois tipos de robôs:

- Robô Simples
- Robô Avançado

A diferença entre eles é, basicamente, na movimentação: enquanto o simples não consegue executar o movimento linear e o angular ao mesmo tempo, o avançado consegue, ou seja, o simples só ia pra frente, virava, ia pra trás, virava... Além disso, pode-se usar alguns eventos e outras funcionalidades com o Robô Avançado. O problema é usar uma herança pra isso, não é bonito. Após algumas versões, foi lançada uma versão do Robocode com suporte a interfaces, mas era a quantidade de interfaces que definia o que o robô poderia ou não fazer. Como estamos na época de *Annotations*, eu achei muito mais legal reformular tudo isso em uma API que usasse o melhor da composição e da orientação a eventos com anotações e um sistema plugável de componentes. Ao longo desse post, irei mostrar alguns dos conceitos que usei para construir essa API, que está em constante aprimoração e disponível no meu [GitHub][].

## Composição

No Robocode, cada robô é composto de três partes:

- **Corpo**: responsável por mover o robô.
- **Canhão**: responsável por atirar as balas.
- **Radar**: responsável por escanear o campo de batalha e procurar os alvos.

Apesar de haver essa diferenciação, o código do robô não a faz, ou seja, essas três partes são acessíveis direto por métodos da classe do robô. Aí está o primeiro problema: não existe uma separação lógica das partes do robô e isso dificulta a componentização. A minha ideia era justamente criar uma classe para representar cada uma dessas partes e, assim, poder facilitar a criação de diferentes sistemas de mira, de movimento e de escaneamento.

Como é uma boa prática programar para interfaces, três interfaces foram criadas: `Body`, `Radar` e `Gun`. Como essas partes possuem métodos semelhantes com relação à movimentação, criei uma interface `Part`, que é a mãe da galera.

Claro que isso deve agora ser socado no código do robô. Para isso, criei uma classe abstrata composta por essas três partes em uma implementação padrão. A coisa começou a ganhar forma.

## Separação de responsabilidades

O interessante de ter separado as partes é que eu poderia trocar o corpo do robô para mudar a forma de movimentação. Mas logo não me pareceu ser uma boa ideia dividir apenas nessas três partes. A questão é que o corpo do robô, por exemplo, é responsável por mover o robô e dar a movimentação para cada turno. Isso é responsabilidade demais e acaba se repetindo para as demais partes: o canhão deve saber movimentar, mirar e calcular a energia de cada tiro e o radar deve saber movimentar e adequar a movimentação para cada tipo de batalha ou comportamento do robô.

Pensando muito na situação, eu acabei criando sistemas para acoplar em cada parte, ficou mais ou menos assim:

- **Corpo**: responsável por mover o robô e é composto de um sistema de movimentação, que diz para o corpo para onde ele deve se mover.
- **Canhão**: responsável por mover o canhão e é composto de um sistema de mira, que diz para onde o canhão deve se mover, e um sistema de tiro, que diz qual é a energia da bala baseado em algum cálculo.
- **Radar**: responsável por mover o radar e é composto de um sistema de escaneamento, que diz para onde o radar deve se movimentar.

A explicação é simples: se eu quisesse trocar a forma como o robô se movimenta, deveria implementar os métodos básicos de virar e andar, separando essas responsabilidades, pude criar diversos sistemas, por exemplo:

- Sistema de movimentação *gravitacional*
- Sistema de mira por predição de movimento
- Sistema de movimentação circular

## Comportamento dinâmico

De nada adianta socar um sistema de movimentação se eu não puder trocá-lo no meio da batalha. Pensando nisso, comecei a desenhar formas de alterar os sistemas e cheguei à conclusão que o melhor seria associar os sistemas a condições que definam se o sistema em questão deve ser utilizado.

A ideia era poder trocar cada sistema de acordo com dados coletados ou situações do campo de batalha. Um exemplo legal é o de fazer o radar girar para a um lado e, sempre que avistar o inimigo, girar no sentido contrário. Isso cria um movimento curto do radar e faz com que seja mais fácil prever a localização do inimigo e dar um tiro certeiro. Obviamente, isso não é uma boa ideia para uma batalha com mais de um inimigo (a menos que você não se preocupe em esbarrar neles ou em levar uns tiros).

A implementação foi feita com uma interface de condições, chamada de `Condition`, onde existe apenas um método chamado `evaluate`. Quando uma parte do robô está em funcionamento, ela percorre os diversos sistemas registrados para ver se algum possui uma condição que retorne `true`, dizendo que esse sistema deve ser usado agora.

A brincadeira não estaria completa se não houvesse uma forma de compor as condições (*perto de uma parede* **e** *com pouca energia*, por exemplo) mantendo a reusabilidade. Foi aí que nasceram as classes `*Conditions`.

## Eventos e anotações

Existe um sistema de eventos no Robocode, mas ele é totalmente centrado na classe do robô (e nas milhares de interfaces que temos de implementar, caso não seja usada a herança maldita). A ideia aqui era usar um sistema bem flexível que usasse anotações para mapear os ouvintes.

Primeiramente, foi preciso criar um sistema de eventos e socá-lo no robô. Cada componente registrado, seja ele um sistema, uma parte ou um plugin, teria seus métodos escaneados em busca de uma anotação que definisse ser este um método de escuta. A anotação escolhida foi `@When`:

~~~java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface When {

  String[] value();

}
~~~

O evento foi definido como uma `String` para dar total liberdade à criação de novos eventos (que não seria possível se fosse usado um `enum`, por exemplo). Um método anotado com `@When` receberia os eventos disparados com o nome mapeado, exemplo:

~~~java
@When(HIT_BY_BULLET)
public void meAcertaram() {
  if (++tirosLevados > 500) {
    fudeu();
    correrPraTodosOsLados();
  }
}
~~~

Caso o método receba um parâmetro, o evento só será disparado para ele se o parâmetro do evento for igual ao parâmetro do método. A interface de eventos é bem simples e intuitiva:

~~~java
public interface EventRegistry {

  void register(Object listener);

  void send(String eventName, Object... args);

}
~~~

A grande vantagem de usar um mecanismo de eventos é desacoplar os componentes, isso dá margem a abordagens muito interessantes, como a detecção de tiros, por exemplo:

~~~java
// após detectar que um tiro foi dado
bot.dispatch(
  ENEMY_FIRE, new EnemyFireEvent(enemy, bulletPower)
);
~~~

Apesar de existir uma interface de eventos, ela não é exposta no robô porque isso violaria o encapsulamento. Por isso, os *listeners* são registrados pelo método 'plug' e os eventos são disparados pelo método `dispatch`, ambos da interface `Bot`.

Note que o componente que dispara o evento não precisa saber quem está interessado em ser notificado quando ele detectar um possível tiro. Dessa forma, podemos ter vários pontos no código que podem se beneficiar disso e tomar qualquer decisão, exemplo:

~~~java
@When(ENEMY_FIRE)
public void onEnemyFire(EnemyFireEvent event) {
  // código para tentar desviar da bala
}
~~~

Esses dois códigos são conectados pelo sistema de eventos e não precisam depender entre si. Por causa disso, pode-se até criar outro componente de detecção de tiros que nada tenha em comum com o já escrito. Desde que ele dispare o evento `ENEMY_FIRE`, nada precisa ser mudado no código do ouvinte.

## Plugins

Um robô tem três partes, cada uma com um ou mais sistemas ativados condicionalmente. O problema é que alguns comportamentos legais de serem incluídos no robô (como uma forma de esquivar de balas) não se encaixam em nenhum desses conceitos. Foi aí que eu pensei em uma forma de plugar componentes no robô para que eles recebessem os eventos disparados de qualquer lugar. O plugin de esquiva, por exemplo, depende do radar para saber se algum robô perdeu energia (como perde-se energia ao atirar, pode-se inferir que, se um robô perdeu energia, **provavelmente** ele atirou) e depende do corpo para acionar um movimento de esquiva no momento em que a bala estiver chegando (pode-se calcular a velocidade da bala de acordo com a energia atirada).

O sistema de plugins não tem interface alguma. É um objeto qualquer cujos métodos são anotados com `@When`, da mesma forma como qualquer outro componente do robô. Ficou tão legal que o seguinte trecho de código já adiciona a capacidade de se esquivar a qualquer robô que use a API:

~~~java
  plug(new Dodger(this));
~~~

Basta apenas receber o evento `ENEMY_FIRE` e fazer o que for preciso pra não levar chumbo.

## Interfaces Fluentes

Usar uma interface fluente é muito interessante para melhorar a legibilidade do código. Depois de muito pensar, optei por usar interfaces fluentes na definição das condições dos sistemas, obtendo um resultado bem satisfatório:

~~~java
gun().forAiming()
  .use(predictionAimingSystem)
  .when(target.isMoving())

  .use(directAimingSystem)
  .inOtherCases();

gun().forFiring()
  .use(energyBasedFiringSystem);

radar().forScanning()
  .use(enemyLockScanningSystem);

body().forMoving()
  .use(enemyCircleMovingSystem)
  .when(target.isClose())

  .use(followEnemyMovingSystem)
  .inOtherCases();
~~~

O cuidado em implementar uma interface fluente é o de não deixar todos os métodos em uma única interface, evitando problemas como este:

~~~java
gun().forAiming()
  .inOtherCases()
  .when(target.isMoving())
  .use(predictionAimingSystem)
  .use(directAimingSystem);
~~~

Para que não seja possível uma aberração dessas, é interessante deixar ao compilador o trabalho de validar as coisas separando os métodos entre interfaces. É mais ou menos um autômato. Abaixo está o autômato do exemplo:

![Deveria ser assim]({{page.images}}/system-select-automata.png)

Essa belezinha é meio complicada de garantir somente implementando interfaces. Para cada `q` seria necessária uma interface diferente e o estado final é complicado de garantir (quando só existe um, pode-se sugerir com um método `void`, mas é somente uma sugestão pois nada impede que alguém escreva até algum estado intermediário pois o compilador não valida isso). Claro que podemos usar outros artifícios pra isso, mas acaba virando uma xiforímpula cintilante e vai atrapalhar mais do que ajudar.

O que temos a fazer é encontrar um ponto onde a interface seja intuitiva o bastante e, ao menos, coesa o suficiente para evitar coisas malucas. O ponto que encontrei foi este:

![Mas foi implementado assim]({{page.images}}/system-select-interface.png)

Com certeza é muito diferente e propenso a falhas, mas, como o primeiro também o seria, é melhor ter algo mais simples de implementar e que consiga expressar o mesmo conceito. Por isso é importante manter os nomes dos métodos o mais simples e explicativo possível, mesmo que seja um nome um pouco grande (afinal, *code complete* está aí pra nos ajudar).

## Auxiliares

É claro que alguns ajudantes são necessários pra fazer a coisa toda andar e um dos fundamentais é a Matemática (em especial a Trigonometria). O Robocode pode utilizar tanto graus como radianos, mas acaba duplicando os métodos (`setXXX` para graus e `setXXXRadians` para radianos), o que tem cheiro de cueca de dez dias. Eu resolvi o problema criando a classe `Angle`, que representa... dã... um ângulo.

Com certeza eu poderia utilizar bibliotecas prontas para esse tipo de cálculo (e pretendo usar), mas acabei querendo implementar por puro exercício. (Isso é, inclusive, muito bom de ser feito pois sistemas em produção não são o local mais apropriado para usarmos aquela teoria que acabamos de aprender em sala de aula.)

Algumas outras classes foram criadas para abstrair algumas coisas como a localização dos robôs, trajetória das balas, pontos com força gravitacional (usados no movimento gravitacional) e outras loucuras. Tudo foi criado pensando em abstrair ao máximo a API do Robocode para evitar ao máximo o contato com duas APIs diferentes, principalmente das partes que me davam mal estar.

## Criando robôs

Para usar a API, basta apenas pegar o código no [GitHub][] e criar uma subclasse de `BaseBot`. A estrutura de pacotes está bem intuitiva e, para o caso de algum exemplo, basta olhar os robôs de exemplo, que estão [aqui][exemplos].

## Conclusão

Ter tido contato com o Robocode foi excelente para o meu aprendizado. Eu me lembro que, quando eu estava aprendendo a programar, um dos meus mentores me disse "Faça seu robô ganhar do Walls". Eu acabei não conseguindo fazer um que ganhasse de porcaria nenhuma naquela época. Hoje eu [consegui][robo] fazer um que ganhou do Walls, mas não foi o fato de ter ganhado ou não que me fez sentir bem, foi o fato de eu ter conseguido aplicar uma porrada de conceitos e técnicas que aprendi no longo dos anos sem fazer os dados de um *input* idiota serem gravados no banco de dados.

... tá... ter ganhado do Walls foi do #$@%#!!

[github]: <https://github.com/devnull-tools/robobundle>
[exemplos]: <https://github.com/devnull-tools/robobundle/tree/master/src/atatec/robocode/robots>
[robo]: <https://github.com/devnull-tools/robobundle/blob/master/src/atatec/robocode/robots/Chronos.java>
[post-heranca]: </devoops/2013/08/29/cuidado-com-a-heranca>