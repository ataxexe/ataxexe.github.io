---
layout: page
title: Sobre
---

## Quem sou eu

Sou o **Marcelo Guimarães**, mais conhecido por **Ataxexe**. Sou um maluco rabugento que gosta de programar e tenta escrever alguma coisa útil neste blog.

Apesar de ter entrado bem tarde no mundo da programação (comecei com 20 anos, bem tarde se comparado a outros malucos como eu), sempre fui encantado por computadores e meu brinquedo preferido era uma calculadora científica (depois arrumei um modelo programável e a coisa ficou melhor ainda... pro desespero dos meus professores). Minha relação com a computação deu início quando eu resolvi largar o curso de Filosofia pra estudar programação. Um maluco igual a mim ficou sabendo e me convidou pra estudar na empresa dele. Desde então o mundo binário não foi mais o mesmo.

O interessante de ter aprendido a programar em uma empresa recheada de gente louca por programação foi que eu pude aprender orientado ao mundo real e, como foram poucas as vezes em que me enfiei no meio da criação de um sistema (praticamente só trabalhei mantendo legado), tive um prato cheio pra aprender a resolver problemas oriundos de falta de perspectiva de médio e longo prazo (os contraexemplos parecem funcionar melhor do que os exemplos). Minha carreira foi praticamente voltada para resolução de problemas, o que eu acho muito divertido.

Também aprendi muita coisa em fóruns de discussão (apesar de, infelizmente, não serem mais os mesmos) e lendo sobre coisas que eu não tinha vontade alguma de usar, mas precisava saber como funcionavam.

Eu acredito que, se soubermos como as coisas funcionam, saberemos como usá-las de forma proveitosa. Por isso criei este blog e espero que aproveitem!

## O que tem no blog

Alguns já devem ter ouvido falar do meu antigo blog, o AndroiDoctor. Ele foi migrado pra cá (usar o WordPress estava acabando com a minha nerdice), juntamente com outro blog que eu iria criar: o Latrina Digital. Este é, basicamente, um cantinho onde eu divago sobre assuntos de tecnologia, mais voltados a desenvolvimento de software. Esses dois rapazes viraram duas categorias especiais no menu de artigos. Além desses, outras categorias mais diretas ao ponto podem aparecer por lá.

## Como funciona o blog

Este blog é estático, ou seja, nada de servidores de aplicação ou banco de dados. Tudo é gerado pra ser um conjunto de páginas estáticas. Pra isso, utilizei o excelente [Jekyll][]. Ele cumpre bem o que promete e tem uma comunidade muito ativa por ser o cara por trás do [GitHub Pages][github-pages].

Confesso que nunca fui muito chegado em programar pra web (apesar de adorar Javascript e venerar o [jQuery][]). Por isso comecei a estudar um pouco de CSS e a relembrar o que já tinha aprendido de Javascript. A escolha do jQuery foi meio óbvia pra mim. Para a parte do CSS, acabei ficando com o [Bootstrap][], o tema [Cyborg][] do [Bootswatch][] (com algumas mudanças) e [Sass][][^sass-less] pra escrever CSS como deveria ser. Essa galerinha me deu uma boa base pra montar um blog bem responsivo e, hoje, aprendi a gostar de web (apesar de continuar gostando muito mais de *backend* e ferramentas de linha de comando).

A parte de temas veio de um feedback de um amigo meu: ele me disse ter achado cansativa a leitura em fundo preto, então, depois de estudar um pouco mais de CSS, eu consegui montar uma estrutura de temas pro blog. Como foi um saco pra fazer a coisa funcionar com *cookies*, eu usei o [Web Storage][] do HTML5 (e estou cagando pros navegadores que não suportam). O tema claro foi baseado no [Readable][], outro excelente tema do [Bootswatch][].

[^sass-less]: Inicialmente eu usava [Less][], mas achei o Sass mais bacana depois de ler um [excelente][sass-vs-less] comparativo entre eles.

Um dos desafios em manter um blog é a organização e pra isso o Jekyll é bem flexível (até demais, pois faltam coisas básicas como geração de páginas de categorias e, por conseguinte, paginação e *feed* delas). Para isso eu criei geradores customizados e, sempre que precisava de alguma coisa (contadores de posts, por exemplo), foi só criar um *plugin*. Além da documentação, temos vários outros [sites][built-with-jekyll] feitos no Jekyll cujos fontes estão liberados no GitHub, então, era só dar uma olhada pra entender como tudo funcionava e poderia ser aplicado ao meu caso.

