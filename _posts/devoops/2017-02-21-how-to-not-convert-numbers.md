---
layout: post
title:  "How To Not Convert Numbers"
category: devoops
tags:
  - java
  - refactor
  - object orientation
  - great mighty poo
---

It's really impressive how many programmers are so greed to not think a little before writing code. Of course some 
scenarios are already on our DNA, but many algorithms for well known problems are also well known and probably 
already available in your preferred programming language.

Here is an elegant example (it's missing the `changeSubstring`, `emptyString` and `stringToArray` methods, they're too 
much beautiful to appear here):

~~~java
  /** 
   * Method that converts a String in the pattern #,##0.00 to a double
   */
  public static double stringToDouble(String pString) {
    if (emptyString(pString)) {
      return Double.NEGATIVE_INFINITY;
    }
  
    String aux = pString;
    String[] vecPoint = stringToArray(pString, ".", true);
    String[] vecComma = stringToArray(pString, ",", true);
  
    if (vecComma.length > 1 && vecPoint.length > 1) {
      if (vecComma.length == vecPoint.length) {
        if (vecComma[0].length() < vecPoint[0].length()) {
          aux = changeSubstring(aux, ",", "");
        } else {
          aux = changeSubstring(aux, ".", "");
          aux = changeSubstring(aux, ",", ".");
        }
      } else if (vecComma.length > vecPoint.length) {
        aux = changeSubstring(aux, ",", "");
      } else {
        aux = changeSubstring(aux, ".", "");
        aux = changeSubstring(aux, ",", ".");
      }
    } else if (vecComma.length > 2 || vecPoint.length > 2) {
      aux = changeSubstring(aux, ".", "");
      aux = changeSubstring(aux, ",", "");
    } else if (vecComma.length == 2) {
      aux = changeSubstring(aux, ",", ".");
    }
  
    return (new Double(aux)).doubleValue();
  }
~~~

That beauty powers many applications here in Brazil (seriously, it's a real example). If you looked at that code and 
didn't get a nausea, stop reading this stupid blog and start to read some algorithm book.

Those lines of pure mental diarrhea could be easily rewritten using only the Java API:

- `NumberFormat`: responsible for converting a `String` to a `Number`, which can be easily conveted to a `double`
- `Locale`: responsible for representing how numbers are formatted based on a specific region

But before we begin to rewrite that monster, let's pay attention to the following tragic points:

- The method's documentation is wrong, it doesn't convert a String with that pattern, it tries to guess how the damn
  number is formatted (by looking at the `.` and `,` positions).

- If the parameter is an empty String, it returns a `NEGATIVE INFINITY`. That's right, ladies and gentlemen! And this
  is a financial application. Imagine how nice will be to have a negative infinity in your balance... or transfer a 
  negative infinity to someone.

We need toilet paper, now! This code doesn't even deserve to be flushed through the mouth of its developer.

## One toilet paper roll

Let's just clean some mess, just to make that code a little less evil:

~~~java
  public static double stringToDouble(String pString) {
    // just leave it alone, maybe the whole system will broke if we remove it 
    if (emptyString(pString)) {
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
      // for compatibility
      return Double.NEGATIVE_INFINITY;
    }
  }
~~~

Now I don't need a binary spaghetti to solve the problem. Just a single comparison and that's it. But this code is 
still smelling like a forged whisky so let's use more toilet paper.

## Two toilet paper rolls

Now we can remove the great mighty poo and do a little refactor:

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

Hey! We're getting there, but this code still has a strong dependency over the `NumberFormat` class. Those two 
variables aren't a good solution.

## Talc and ointment

Let's use a real object here. A bunch of static methods only disguise a structured program into an object oriented 
one. But remember: using object oriented programming doesn't infer that you'll end up with a better code, you can have
a great object oriented crap too.

Also, we need to get rid of that format guessing. This is not a flexible solution. Here is the final code:

~~~java
public class StringToDoubleConverter {

  private final NumberFormat format;

  public StringToDoubleConverter(NumberFormat format) {
    this.format = format;
  }

  public double convert(String string) throws ParseException {
    return format.parse(string).doubleValue();
  }
  
}
~~~

Now it's way better, and it's still usable in the application. The converter code can't have the responsibility of 
choosing a `NumberFormat`, it only needs to use the provided one. Of course we can improve a little more this code, 
specially by handling the `ParseException`, not to talk about using some framework's builtin converter - almost any 
MVC framework has support for number conversion out of the box). But at least this code wont give you nightmares and 
diseases.

See ya!