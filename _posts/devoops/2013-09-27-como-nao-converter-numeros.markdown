---
layout: post
title:  "Como não converter números"
category: devoops
language: pt_BR
tags:
  - java
  - refatoração
  - orientação a objetos
  - juquinha
---

É impressionante como alguns programadores são afoitos o bastante para não pensarem um pouco antes
de escrever algum código. É claro que algumas situações já estão no sangue, mas alguns algoritmos
para problemas mundialmente conhecidos provavelmente já estão na API da sua linguagem de programação
preferida.

Um exemplo muito lindo (atente para o fato de que não constam as funções *trocaSubstring* e
*stringToArray*):

~~~java
  /** 
   * Método que converte uma String no padrão #,##0.00 para um double 
   */
  public static double stringToDouble(String pString) {
    if (stringVazia(pString)) {
      return Double.NEGATIVE_INFINITY;
    }
  
    String aux = pString;
    String[] vecPonto = stringToArray(pString, ".", true);
    String[] vecVirgula = stringToArray(pString, ",", true);
  
    if (vecVirgula.length > 1 && vecPonto.length > 1) {
      if (vecVirgula.length == vecPonto.length) {
        if (vecVirgula[0].length() < vecPonto[0].length()) {
          aux = trocaSubString(aux, ",", "");
        } else {
          aux = trocaSubString(aux, ".", "");
          aux = trocaSubString(aux, ",", ".");
        }
      } else if (vecVirgula.length > vecPonto.length) {
        aux = trocaSubString(aux, ",", "");
      } else {
        aux = trocaSubString(aux, ".", "");
        aux = trocaSubString(aux, ",", ".");
      }
    } else if (vecVirgula.length > 2 || vecPonto.length > 2) {
      aux = trocaSubString(aux, ".", "");
      aux = trocaSubString(aux, ",", "");
    } else if (vecVirgula.length == 2) {
      aux = trocaSubString(aux, ",", ".");
    }
  
    return (new Double(aux)).doubleValue();
  }
~~~

Essa beldade move muitos sistemas pelo Brasil afora (sério mesmo, isso é um exemplo real, não foi
feito pelo nosso querido Juquinha). Se você olhou para esse código e não teve uma reação alérgica,
pare de ler esta porcaria de blog e vá ler a documentação da API da linguagem que estiver usando.

Aquelas linhas de diarréia mental poderiam facilmente ser reescritas usando os recursos da API do
Java:

-  `NumberFormat`: responsável pela conversão da `String` para um `Number`, que pode ser
  convertido para `double` facilmente
- `Locale`: reponsável pela maneira de representação de dados de uma localidade.

Antes de reescrevermos nosso código de limpar caquinhas, vamos nos atentar a alguns pontos bem
trágicos no método acima:

- Observe que a documentação do método está errada, pois se analisarmos as estruturas de `if-else`
  veremos que ele tenta imaginar como a merda do número está formatada (calculando se as vírgulas
  são separadores de milhares ou separador decimal)
- Se o parâmetro for vazio, usa um infinito negativo?!?!?!?!??!?!?! Isso mesmo, você não precisa
  marcar uma consulta com seu oftalmologista, é um INFINITO NEGATIVO. Imagina que legal seria uma
  conta com esse valor.
  
Podemos, então, escolher quantos rolos de papel higiênico vamos utilizar pra limpar essa cagada.
Abaixo seguem as versões:

## Um rolo de papel higiênico

Aqui não vamos nos preocupar em melhorar tudo, somente em limpar um pouco aquele super algoritmo do
inferno:

~~~java
  public static double stringToDouble(String pString) {
    // mantém o cocozão supremo, sabe-se lá onde isso é usado no sistema
    if (stringVazia(pString)) {
      return Double.NEGATIVE_INFINITY;
    }
    try {
      NumberFormat format;
      if (pString.lastIndexOf(',') < pString.lastIndexOf('.')) {
        format = DecimalFormat.getInstance(Locale.ENGLISH);
      } else {
        format = DecimalFormat.getInstance(new Locale("pt", "BR"));
      }
      return format.parse(pString).doubleValue();
    } catch (ParseException e) {
      // pra ficar compatível com o tolete
      return Double.NEGATIVE_INFINITY;
    }
  }
~~~

Perceba que agora não é preciso um código macarrônico pra resolver o problema. Faz-se uma comparação
entre a localização do ponto e da vírgula para ver qual formato de número utilizar. Mas esse código
ainda tem um bafo de uísque falsificado, então, vamos limpar mais ainda.

## Dois rolos de papel higiênico

Como esse método provavelmente será muito chamado, poderíamos deixar como variável de classe os
objetos `NumberFormat`:

~~~java
  private static final NumberFormat US_FORMAT =
    DecimalFormat.getInstance(Locale.ENGLISH);

  private static final NumberFormat BR_FORMAT =
      DecimalFormat.getInstance(new Locale("pt", "BR"));

  public static double stringToDouble(String pString) {
    try {
      if (pString.lastIndexOf(',') < pString.lastIndexOf('.')) {
        return US_FORMAT.parse(pString).doubleValue();
      } else {
        return BR_FORMAT.parse(pString).doubleValue();
      }
    } catch (ParseException e) {
      return 0.0;
    }
  }
~~~

Agora está um pouco melhor, o problema desse código é uma dependência muito grande da classe
`NumberFormat` pois são criadas instâncias dessa classe.

## Talquinho e pomada

Apesar de tudo, o melhor mesmo é usar um conversor para o seu framework favorito. Pare um pouco e
pense: em que parte do sistema será necessário converter uma `String` para `double`? Com certeza
será em alguma fronteira dele (interface com usuário, pré-processamento de algum arquivo ou qualquer
coisa parecida) onde, com certeza, pode-se arrumar espaço para aplicar um conversor de dados. Em vez
de montar uma classe com métodos estáticos cheirando a programação estruturada, você tem um
componente e vai usar um pouco melhor a orientação a objetos. (Mas lembre-se: usar a orientação a
objetos não significa que o código será melhor, pode-se ter uma bela cagada orientada a objetos
também).

Outro ponto é: por quê cargas d'água o método tenta converter com duas localizações diferentes? Isso
não caracteriza algo flexível. Seria melhor usar algo do tipo:

~~~java
public class ConversorStringParaDouble {

  private final NumberFormat formato;

  public ConversorStringParaDouble(NumberFormat formato) {
    this.formato = formato;
  }

  public double converter(String string) {
    try {
      return formato.parse(string).doubleValue();
    } catch (Exception e) {
      return 0.0;
    }
  }
  
}
~~~

Bem melhor assim, não é? Agora o conversor não tem a responsabilidade de escolher qual instância de
`NumberFormat` deve usar pois isso não é responsabilidade dele. Imagine se fosse necessário um outro
tipo de conversão com um formato diferente? Em vez de você alterar aquela aberração, pode apenas
usar outra instância do conversor com outro `NumberFormat` e ir pra galera. É claro que podemos
dar um toque melhor extraindo uma interface para o componente e tratando melhor as exceções, mas
pelo menos o código está bem melhor agora.
