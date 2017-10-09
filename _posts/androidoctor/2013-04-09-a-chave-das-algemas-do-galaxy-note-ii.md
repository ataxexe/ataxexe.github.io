---
layout: post
title:  "A chave das algemas do Galaxy Note II"
category: androidoctor
language: pt_BR
images: /assets/images/androidoctor/root-note-2
tags:
  - android
  - root
  - galaxy note ii
  - roms
  - slim
  - alliance
  - tasker
  - aplicativos
alerts:
  - danger
---

O Galaxy Note II é um ~~celular~~ ~~tablet~~ ~~coisa~~ ~~OVNI~~ aparelho excelente! A Samsung não diz se é um tablet, um smartphone ou filho de um Galaxy S3 bêbado com um Palmtop no cio. Alguns o chamam de *phablet* (tablet + smartphone). Eu prefiro o termo *aparelho traveco* mesmo, mas usarei somente *aparelho* para tentar manter a sanidade deste post (preciso acreditar nisso pelo menos uma vez)!

Nossa história começa num final de tarde. Você não tem mais nada pra fazer e resolve gastar seu rico dinheirinho em um belíssimo Samsung Galaxy Note II. Ele não é aquele pedaço de cerâmica de um metro quadrado com slot pra cartão de memória tal qual seu antecessor, é uma garrafa de Guara Viton achatada que cabe bem na sua mão estilo raquete de tênis. Você o compra e fica louco pra descobrir tudo o que ele pode oferecer. É uma relação linda entre o homem e o seu ~~amplificador anti-social~~ aparelho móvel!

Tudo vai bem até você se deparar com a interface teletubbiana da Samsung (e mais outras coisinhas que irei contar ao longo deste post). Não se desespere, meu caro padawan! Hoje você irá libertar seu ~~traveco~~ aparelho das forças do mal.

## Cara, eu não vou ler isso porque você é lunático e detesta a interface da Samsung

Calma! Antes que você me dê uma voadora digital, irei delatar o maior vilão da ROM da Samsung no Galaxy Note II: a caneta!

## O quêêêê??!?!?!!?? A caneeeeeeeta?!!?!?!??!?

Isso mesmo! A caneta! Apesar de ser a cereja do bolo, existem alguns probleminhas com ela:

- Não existem gestos diretos, ou seja, você precisa fazer o gesto pra cima e, depois que o painel idiota abrir, fazer outro gesto para ter o que deseja.

> Uma pequena pausa para um momento de cólera ragubenta: pelo amor de Zeus andando de Mountain Bike no Deseto do Atacama (sem capacete, porque ele não precisa), que vantagem eu tenho ao pressionar o botão da caneta, riscar pra cima na tela, esperar a porta da esperança abrir, rabiscar um "#" e, com minha caligrafia de Tutankamon, escrever o nome de algúem só pra realizar uma chamada????? Não é mais fácil abrir o discador e usar o T9 pra escolher o contato?? ... passou...vamos ao próximo item!

- Programas como o [Papyrus][] (o melhor programa de notas que eu vi até o momento) não podem usar o botão da caneta porque o sistema de gestos da Samsung não deixa.
Podem falar que o S Note é uma maravilha e tudo o mais. Eu o acho um programa bacana, mas o Papyrus tem duas sacadas ótimas: usar o botão da caneta pra selecionar objetos na tela e usar o dedo para apagar objetos (a caneta os desenha, lógico).

- Não existem gestos de múltiplas linhas. É uma só e pronto! (Nada de usar o sinal "+" pra abrir a calculadora, por exemplo.)

- Não posso escolher uma ação ao retirar ou inserir a caneta no dispositivo (seria bem útil pra trocar o teclado).

Isso foi o bastante pra me deixar maluco. Como um fabricante conseguiu ter uma diarréia em cima de um excelente produto é um mistério pra mim. E isso não é tudo, ainda tem outra listinha mais genérica:

