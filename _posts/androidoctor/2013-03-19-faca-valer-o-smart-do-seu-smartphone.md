---
layout: post
title: "Faça valer o \"smart\" do seu smartphone"
category: androidoctor
language: pt_BR
tags:
  - android
  - tasker
  - root
  - secure settings
  - automação
images: /assets/images/androidoctor/tasker
---

Você já se deparou em alguma situação que te fez pensar "Nossa! Queria que meu smartphone fizesse
isso!"? As situações podem ser um berro do celular "Tão te ligando!" enquanto você ~~dá aquela
cagada~~ realiza trabalhos de natureza pessoal, ligar o GPS quando abrir o Google Maps, soar um
alarme caso vocẽ esteja no trabalho para te lembrar de bater o ponto, enfim, o seu smartphone pode
realmente levar o nome "smart" a sério caso vocẽ o automatize ao extremo.

## Mas eu não faço nada disso, vou sair desse blog chato...

Palma, palma, palma! Não priemos cânico! Separei uma lista de coisas legais que nossos celulares
poderiam fazer:

* Rotacionar a tela apenas em determinados aplicativos
* Ativar o silencioso ao colocar o celular de cabeça pra baixo
* Trocar o teclado dependendo do aplicativo
* Ligar o GPS antes de abrir um aplicativo de mapas e desligá-lo ao sair

## Gostei! E como eu faço isso?

A solução está no maravilhoso (e feio) [Tasker][]! Por míseros 12 dinheiros (foi mais ou menos o que
paguei na época) você terá automação total do seu aparelho. Uma passada rápida sobre como o Tasker
funciona:

1. Um perfil é ativado
1. A tarefa para o perfil é acionada
1. Uma tarefa de saída é acionada ao sair do perfil

O perfil é qualquer coisa que possa ser capturada do celular: uma ligação, email recebido, hora do
dia, aplicativo aberto, fone de ouvido plugado e mais uma porrada de outras. A tarefa é um punhado
de ações que podem, inclusive ter operadores lógicos e condicionais.

## Você disse feio?

Sim... o aplicativo é feio que dói:

![Lista de Perfis]({{ page.images }}/tasker-profiles.png)
  
![Lista de Tarefas]({{ page.images }}/tasker-tasks.png)
  
![Definição de uma Tarefa]({{ page.images }}/tasker-task.png)
  
![Variáveis]({{ page.images }}/tasker-variables.png)

UPDATE: O desenvolvedor acabou de atualizar o Tasker. A interface está maravilhosa!! (E eu estou com
preguiça de refazer os screenshots.)

## É feio mesmo... se funcionar, tá valendo!

Tá, eu peguei pesado... em defesa do Tasker, posso dizer que é um aplicativo muito antigo (da época
do Android 1.6) e, na época em que foi lançado, a interface gráfica do Android era mais feia que o
Tibia. Dito isso, o Tasker era lindo de morrer.

## Tá, e como funciona a brincadeira?

Bom, não é minha intenção criar um manual do Tasker. Mas vou dar umas dicas pra você testá-lo
(lembre-se dos 15 minutos antes de pedir o dinheiro de volta). Usarei a listinha do início do post.

### Rotacionar a tela apenas em determinados aplicativos

1. Crie um perfil usando o contexto Application
1. Selecione os aplicativos que deseja ativar a rotação de tela
1. Crie uma tarefa usando o menu Display -&gt; Display Rotation -&gt; On
1. Segure o dedão no ícone da tarefa no menu de perfis e escolha "Add Exit Task"
1. Crie uma tarefa usando o menu Display -&gt; Display Rotation -&gt; Off

### Ativar o silencioso ao colocar o celular de cabeça pra baixo

1. Novo Perfil: State -&gt; Sensor -&gt; Orientation -&gt; Face Down
1. Nova Tarefa: Audio Settings -&gt; Ringer Volume -&gt; 0
1. Audio Settings -&gt; Notification Volume -&gt; 0

## Ei, não precisa colocar tarefa de saída do perfil?

Não! Nesse caso, o Tasker irá desfazer as configurações assim que o perfil for desativado. Isso
também vale para o exemplo da rotação da tela (quis colocar a tarefa de saída apenas pra demonstrar
a funcionalidade). Para remover a tarefa de saída, deixe o dedo nela e escolha "Unlink Task".

### Trocar o teclado dependendo do aplicativo

Esse aí requer um plugin para o Tasker. O Tasker é muito flexível e conta com uma estrutura de
plugins muito bacana (apesar de não ter uma documentação à altura). O plugin em questão é o
[Secure Settings][secure_settings], ele permite que você faça muitas coisas (sendo que algumas
precisam de um aparelho [rooteado][post-root]). Com o Secure Settings instalado e seu aparelho
rooteado (sim, mudar o teclado sem intervenção do usuário requer um aparelho rooteado), basta seguir
os passos:

1. Novo Perfil: Application -&gt; Aplicativos que você desejar
1. Tarefa: Plugin -&gt; Secure Settings -&gt; Configuration -&gt; Input Method (Helper Actions) -&gt;
   Teclado de sua escolha
1. Tarefa de saída: Plugin -&gt; Secure Settings -&gt; Configuration -&gt; Input Method (Helper
   Actions) -&gt; Teclado que você usa normalmente

### Ligar o GPS antes de abrir um aplicativo de mapas e desligá-lo ao sair

1. Novo Perfil: Application -&gt; Aplicativos que você desejar
1. Tarefa: Plugin -&gt; Secure Settings -&gt; Configuation -&gt; GPS (Helper Actions) -&gt; On
1. Tarefa de Saída: Plugin -&gt; Secure Settings -&gt; Configuation -&gt; GPS (Helper Actions) -&gt;
   Off

[tasker]: <https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm>
[secure_settings]: <https://play.google.com/store/apps/details?id=com.intangibleobject.securesettings.plugin>
[post-root]: </androidoctor/2013/01/24/root-o-papel-higienico-eletronico-para-o-seu-android/>
