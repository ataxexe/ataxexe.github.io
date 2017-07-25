---
layout: post
title: "Xposed: a forma genial de se modificar uma ROM"
category: androidoctor
language: pt_BR
tags: 
  - android
  - root
  - xposed
  - customização
alerts:
  - danger
  - root-required
---

Trocar a ROM de um Android é muito bacana, apesar de não ser trivial. É muito bom ver várias funcionalidades novas e nativas no sistema e, principalmente, a possibilidade de customizar a interface (mudar algumas cores, ícones e fundos, por exemplo). O problema é que alguns aparelhos não possuem ROMs customizadas e, outro ainda maior, é o trabalho de socar uma ROM nova no aparelho só pra poder trocar o ícone da bateria. Eis, então, que surge um herói chamado [Xposed][].

A grande sacada do Xposed é a de criar pontos de interceptação no sistema. Ele foi feito de forma a permitir que um desenvolvedor possa programar o dispositivo pra fazer qualquer coisa antes e/ou depois da execução de um método qualquer de um aplicativo qualquer (inclusive de sistema). O Xposed, então, intercepta a chamada ao método e delega o processamento para o componente criado. Isso parece ser meio esquisito, mas excelentes customizações podem ser feitas com essa técnica. (Nem preciso mencionar que, pra tudo isso acontecer, seu Android deve estar [rooteado][post-root], né?)

Um exemplo muitíssimo interessante é o do módulo [AppSettings][]. Ele permite alterar diversas opções genéricas de uma aplicação. Podemos colocar somente as aplicações para carregar com densidade diferente (inclusive o *Lock Screen*), fontes e comportamento de tela diferente e não cagar o resto do sistema. Outro módulo muito interessante é o [GravityBox][]. Ele permite que várias funcionalidades presentes apenas em ROMs customizadas sejam aplicadas à qualquer ROM, desde que ela seja o mais próximo possível da ROM AOSP (o Android puro), ou seja, nada de usar naquelas porcarias da Samsung.

Porcaria mesmo, meus dois Galaxy Note II tiveram fins trágicos de hardware logo depois da garantia terminar (e, pesquisando, minha esposa encontrou diversas outras historinhas parecidas - mas acho que isso é assunto pra outro post, ou um tribunal). O mais legal é que a "excelente" atendente da única assistência técnica de Brasília foi mais idiota do que o vendedor que me atendeu na loja da Samsung.

A mudança na desidade é genial, com ela, pode-se otimizar a tela do aparelho sem causar quebras na interface geral do sistema. O Moto X, por exemplo, quebra a interface de notificações inteligentes quando a densidade geral é alterada. Usando o Xposed com o AppSettings, somente os aplicativos escolhidos usarão densidades diferentes.

O processo de instalação do Xposed é bem simples:

1. [Baixe][xposed-download] o aplicativo principal do Xposed e abra-o
2. Em **Framework**, meta o dedo no botão *Install/Update*
3. Antes de reiniciar, baixe os módulos que desejar em **Download**
4. Ative os módulos em **Modules**
5. Reinicie o seu Android

Para configurar os módulos, basta abrir o aplicativo correspondente ou ir em **Modules**, no Xposed, e meter o dedão no nome do módulo.

## Dica para os usuários do Moto X

O Moto X tem uma peculiaridade: mesmo rooteado ele não permite modificar arquivos de sistema (mesmo remontando a partição como **r/w**). Nesse caso, você deve, antes de seguir os passos acima, reiniciar o celular no modo **recovery**. Esse modo não irá abrir o **recovery** do aparelho, irá subir o Android com permissão para que os arquivos de sistema sejam alterados. Dessa forma você consegue instalar o Xposed no Moto X sem problemas (isso vale para a atualização também, só não para os módulos, já que são aplicativos normais como quaisquer outros).

[AppSettings]: <http://repo.xposed.info/module/de.robv.android.xposed.mods.appsettings>
[GravityBox]: <http://repo.xposed.info/module/com.ceco.gm2.gravitybox>
[Xposed]: <http://forum.xda-developers.com/showthread.php?t=1574401>
[xposed-download]: <http://repo.xposed.info/module/de.robv.android.xposed.installer>
[post-root]: </androidoctor/2013/01/24/root-o-papel-higienico-eletronico-para-o-seu-android/>