- A resolução do aparelho é terrível. Três notificações na barra ocupam mais da metade da tela. Stevie Wonder consegue lê-las enquanto toca "I Just Called to Say I Love You" de trás pra frente.
- A quantidade de *aplicalixos* lá dentro é medonha. (Game Hub, Learning Hub, blá blá blá Hub, Papai Noel de Sutiã Hub e por aí vai.)
- Já disse que a interface gráfica é mais feia que o Marquito com hemorróida?

Depois dessa eu queria dar um fim nas cinco polegadas e meia de bloqueio criativo que eles criaram. Ainda bem que a solução para esses problemas é bem simples: faça [root][post-root] no aparelho e troque a ROM!

## E como faço pra ter root no aparelho?

Antes de mais nada, não me responsabilizo por ~~nenhuma merda que você faça~~ nenhum problema causado no seu aparelho caso faça algum procedimento de forma errada. Uma [pesquisa no Google][download-odin] te leva ao download do Odin. Ele é o mocinho que soca qualquer coisa no aparelho. O que iremos jogar lá é um pacote que fará o root do aparelho e mais outras coisinhas que iremos precisar pra trocar a ROM. O procedimento é bem simples:

#. Instale os drivers da Samsung (se não souber onde encontrar, pergunte ao [Google][google-samsung-drivers])
#. Extraia os arquivos (são três)
#. Desligue seu aparelho
#. Pressione os botões Liga/Desliga + Volume pra baixo + Botão do centro
#. Espere aparecer uma tela muito doida escrito "Downloading... Do not turn of target!!"
#. Plugue seu aparelho na USB
#. Abra o Odin e espere ele reconhecer seu aparelho (um retângulo colorido na linha **"ID:COM"**)
#. Clique no botão PDA e escolha o arquivo **"cwm6-root-note2.tar"** (é esse camarada a chave das algemas)
#. Clique em "Start" (não toque em mais nada)

![Antes de clicar no Start você vai ver mais ou menos isso aí.]({{ page.images }}/odin.png)

Prontinho! Seu brinquedo está rooteado e pronto pra receber uma ROM nova! O próximo passo é escolher a ROM que vai usar.

## E quais são as opções?

Basicamente, existem dois tipos de ROM pro Galaxy Note II: baseadas na ROM da Samsung e baseadas na ROM AOSP (Android Open Source Project). Usando a primeira, você terá a maioria dos problemas chatos que listei, mas terá alguma liberdade para modificar alguns aspectos do aparelho (principalmente os visuais). Na segunda, você não terá absolutamente nada que tenha relação com a ROM do fabricante \o/. Recomendo as seguintes ROMs:

- [Slim][] - AOSP
- [AllianceRom][] - baseada na ROM da Samsung

A AllianceRom vai te deixar customizar grande parte da interface (incluindo os ícones alienígenas no topo das notificações). Usei ela por um tempo e gostei do resultado (apesar de ter todos os problemas relativos ao uso da caneta, mas não posso levar isso em conta porque já era esperado). A parte chata é que ela vem com mais aplicativos do que sal no Mar Morto, mas é um bom começo caso você queira somente afrouxar as algemas.

A Slim vai fazer você esquecer de tudo de ruim que seu aparelho já foi. Ela vem limpinha e pronta pra você colocar o que bem quiser e fazer seu aparelho ser do jeito que você quiser. Como nem tudo é perfeito, você irá perder algumas coisas:

- Suporte ao cabo HDMI (pelo menos comigo não funcionou)
- Rádio FM
- Os excelentes <em>popups</em> que aparecem ao passar a caneta em cima de algumas coisas (nos eventos do calendário, por exemplo)
- A também excelente rolagem de tela com a caneta
- Suporte a ~~múltiplas~~ duas janelas (alguém aqui realmente usa isso em um celular?)

