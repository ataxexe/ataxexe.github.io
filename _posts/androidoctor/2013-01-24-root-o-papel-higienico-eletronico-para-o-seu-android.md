---
layout: post
title:  "Root: o papel higiênico eletrônico para o seu Android"
category: androidoctor
language: pt_BR
tags:
  - android
  - root
images: /assets/images/androidoctor/root-android
---

A primeira coisa que eu faço depois de testar meus celulares é fazer o tal do root. "Rootear" um
celular é um termo comum para alguns donos do robozinho, mas não é conhecido por todos e tem muita
coisa envolvida por trás. Por isso eu pretendo explicar neste post um pouco mais sobre as vantagens
e as entrelinhas do processo.

## E o que raios significa "rootear"?

Para quem não sabe, a base do Android é o sistema operacional Linux. Nesse sistema, existe um usuário
com permissão para executar todos os comandos e ler todos os arquivos. Esse usuário é o root (podemos
chamá-lo de superusuário) e, por padrão, não conseguimos usá-lo em nossos celulares. Rootear um
celular é, basicamente, conseguir permissão de superusuário (algo semelhante a pentelhar o pessoal
do suporte pra conseguir privilégios de Administrador).

Bom, você já deve ter suspeitado desde o princípio que, ao rootear seu aparelho, a garantia vai
embora (junto com as amarras dos fabricantes), então, se você faz questão da garantia do seu celular,
nem pense em rootear ele.

## Tá, mas pra quê eu vou querer privilégios de superusuário?

Boa pergunta! Com ela você praticamente terá super poderes e poderá fazer várias coisas legais, como:

* Remover as propagandas
* Fazer backups de aplicativos e seus dados
* Melhorar o desempenho do sistema
* Otimizar o consumo de bateria
* Fazer overclock no processador do celular (e ficar louco tentando entender o porquê do Bluetooth
  não funcionar depois disso)
* Remover as porcarias que as operadoras instalam (adorou essa, não foi?)
* Trocar a ROM (e ganhar a tão sonhada liberdade... aiai)

Esses são apenas pouquíssimos exemplos do que fazer com seu celular rooteado. Pretendo abordar um
monte deles em posts futuros, então, não se preocupe ainda com alguns termos. Apenas tenha em mente
que você pode fazer o que bem entender com privlégios de superusuário (inclusive transformar seu
celular em um moderno peso de papel se fizer algo errado).

## Se é tão legal assim, por quê os celulares não vem com o acesso root desbloqueado?

Por segurança. O modelo de segurança do Android pode ser facilmente quebrado com os privilégios de
superusuário e um aplicativo mal intencionado pode facilmente inutilizar por completo seu aparelho.
Do outro lado da moeda, temos programas fantásticos que precisam quebrar esse modelo de segurança
pra prover funcionalidades extras ao sistema (como backups de aplicativos, por exemplo).

Na verdade, o que é bloqueado mesmo é o bootloader do aparelho. Seu smartphone é como um HD, possui
algumas partições que guardam informações diferentes para o sistema funcionar. Pense no bootloader
como sendo um ponto de segurança para que não seja possível modificar as partições vitais do sistema.
Com o bootloader travado, apenas alterações assinadas digitalmente e verificadas podem ser instaladas
no aparelho.

Para obtermos privilégios de superusuário, precisamos de um programinha chamado "su", que precisa
ficar em uma partição acessível somente com o bootloader destravado ou explorando  brechas no
sistema. Em aparelhos Google (a famosa linha Nexus), podemos destravar o bootloader com um comando
mais fácil do que cair de skate:

    $ fastboot oem unlock
  
Com o bootloader destravado, o processo de root é moleza e você estará mais próximo de entupir seu
celular com funcionalidades legais do que se fosse depender de brechas no sistema.

## Mas o Android não evoluiu muito e já vem com muita coisa boa?

