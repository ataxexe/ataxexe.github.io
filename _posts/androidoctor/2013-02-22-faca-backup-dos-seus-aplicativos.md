---
layout: post
title:  "Faça backup dos seus aplicativos"
category: androidoctor
language: pt_BR
tags:
  - android
  - backup
  - root
alerts:
  - root-required
images: /assets/images/androidoctor/backup
---

Uma coisa é bem certa sobre nossa parafernália digital: **sempre** devemos fazer backups. E isso
vale para os nossos Androids. Podemos fazer backups da agenda, dos contatos, tarefas e mais um monte
de outras coisas pelo próprio Android usando a sincronização de contas. Alguns aplicativos também
suportam sincronização dos dados na nuvem e outros exportam preferências pro cartão de memória. Até
aí tudo bem... os problemas são aqueles aplicativos que não possuem formas de backup.

## E qual é a solução pra isso?

Boa pergunta! A resposta está no famoso [root][post-root]. Com o aparelho rooteado, temos acesso as
áreas que armazenam os dados dos aplicativos e o backup pode ser feito. Para agilizar as coisas,
temos o excelente [Titanium Backup][titanium_backup]. Esse camarada permite que façamos backup de
qualquer aplicativo do celular e ainda faz o backup do aplicativo em si (e muitas vezes é até melhor
do que os meios de backup dos próprios aplicativos).

Aí vai a cara do guri:
![Tela inicial]({{ page.images }}/tb-main.png)
Tela inicial, ela mostra todos os aplicativos (os em vermelho são aplicativos do sistema).

![Opções de backup]({{ page.images }}/tb-bkp.png)
Aqui você encontra as opções possíveis de backup e restauração.

O interessante é que o Titanium Backup permite apagar os dados do aplicativo (aquela opção *Wipe
Data* lá em cima) e restaurar apenas os dados (útil quando você tem uma versão mais nova de um
aplicativo e deseja restaurar os dados de quando usava uma versão anterior). Vou mostrar algumas
coisinhas interessantes que podemos fazer com o backup dele.

### Voltar no tempo (do jogo, claro)

Muitas vezes eu não sei se algum item que vou comprar (com o dinheiro do jogo, claro) é bom. Pra não
ficar arrependido de ter arrumado um lixo à custa de um tempo gasto no jogo, eu:

1. salvo o jogo
1. faço o backup dele,
1. testo as bugigangas,
1. restauro o backup se o arrependimento ameaçar se tornar uma cólera assassina.

Simples assim! E sem usar um mísero capacitor de fluxo!

### Restaurar aplicativos após a restauração do dispositivo

Restaurar um aparelho é um porre! Temos que instalar tudo novamente e configurar um monte de coisas.
O Titanium Backup suporta processamento em lote, ou seja, você pode restaurar seu Android e ativar
um processamento em lote no Titanium Backup pra reinstalar todos os aplicativos com seus respectivos
dados. Uma maravilha!

![]({{ page.images }}/uhu.gif)
Uhuuuuuuuuuuu! Quem é o papai agora, ein?

### Automatizar os backups

Manter os backups em dia é uma tarefa árdua sem um agendamento de tarefas. Nosso amigo também pode
agendar tarefas, automatizando os backups de aplicativos novos e com novas versões. Dessa forma você
não corre o risco de ter que restaurar seu aparelho e perder alguns dados (ou algumas horinhas de
jogo).

![]({{ page.images }}/tb-schedule.png)
Essa é uma das melhores funcionalidades do Titanium Backup.

## Lembrei que meu celular não é rooteado, tem outro jeito?

Não! E é por um bom motivo: imagine que qualquer aplicativo tenha acesso aos dados de outros
aplicativos. Viu o tamanho da encrenca? Por isso esse procedimento requer privilégios de
superusuário.

![]({{ page.images }}/hum.gif)
Pare de se lamentar e vá logo rootear seu aparelho!

[post-root]: <{% post_url /androidoctor/2013-01-24-root-o-papel-higienico-eletronico-para-o-seu-android %}>
[titanium_backup]: https://play.google.com/store/apps/details?id=com.keramidas.TitaniumBackup