Os últimos itens são tranquilos por causa dos ganhos em outras partes do sistema no uso da caneta. O que pega mesmo são os dois primeiros, principalmente se você comprou o cabo (não compre em lojas brasileiras pois ele custa 10 dólares na Amazon, ao contrário dos 150 reais só pelo adaptador na terra que tem palmeiras onde canta o sabiá). A regra é clara: se você quer liberdade total, opte por uma ROM AOSP (e encare as consequências).

Uma amostra do visual da Slim:

![Tema super escuro!]({{ page.images }}/slim-dark.png)
![Customização da barra de notificações]({{ page.images }}/notification.png)

## E como eu coloco a ROM no aparelho?

Antes você precisa baixar a ROM, no caso das duas em questão, faça o seguinte:

### AllianceRom

Então baixe-a [aqui][download-alliance] e faça o procedimento de troca da ROM.

### Slim

Baixe-a [aqui][download-slim] e baixe também o [GApps][download-gapps-slim] (Google Apps), faça o procedimento com o arquivo da ROM sem o último passo e, depois, faça de novo (desta vez sem nenhum wipe) com o arquivo do GApps (agora pode fazer o último passo).

### Procedimento

#. Desligue o aparelho
#. Pressione os botões: Liga/Desliga + Volume pra cima + Botão do centro
#. Espere aparecer a tela com o nome do aparelho e solte o botão Liga/Desliga (mas mantenha os outros pressionados)
#. O ClockworkMod Recovery irá aparecer, você pode navegar pelos itens usando os botões de volume e selecionar com o botão Liga/Desliga
#. Escolha a opção "wipe data/factory reset"
#. Escolha a opção "install zip from sdcard" e, em seguida, "choose zip from sdcard"
#. Escolha o arquivo que você baixou
#. Depois escolha "reboot system now" para reiniciar o aparelho

## Tô com medo! O que é isso?

Esse é um recovery customizado, o recovery é responsável por efetuar as atualizações do dispositivo. O recovery de fábrica só faz atualizações certificadas para ele (não é que precisamos). A solução é jogar fora o recovery de fábrica e inserir um customizado. O ClockworkMod é um recovery anabolizado que, dentre outras coisas, permite a troca da ROM e qualquer tipo de atualização que você desejar.

Aqui vão alguns aplicativos que não te deixarão com saudades dos aplicativos de fábrica (os marcados com "*" não são totalmente funcionais na ROM da Samsung e derivadas):

- [Papyrus][]* - aplicativo de notas leve e rápido (ainda em beta, mas pode ser usado sem problemas)
- [Graffiti][] - teclado inspirado no bom e velho teclado dos PDAs
- [MyScript Stylus][] - teclado pra ser usado com a caneta, tem um excelente reconhecimento de escrita
- [GMD Spen Control][]* - controle de gestos com a caneta que deixa o da Samsung no chinelo

## Tá, e os comportamentos? Quero que abra o bloco de notas na ligação igual acontece na ROM da Samsung!

O interessante é que isso é possível, mas não com o Mini S Note (que, por sinal, foi uma ótima sacada da Samsung - mas foi mal implementada pois não te permite customizar o aplicativo a ser aberto). O salvador da pátria é o nosso bom amigo (e de cara nova) [Tasker][post-tasker].

O começo de tudo é criar duas tarefas nele: uma para ser ativada ao retirar a caneta e outra ao inserí-la. Eu faço o seguinte:

### Ao retirar a caneta

#. Trocar o teclado para o MyScript Stylus (parei de usar o Graffiti depois que usei esse)
#. Mudar o valor da variável %SPEN para "on" (lembre-se que as variáveis em maiúscula são globais)

![]({{ page.images }}/tasker-spen-out.png)

### Ao inserir a caneta

#. Trocar o teclado para o padrão
#. Limpar o valor da variável %SPEN

![]({{ page.images }}/tasker-spen-in.png)

