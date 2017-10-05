---
layout: post
title:  "Automatize seu Android usando as células da rede"
category: androidoctor
language: pt_BR
tags:
  - android
  - automação
  - llama
images: /assets/images/androidoctor/llama
---

Meu celular sempre teve um baita dedão no canto da tela onde eu ligava a wifi e o colocava no
silencioso. Era sempre a mesma coisa todo santo dia: chegava na faculdade e ligava o silencioso,
saída da faculdade e desligava o silencioso, chegava em casa e ligava a wifi, saía de casa e
desligava a wifi, e por aí vai...

## Blá! Usa um software de localização com o GPS que tá resolvido!

O GPS seria uma ótima solução caso não devorasse minha bateria como se não houvesse amanhã. Sem
contar que eu era o infeliz dono de um dos modelos **premiados** pela Samsung com o GPS bugado, o
que inviabilizava essa solução.

Eu já estava jogando a toalha quando encontrei um aplicativo fantástico: o [Llama][]. Com uma sigla
recursiva (**Llama is a Location Aware Mobile Application**), o Llama resolve o problema da localização de forma
simples: baseando-se nas células da rede de telefonia móvel. Como seu celular está em constante comunicação com as 
células, o Llama tira proveito disso pra consumir o mínimo de bateria possível.

## Tá, mas, e como funciona na prática?

Funciona assim: o Llama associa um conjunto de células da rede a uma localidade que você definir
(sua casa, trabalho, etc.). Tais localidades podem ser combinadas com ações (aplicativo aberto,
horário, fone de ouvido plugado, ativação de perfil) para formar uma infinidade de pares ordenados
condição-ação. Se você for tão pirado com automação quanto eu já deve ter imaginado em que isso vai
dar.

## Não! Não sou tão maluco assim!

Sem problemas, vou dar um exemplo: imagine que você queira que o celular desligue as notificações e
abra o aplicativo de música sempre que colocar os fones de ouvido quando estiver no trabalho. É uma
das coisas que o Llama resolve com uma pata nas costas.

## Hummmmmm... gostei da ideia! Alguma contraindicação?

Existem algumas situações em que o sistema de localização do Llama não conseguirá te atender (e não
é por culpa dele):

* duas ou mais áreas de interesse dentro da(s) mesma(s) célula(s) (sua casa e a padaria, por exemplo)
* sinal de celular mais fraco que o Chapolin com anemia (a TIM na casa dos meus pais, por exemplo)
* em Khazad-dûm (a realidade é dura, Gimli...)

Caso você não se encaixe ali, baixe o Llama e comece a treiná-lo agora mesmo!

## Treinar? Como assim?!?

Bom, pro Llama saber em qual área você está foragido, ele precisa saber quais células determinam
essa área. O processo é bem simples:

1. Vá na aba "AREAS"
1. Soque o dedo no botão "+" e dê um nome para a sua área
1. Informe quanto tempo estará nessa área

Pronto! O Llama irá coletar todas as células que seu celular estiver conectado e irá associá-las à
área que você criou. O próximo passo é definir um perfil de som:

1. Vá na aba PROFILES"
1. Soque novamente o botão "+" e brinque com as milhares de configurações de som que se abrirão

Aqui um destaque para o "Noisy Contacts". São aqueles números que irão tocar com volume diferenciado
(alto ou baixo, você escolhe). É uma boa sacada para os números prioritários e os que só enchem o
saco.

Agora vem a melhor parte: ligar condições com ações. É nessa hora que o Llama mostra seu valor. Vá
na aba "EVENTS" e esmurre o botão "+". Você verá algo parecido com isto:

![]({{ page.images }}/llama-new-event.png)

Em "Add Condition", você poderá optar por uma porrada de condições que podem disparar um evento no
Llama. As áreas que você mapear estarão presentes nas condições "Enter/In Area" (para quando você
entrar ou estiver dentro da área) e "Leave Area" (para quando você sair dela).

![]({{ page.images }}/llama-conditions.png)

Em "Add Action", uma enorme gama de ações, inclusive a ativação do perfil (em "Profile"), é colocada
à sua disposição. Existe ação pra muita coisa (adicionar lembretes, abrir aplicativos, atalhos e por
aí vai...), portanto, não deixe de passar por todas elas para ter noção do poder que está em suas
mãos.

![]({{ page.images }}/llama-actions.png)

Com tudo configurado, você pode cutucar o "Test Actions" pra ver se vai funcionar direitinho.
Perceba que você não precisa necessariamente ter áreas associadas no Llama ou perfis de som para
usá-lo, pois elas são apenas uma condição e uma ação dentro da enorme possibilidade de automação do
Llama. Algumas sugestões legais:

* Ligar e desligar a wifi em casa (use a opção "WiFi Off (if not connected)" pra evitar desconectar
  a wifi se pegar uma célula na área que não está mapeada no Llama)
* Deixar no silencioso na faculdade
* Abrir o aplicativo de música quando plugar o fone de ouvido em casa pela manhã (na hora de dar
  aquela corridinha)
* Trocar o papel de parede dependendo da área (assim você pode evitar bullying no trabalho trocando
  aquela foto dos Ursinhos Carinhosos)

## Uoooou! Vou colocar pra ligar o GPS e...

Calma lá, deixa eu cortar o seu barato um pouco. Se você é um feliz portador do Android Gingerbread
(2.3) ou superior, o Google removeu (a partir do Gingerbread) a possibilidade de ativar e desativar
o GPS do celular via aplicativo e, antes que você tenha um ataque de pelanca, fique feliz por isso.
Imagine se todo aplicativo pudesse ligar o seu GPS e, assim, reportar sua localização... bem melhor
assim, não é?

Caímos naquela velha discussão que envolve capar alguma coisa do celular em prol da segurança dos
usuários. Se consideramos a base de usuários de Android e a quantidade de lixo que temos na Play
Store, foi a melhor decisão para a maioria dos usuários. A boa notícia é que existe uma alternativa
pra isso, mas envolve [rootear seu celular][post-root] e usar outra solução de automação (falarei
sobre ela em posts futuros). Por ora, deixe o GPS ligado.

[llama]: <https://play.google.com/store/apps/details?id=com.kebab.Llama>
[post-root]: <{% post_url /androidoctor/2013-01-24-root-o-papel-higienico-eletronico-para-o-seu-android %}>
