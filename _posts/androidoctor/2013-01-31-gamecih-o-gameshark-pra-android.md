---
layout: post
title:  "GameCIH: O GameShark pra Android"
category: androidoctor
language: pt_BR
tags:
  - android
  - gamecih
  - root
  - jogos
  - hack
alerts:
  - danger
  - root-required
images: /assets/images/androidoctor/gamecih
---

Você acaba de baixar aquele joguinho, se vicia mais do que o povo da Crackolândia, junta um monte de
grana pra comprar coisinhas e percebe que elas são muito mais caras do que você imaginava. O melhor
de tudo é ver que o jogo vende dinheiro a preço de adamantium.

O que mais me mata de raiva é que isso acontece com frequência em jogos pagos, ou seja, eu acabo de
desembolsar uma graninha no jogo e ainda vou ter que trocar dinheiros de verdade por dinheiros de
mentira? 

Mas nem tudo está perdido, meu caro padawan, existe um programinha bem bacana para mudarmos alguns
valores do jogo (dinheiro, vidas, life e o que mais você conseguir encontrar). Ele tira boa parte da
graça dos jogos, mas, se usado nas horas certas, vai te poupar algumas horas passando de fases
chatas só pra comprar aquele item legal que custa metade do seu rim esquerdo.

## Duvido!

Veja você mesmo:

![]({{ page.images }}/game-cih-4.png)

## Eu quero, eu quero, eu quero!!

Gostou da ideia, não foi? Mas antes você precisa ter um [celular rooteado][post-root] e baixar o
[Game CIH][gamecih].

Uma vez aberto e concedido o acesso de superusuário, você pode abrir seu joguinho e verá um treco
cinza no canto superior esquerdo. Basta meter o dedão lá e na lupinha que aparecer. Irão aparecer
três opções, escolha "Input Number" e coloque a quantidade atual do que você quer mudar e o Game CIH
irá procurar tudo o que tiver esse valor.

![]({{ page.images }}/game-cih-1.png)

Geralmente ele vai achar uma porrada de coisa com o valor que você escolheu, então, você precisa
voltar ao jogo e achar uma forma de modificar o valor que escolheu. Vá passar de umas fases, pegar
grana ou qualquer coisa que altere esse valor. Depois volte ao Game CIH e utilize uma das opções
abaixo:

- **"="** se o valor não mudar
- **"!"** se o valor mudou
- **"+"** se o valor aumentou
- **"-"** se o valor diminuiu
- ir em "Input Number" caso queira colocar o valor exato

![]({{ page.images }}/game-cih-2.png)

Repita o procedimento acima até ter apenas uma variável na lista ou um número bom pra tentar a sorte.
Enfie o dedo na variável para alterar o valor. Em alguns casos, você precisará fazer alguma coisa
que altere novamente o valor para ver o resultado na tela.

![]({{ page.images }}/game-cih-3.png)

Depois de tudo certo, você pode ir no menu do Game CIH e desativá-lo para continuar jogando sem o
cacareco cinza na tela (seu TOC agradece).

![]({{ page.images }}/game-cih-4.png)

Pronto! Agora vá comprar as coisas do jogo e se sentir o Michael Jackson numa loja de brinquedos.

## Olha, quando a esmola é demais...

Verdade! Agora vem a má notícia: não é tão fácil usar o Game CIH porque a estratégia varia e alguns
jogos possuem alguns artifícios pra detectar se houve alteração nos valores. No Need For Speed eu
consegui aumentar a grana de forma fácil, no Trial Extreme precisei alterar as moedas na fase usando
meia dúzia de variáveis e no Jetpack Joyride... bem... não adianta nem fazer macumba porque o jogo é
tão ruim que apaga qualquer coisa que você comprar, mesmo que você nunca tenha usado o Game CIH nele.
Ah! Prepare-se, também, pra travar seus jogos (e até o celular) enquanto tenta modificar alguma
coisa. (Depois não diga que eu não avisei, ein!)

Eu gosto de usar o Game CIH somente nos casos onde os upgrades são muito mais caros do que a grana
que você vai conseguindo no decorrer do jogo. O Mini Motor Racing é um bom exemplo disso. O jogo é
excelente, mas você ganha mais ou menos 300 dinheiros por corrida e precisa de uns 50 mil pra fazer
um upgrade decente no seu carro. Faça as contas pra ver quantas corridas vai precisar ganhar pra
poder colocar seu carro em condições de ganhar o campeonato (que tem mais ou menos 100 corridas). E
o melhor: você vai precisar de pelo menos outro carro. O jeito é socar dinheiro na conta do
desenvolvedor, mesmo depois de já ter pago pelo jogo.

## Ah, não! Meu jogo é assim e ninguém vai ficar hackeando ele!

Caso você seja um desenvolvedor e queira proteger seu jogo de modificações externas, existem alguns
truques:

- Utilizar mais de uma variável para armazenar o valor
- Utilizar uma variável de controle para saber se o valor foi alterado de fora do jogo
- Utilizar uma fórmula para calcular o valor
- Utilizar um conjunto de variáveis com regras definidas ("a" é menor que "b" e é duas vezes "c",
  por exemplo)
- **Parar de querer me fazer de idiota e vender o jogo pelo preço que ele vale**

Esconder o preço real do jogo na forma de vendas dentro dele (os *in-app purchases*) é uma péssima
ideia (claro que falando na posição do jogador e não da conta bancária de quem desenvolve),
principalmente quando o jogo já é pago. Eu acho legal ter versões com menos fases ou menos
funcionalidades de graça e a versão completa paga. É lógico que os desenvolvedores e as empresas
precisam lucrar com o jogo, ninguém perde tanto tempo produzindo um game por iluminação divina.
Só acho que estão cobrando da forma errada.

## Calma, rapaz! Tira o ódio do coração!

Mas isso é um saco! Eu pago pelo jogo e ainda tenho que pagar pra poder jogar direito?!?!? Não quero
ficar pagando pra ter algo que eu deveria ter por mérito. Não sou contra os *in-app purchases*, sou
contra as gambiarras usadas pra mascarar o preço do jogo.

Hoje os beneficiados não são os melhores jogadores, são os que tem mais grana pra torrar nos jogos.

[post-root]: </androidoctor/2013/01/24/root-o-papel-higienico-eletronico-para-o-seu-android/>
[gamecih]: <http://www.cih.com.tw/gamecih.html>