É fato que o Google tem adicionado funcionalidades que antes precisavam do root (VPN, captura de
tela e compartilhamento de internet, por exemplo), mas ainda precisamos do root pra fazer coisas
legais e muito úteis (trocar o teclado dependendo do programa aberto ou ligar e desligar o GPS por
meio de aplicativos de automação, por exemplo). Outro ponto é o caso das modificações dos fabricantes
pois ainda precisamos remover as porcarias que eles colocam e isso requer privilégios de superusuário.

Aaaahhh... as modificações dos fabricantes... como eu adoro ter raiva da interface telettubiana da
Samsung jogando fora todos os dólares investidos pelo Google na nova interface do Android 4. E fica
ainda pior. O Galaxy Note II, por exemplo, tem um software tão lixo de mapeamento de gestos da caneta
que, pra você discar um número com os atalhos super maneiros da Samsung, precisa:


1. segurar o botão da caneta
2. desenhar uma reta pra cima
3. esperar abrir o painel de comandos
4. escrever "#" seguido do nome do contato a discar
5. torcer para que o celular reconheça sua caligrafia egípcia

Não tem como criar um gesto simples pra discar para um contato que você sempre liga. Com o celular
rooteado, você pode limpar essa caquinha e colocar o excelente GMD SPen Control. Com ele, basta
apenas você:

1. segurar o botão da caneta
2. desenhar o gesto que mapeou para o contato

Simples assim.

Ah! Não podemos esquecer das operadoras e seus programas tão úteis quanto água de salsicha em lata.
Apague todas as tranqueiras delas sem medo de ser feliz!

## Legal, mas, se eu rootear meu aparelho, todos os aplicativos terão acesso root quando quiserem?

Não! Uma vez que seu celular esteja anabolizado, **você** irá escolher quais aplicativos terão os
privilégios por meio de um outro aplicativo que irá pedir a autorização. Dessa forma, você autoriza
apenas os aplicativos confiáveis. (Nada de autorizar joguinhos, ein! Já vi um bocado desses pedindo
root.)

Abaixo você pode ver o painel principal do SuperSU, um dos programas mais usados pra isso:

![SuperSU]({{ page.images }}/supersu.png)

E aqui ele pedindo autorização de superusuário para um aplicativo:

![SuperSU pedindo autorização]({{ page.images }}/supersu-notification.png)

Vale lembrar que ainda assim seu celular corre riscos. Aplicativos maliciosos podem aproveitar
brechas do sistema para conseguir acesso root sem que você tenha conhecimento. O conselho aqui é
simples: **não** instale aplicativos de fontes duvidosas. Lembre-se do que sua mãe dizia: "não fale
com estranhos".

## Tudo bem, vou ter cuidado e quero rootear meu Android. Por onde eu começo?

Depende do seu celular. Os aparelhos da linha Nexus são destravados e permitem fazer o processo
tranquilamente, mas a grande maioria precisa explorar uma brecha no sistema. O trabalho difícil fica
com os malucos que descobrem essas brechas e criam maneiras automatizadas de "quebrar" o sistema.

O melhor jeito pra descobrir uma forma de fazer o procedimento é googlando pelo modelo do seu celular
mais a palavra "root" (ex: [galaxy s3 root][googlando]) e seguir algum tutorial.

## Poxa, depois disso tudo você não vai mostrar como rootear meu aparelho?

Infelizmente não. Existem muitos aparelhos e se eu for cobrir todos aqui não terei tempo. Mas você
pode usar o Google a seu favor e procurar o método. Hoje a maioria deles não envolve mais do que
instalar o driver do seu celular (se você já não tiver instalado) e usar um software (Odin, por
exemplo) para colocar no celular um arquivo que fará o trabalho sujo pra você.

Nos próximos posts irei falar sobre alguns aplicativos que só funcionam (ou funcionam melhor) com
privilégios de superusuário e formas de rootear alguns celulares que eu já usei, então, você pode
esperar um pouco para ver o que te espera e, assim, decidir se vale a pena fazer o procedimento.

[googlando]: <http://lmgtfy.com/?q=galaxy+s3+root>