A parte de busca foi a mais legal de implementar. Como tudo é estático, eu tinha duas alternativas:

#. Redirecionar a busca pra algum motor como o Google.
#. Implementar um mecanismo em Javascript.

Claro que optei pela segunda e, pra não reinventar a roda, utilizei a biblioteca [Lunr][], que é muito simples de usar e relativamente rápida. A dificuldade era de montar o que deveria ser indexado. Indexar os títulos, a categoria e as *tags* de cada post daria uma busca muito simples e colocar o conteúdo geral dos posts levaria a um índice muito pesado pra se colocar no lado do cliente. Optei por utilizar uma pequena parte do post e mandar o Jekyll gerar um [JSON][json-indices] com os índices e montá-lo somente quando o campo de pesquisa é selecionado (por isso ele fica inativo por algum tempo, esse é o tempo necessário pra montar o índice - que varia de dispositivo para dispositivo).

Na parte dos comentários não deu pra fazer muita coisa diferente. Como não posso arquivar nada aqui, acabei utilizando o [Intense Debate][intense-debate] para os comentários e depois troquei pelo [Disqus][] (como quase ninguém comenta por aqui essa mudança praticamente passou despercebida). Os botões de compartilhamento foram frutos da minha preguiça (gerei-os no [ShareThis][]).

Para publicar os posts, eu utilizo um repositório Git que, ao receber um *push*, trata logo de construir o blog e jogá-lo no [Openshift][][^digital-ocean]. Depois da bagunça o *push* é enviado pro [repositório][repo] central, no GitHub. (Tentem imaginar uma estrutura dessas usando alguma porcaria como o SVN[^csv].)

[^digital-ocean]: Antigamente eu usava uma máquina que aluguei um no [DigitalOcean][] e, apesar de recomendar o pessoal de lá, não estava gostando muito de gastar 5 doletas por mês mais os queridos impostos num blog que quase ninguém visita...

[^csv]: CVS não, ele é ruim demais pra ser considerado uma mera porcaria.

Isso significa que o blog é *OpenSource* e pode servir como ajuda pra quem quiser aprender um pouco mais sobre como montar um blog estático com o Jekyll (principalmente porque tem uns [plugins legais][jekyll-plugins] que eu criei no meio dessa confusão toda). Aproveitando a plataforma do GitHub, se você tiver sugestões de posts, pode mandá-las [aqui][issues]. Se tiver alguma melhoria, sinta-se à vontade para clonar o repositório e enviar um *pull request*.

Para os downloads, eu uso minha pasta pública no Dropbox, assim não fico versionando arquivos no repositório do blog. Quanto aos vídeos, vão ficar no [canal][youtube] do blog (se eu tiver saco pra gravá-los). Claro que não podia faltar um [Google Analytics][analytics] no meio da brincadeira!

Ah! Eu não sou fã de anúncios atrapalhando a leitura, então, não precisa se preocupar com eles por aqui (mas pelo menos divulgue essa bagaça pra me ajudar).

[analytics]: <http://www.google.com/analytics/>
[bootstrap]: <http://getbootstrap.com>
[bootswatch]: <http://bootswatch.com>
[built-with-jekyll]: <http://jekyllrb.com/docs/sites>
[cyborg]: <http://bootswatch.com/cyborg>
[digitalocean]: <http://www.digitalocean.com>
[disqus]: <http://disqus.com>
[github-pages]: <http://pages.github.com>
[intense-debate]: <http://intensedebate.com>
[issues]: <https://github.com/ataxexe/unbelievable-exception/issues>
[jekyll]: <http://jekyllrb.com>
[jekyll-plugins]: <https://github.com/ataxexe/unbelievable-exception/tree/master/_plugins>
[jquery]: <http://jquery.com>
[json-indices]: </search.json>
[less]: <http://lesscss.org>
[sass]: <http://sass-lang.com>
[sass-vs-less]: <http://css-tricks.com/sass-vs-less>
[lunr]: <http://lunrjs.com>
[openshift]: <www.openshift.com>
[readable]: <http://bootswatch.com/readable>
[repo]: <https://github.com/ataxexe/unbelievable-exception>
[sharethis]: <http://www.sharethis.com>
[web storage]: <http://www.w3schools.com/html/html5_webstorage.asp>
[youtube]: <http://www.youtube.com/user/unbelievablexception>