Com essas duas tarefas prontas, atribua um ícone a elas (o Tasker não nos deixa ligar uma tarefa a um atalho se ela não tiver um ícone) e as coloque para serem ativadas no GMD SPen Control (use o atalho Task Shortcut pra selecionar a tarefa do Tasker) nos seus respectivos locais.

![]({{ page.images }}/spen-trigger.png)

Com isso eu posso trocar o teclado sem precisar ir no menu e ainda posso ativar funções legais com a variável do Tasker.

## Variável do Tasker? Não entendi!

Ela serve para o nosso perfil matador. Crie um perfil no Tasker com o contexto de ligação (State -> Phone -> Call -> Type "Any") e adicione mais um contexto para valor de variável (State -> Variables -> Variable Value -> Op "Matches") e use "%SPEN" com valor "on". Ligue esse perfil com uma tarefa para abrir o Papyrus e pronto! Se tirar a caneta na ligação, a variável "%SPEN" irá ativar o perfil e o Papyrus abrirá. Para fechá-lo na ligação, faça o mesmo procedimento usando o contexto adicional como variável sem valor(Op "Isn't Set") e abra o aplicativo do telefone (é mais seguro do que matar o processo do Papyrus).

Essa variável servirá como um indicativo para você usar no Tasker quando a caneta for removida ou inserida. Isso abre um leque de possibilidades muito interessante e pode ser usado independente da ROM que você escolher (mesmo na de fábrica).

![]({{ page.images }}/spen-in-at-call.png)
![]({{ page.images }}/spen-out-at-call.png)

## Ah! Mas eu adoro o recurso de desligar o aparelho se você não estiver olhando a tela

Se você pensar bem, é um recurso questionável. Eu não quero cair no sono segurando meu brinquedo que custa o preço de um notebook mediano (igual aparece na propaganda)! Se acontecer isso, a última coisa que eu quero é que ele desligue a tela, seria melhor se ele saísse voando e pousasse na mesa da sala. O bacana é que esse recurso pode ser uma mão na roda em aplicativos que não configuram a tela para ficar sempre ligada. O problema é quando você está com os olhos na parte de baixo dela: a câmera não consegue detectar seus olhos e o aparelho desliga a tela. A solução: Tasker nele!

Crie um perfil com os aplicativos que deseja (contexto Application) ligado a uma tarefa que ajuste "Display Timeout" para um número grande e pronto!

## É muita coisa só pra driblar a ROM do fabricante, vale a pena tudo isso?

Vale! Se, e somente se, você for uma pessoa que gosta de fuçar nos seus brinquedinhos tecnológicos.

[post-root]: <{% post_url /androidoctor/2013-01-24-root-o-papel-higienico-eletronico-para-o-seu-android %}>
[post-tasker]: <{% post_url /androidoctor/2013-03-19-faca-valer-o-smart-do-seu-smartphone %}>

[papyrus]: <https://play.google.com/store/apps/details?id=com.steadfastinnovation.android.projectpapyrus>
[graffiti]: <https://play.google.com/store/apps/details?id=com.access_company.graffiti>
[myscript stylus]: <https://play.google.com/store/apps/details?id=com.visionobjects.stylusmobile.v3_2_store>
[gmd spen control]: <https://play.google.com/store/apps/details?id=com.gmd.spencontrol>

[download-odin]: <lmgtfy.com/?q=samsung+odin+samsung+download>
[google-samsung-drivers]: <lmgtfy.com/?q=samsung+usb+driver>

[slim]: <http://www.slimroms.net>
[download-slim]: <http://www.slimroms.net/index.php/downloads/all/viewcategory/414-n7100>
[download-gapps-slim]: <http://www.slimroms.net/index.php/downloads/all/viewcategory/383-addons>
[alliancerom]: <http://www.alliance-rom.com/community>
[download-alliance]: <http://sourceforge.net/projects/comnam90dev/files/ROMs/N7100/AllianceROM_N7100_DMB5_v2.zip/download>