---
layout: post
title:  "Comunicação não-verbal"
category: androidoctor
language: pt_BR
tags:
  - android
  - gestos
  - root
  - gmd gesture control
---

A comunicação não-verbal é responsável por 55% da mensagem que transmitimos. As palavras são responsáveis por apenas 7%. Isso pode não ser o motivo pelo qual seu smartphone executa os comandos de voz tão bem quanto o cachorro do vizinho, o ponto é: se os gestos são responsáveis por mais informação do que as palavras, por quê não podemos aplicar esse conceito aos nossos smartphones?

Controles por gestos não são novidade. Há pelo menos cinco anos eu utilizo gestos no meu navegador. O interessante é que os dispositivos Android começaram a fazer bom uso de gestos, sendo que o campeão, na minha opinião (claro, o blog é meu, né), é o [GMD GestureControl][]. Com ele você tem liberdade pra definir os gestos e a quantidade de dedos para cada gesto (se couberem em sua tela, claro). O único pré-requisito (além de dinheiro no bolso) é ter um aparelho [rooteado][post-root].

## E por quê eu gastaria meu rico dinheirinho nele?

Como você deve ter notado, ele custa uma graninha considerável, digna de aplicativos que valem muito a pena. Felizmente, o GMD GestureControl vale cada centavo e abre um mundo de possibilidades caso seu aparelho tenha o [Tasker][post-tasker] instalado.

Uma das coisas mais legais que o **GMD GestureControl** possui é um painel de aplicativos que pode ser ativado por gestos. Você pode, por exemplo, pinçar a tela com quatro dedos e um painel com os aplicativos que você definir aparece na tela. Bem prático, não é?

## Mas pra fazer isso precisa do Tasker? Credo! Vou jogar Fazendinha...

Não, não! Ainda não cheguei na parte bacana. Se seu Android tem o Tasker instalado, você pode criar gestos que atuem de forma mais ampla no sistema usando as *"Task Cuts"* dele. Funciona assim: quando você define uma tarefa no Tasker, ela pode ser acessada via um atalho chamado *"Task Shortcut"*. Algumas dicas de truques que eu utilizo no meu Android:

- Pinça com quatro dedos para ir à tela inicial.
- Expandir com quatro dedos para abrir a câmera.
- Expandir com cinco dedos para abrir os aplicativos recentes.
- Deslizar para a esquerda ou direita com quatro dedos para alternar entre os aplicativos abertos.
- Deslizar para cima com três dedos na parte inferior do aparelho para abrir um painel de widgets (o painel é exclusivo da excelente [SlimBean][]).

### Bônus: Dica do cofrinho!

Você pode usar os gestos horário e anti-horário para bloquear seu aparelho de forma mais divertida. Eu, por exemplo, cadastrei uma tarefa no Tasker para bloquear o aparelho e outra para desbloqueá-lo. No GMD GestureControl, utilizei um gesto anti-horário com cinco dedos para ativar a tarefa de bloqueio e um gesto horário com cinco dedos para ativar o gesto de desbloqueio. Como eu customizei minha tela de desbloqueio para esconder o ícone que desbloqueia o aparelho, a interface ficou mais limpa e, de quebra, o aparelho ficou mais legal!

## Legal!!! Me ensina direitinho a fazer?

Hummm.....agora não. (Sim! Eu sou mal... muito mal!)

## Por que não?

O meu intuito com o blog não é de dar uma receita de bolo pronta pra você rechear seus aparelho, é mostrar novas ideias, algumas formas diferentes de fazer uso do seu querido Android. Por isso eu não irei revelar como algumas ideias são aplicadas justamente para motivar você a fuçar no seu brinquedinho e aprender como as coisas funcionam nele. Futuramente, poderei mostrar alguns truques mais malucos, mas, por ora, posso dizer que usei o [WidgetLocker][] com um tema que deixa os slides de desbloqueio invisíveis e uma ROM customizada para conseguir o efeito que queria. O resto vou deixar com você!

[post-root]: <{% post_url /androidoctor/2013-01-24-root-o-papel-higienico-eletronico-para-o-seu-android %}>
[post-tasker]: <{% post_url /androidoctor/2013-03-19-faca-valer-o-smart-do-seu-smartphone %}>

[gmd gesturecontrol]: <https://play.google.com/store/apps/details?id=com.goodmooddroid.gesturecontrol>
[widgetlocker]: <https://play.google.com/store/apps/details?id=com.teslacoilsw.widgetlocker>

[slim bean]: <http://www.slimroms.net>
