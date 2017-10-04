---
layout: post
title:  "Diga não às arquiteturas de referência"
category: devoops
language: pt_BR
tags:
  - arquitetura
  - juquinha
---

Sempre que ouço o termo **Arquitetura de Referência**, sou contagiado por uma cólera rabugenta. Esse termo maléfico é a causa do fracasso de vários projetos que eu já vi e, neste post, pretendo mostrar como uma arquitetura de referência é tão útil quanto um alçapão num barco.

## Especulando as origens

De maneira bem simples e direta, a arquitetura de um sistema é responsável pelos requisitos não-funcionais dele. A partir disso já dá pra se ter uma ideia de o quão perigoso pode ser adotar uma arquitetura de referência. Adotá-la é afirmar que os requisitos não-funcionais serão sempre os mesmos. Isso combina bem com um outro termo terrível: **Fábrica de Software**.

Fábrica de Software é algo paradoxal e insustentável da forma como é aplicada hoje. Uma fábrica é uma linha de montagem onde o produto final é sempre o mesmo. Dois softwares nunca serão iguais e, mesmo que o sejam em 99%, o 1% restante pode ser o bastante para invalidar uma arquitetura. Eu sempre acreditei que o termo **Arquitetura de Referência** tenha surgido em uma **Fábrica de Software**.

## A questão dos padrões

Quem defende uma arquitetura de referência costuma enaltecer a padronização das coisas. O problema é que uma arquitetura de referência não padroniza nada, ela **engessa**. Uma coisa é você ter componentes, diretrizes e padrões e outra, completamente diferente, é ter uma base resposável por resolver os requisitos não-funcionais que ainda nem são conhecidos. É quase o mesmo que dar um patinete para um saci subir uma rampa só porque o Juquinha conseguiu subí-la assim.

Existem, ainda, as *pseudo-arquiteturas de referência* (praticamente o bizarro do bizarro), que nada mais são do que uma lista de frameworks de adoção obrigatória para qualquer projeto. A regra se aplica novamente aqui: não é porque um framework deu certo em um projeto que dará certo em outro.

## Algumas coisas que parecem não ter importância

Além do desenvolvimento em si, existe um ponto vital que pode arruinar seu projeto: escalabilidade. Por vezes um projeto necessita de uma abordagem diferente para o mesmo problema somente porque desta vez são esperados milhares de usuários a mais e usar uma arquitetura de referência pode inviabilizar essa nova abordagem, ecoando pelos cantos da organização uma perguntinha bem conhecida:

> No outro projeto funcionou muito bem, por quê não funciona aqui?

A resposta é simples: porque lá o barco não tinha alçapão.

Parece besteira, mas eu já vi isso acontecer (e não foi mais de uma vez). A falta de um arquiteto (ou a presença de um pseudo-arquiteto) leva a problemas dessa natureza.

## Evolução natural?

Já vi um argumento muito bonito, dizendo que aquilo foi uma evolução natural e *blá blá blá*. Uma evolução que te amarra é, no mínimo, um retrocesso. Certa vez pude acompanhar um sistema cuja "evolução" da infraestrutura gerou uma engine de processamento parecida com o JSP e tinha até seu próprio framework de *Collections*! Não preciso nem dizer que o sistema dava mais problemas do que resultados, não é?

## Conclusão

De maneira geral, arquiteturas de referência são uma péssima ideia porque:

1. Não existem projetos iguais com as mesmas características, mesmo que sejam da mesma área.
1. Engessar as coisas é ignorar a evolução tecnológica, pois aquilo que é igual em dois projetos
   pode ser melhorado ou feito de outra forma para suprir outras necessidades.

Não existe receita para construir sistemas, o que deve existir são bons arquitetos capazes de criar uma arquitetura que se adeque ao sistema e não criar um sistema que se adeque a uma arquitetura. Uma arquitetura de referência é uma solução em busca de um problema, por isso, diga não às drogas!
