---
layout: project
id: trugger
---

# Overview

Trugger is a framework that helps you write code that anyone can read. The idea is to provide a set of fluent interfaces to deal with operations related to reflection (such as creating proxies, reflecting members, instantiating objects).

Trugger is intended to be a base for creating infrastructure code. While it is not an IoC container, for example, it could be a part of the core of an IoC container.

## What a hell does the name trugger mean?

When I was learning java, I choosed "Atatec" (*Ataxexe Technology*) to be the name of my fictitious company and then I sent a message to my friend Ives:

> Atatec

And the response was:

> trugger

When I asked him why he came up with this, he said:

> Isn't that the name of that special kick in Street Fighter?

The special kick mentioned is the *Tatsumaki Senpuu Kyaku* and Ken says something like "atatec trugger" (at least in Portuguese) when he does the kick. So the name Trugger became my first choice when I start to write this framework.

## How To Use

Just put the jar file on your **classpath** and you're done. No dependencies are required by Trugger at runtime. If you prefer some build system like Gradle or Maven, trugger is in now in Maven Central repository:

**groupId**: `tools.devnull`

**artifactId**: `trugger`

## How To Build

Just make sure you have [Maven][] and execute the `mvn install` command.

[maven]: <https://maven.apache.org>

## How To Contribute

Just fork the project, do some stuff and send me a pull request. You can also fire an issue or tell your friends to use Trugger.

# Reflection

The Reflection module was the first one to show up in Trugger, it allows simple and much less verbose use of the Reflection API to reflect constructors, methods, fields and generic type declarations.

The base class of this module is `Reflection` and you will find a nice fluent interface there with the methods `reflect`, `invoke` and `handle`.

## Fields

### Single

Reflecting a field is done with the code `reflect().field(field name)`. You can also apply a filter by using the method `filter` and the target class (or object) by using the method `from`. If you need a recursive search through the entire target class hierarchy, just use the method `deep`.

Here is some examples (assuming a `static import`):

```java
Field value = reflect().field("value").from(String.class).result();

Field name = reflect().field("name").deep().in(MyClass.class).result();

Field id = reflect().field("id")
    .filter(field -> field.getType().equals(Long.class))
    .from(someInstance)
    .result();
```

The `filter` method receive a `java.util.function.Predicate` to stay in touch with Java 8.

#### And what about the #result?

The `.result()` is needed because the selection return allows to chain some actions:

```java
String value = reflect()
  .field("aStringField")
  .from(myInstance)
  .and(getValue());

reflect()
  .field("aStringField")
  .from(myInstance)
  .and(setValue("OK"));
```

This allows more readability, at the cost of one more method invocation.

### Multiple

If you need to reflect a set of fields, use the `reflect().fields()`. The same features of a single reflect is available here.

~~~java
List<Field> stringFields = reflect().fields()
    .filter(field -> field.getType().equals(String.class))
    .deep()
    .from(MyClass.class);
~~~

### Predicates

There are some builtin predicates in the class `FieldPredicates`.

~~~java
List<Field> stringFields = reflect().fields()
    .filter(type(String.class)) // a static import
    .deep()
    .in(MyClass.class);
~~~

### Handling Values

A field can have its value manipulated through the method `Reflection#handle`. It will create a handler to set and get
the field's value without the verbosity of the Reflection API. To handle static fields, you can call the handler methods
directly:

~~~java
String value = handle(field).getValue();
handle(field).setValue("new value");
~~~

For instance fields, just specify an instance using the method `on`:

~~~java
String value = handle(field).on(instance).getValue();
handle(field).on(instance).setValue("new value");
~~~

## Constructors

### Single

To reflect a constructor, use `reflect().constructor()` and specify the parameter types and optionally a filter. If the
class has only one constructor, it can be reflected without supplying the parameter types.

~~~java
Constructor constructor = reflect()
  .constructor().withParameters(String.class).from(MyClass.class).result();

Constructor constructor = reflect().constructor()
  .withoutParameters().from(MyClass.class).result();

Constructor constructor = reflect().constructor()
  .filter(c -> c.isAnnotationPresent(SomeAnnotation.class))
  .withParameters(String.class).from(MyClass.class).result();

Constructor constructor = reflect().constructor().from(MyClass.class).result();

MyClass obj = reflect().constructor().from(MyClass.class).and(instantiate(parameter));
~~~

### Multiple

A set of constructors can be reflected by using `reflect().constructors()`. As in fields, the features in single 
reflection are present in multiple reflection.

~~~java
List<Constructor> constructors = reflect().constructors().from(MyClass.class);

List<Constructor> constructors = reflect().constructors()
  .filter(c -> c.getParameterCount() == 2)
  .from(MyClass.class);
~~~

Note that in multiple selection you cannot specify the parameter types directly in the fluent interface (for obvious 
reasons).

### Predicates

A few useful predicates are included in the class `ConstructorPredicates`.

~~~java
List<Constructor> constructors = reflect().constructors()
  .filter(annotated()) // a static import
  .from(MyClass.class);
~~~

### Invocation

To invoke a constructor you need an `Invoker`. The method `Reflection#invoke` returns a Invoker for a constructor.
Specify the parameters and the constructor will be invoked.

~~~java
Constructor c = reflect().constructor()
  .withParameters(String.class).from(String.class)
String name = invoke(c).withArgs("Trugger");
~~~

## Methods

### Single

To reflect a single method, just pass it name to `Reflection#method`. Filtering is allowed and you can specify parameter
types too.

~~~java
Method toString = reflect().method("toString").from(Object.class).result();

Method remove = reflect().method("remove")
  .withParameters(Object.class, Object.class)
  .from(Map.class).result();

Method someMethod = reflect().method("foo")
  .filter(method -> method.isAnnotationPresent(PostConstruct.class))
  .from(instance).result();

reflect().method("foo").from(instance).and(invoke());
~~~

As in field reflection, you can do a deep search with `deep`.

~~~java
Method toString = reflect().method("toString").deep().from(MyClass.class).result();
~~~

### Multiple

A set of methods can be reflected by using `Reflection#methods`:

~~~java
List<Method> methods = reflect().methods().from(Object.class);
~~~

Deep search and filtering are also supported:

~~~java
List<Method> methods = reflect().methods()
  .filter(method -> method.isAnnotationPresent(PostConstruct.class)
  .deep()
  .from(MyClass.class)
  .result();
~~~

### Predicates

A set of predicates to deal with methods is in `MethodPredicates`:

~~~java
List<Method> methods = reflect().methods()
  .filter(annotatedWith(PostConstruct.class)) // a static import
  .deep()
  .from(MyClass.class)
  .result();
~~~

### Invocation

To invoke a method, use the Invoker returned by `Reflection#invoke`. Instance methods needs an instance provided 
using the method `on`:

~~~java
Method toString = reflect().method("toString").on(String.class);
invoke(toString).on("A string").withoutArgs();
~~~

Static methods don't need it:

~~~java
Method parseInt = reflect().method("parseInt")
  .withParameters(String.class)
  .from(Integer.class)
  .resul();
int number = invoke(parseInt).withArgs("10");

// alternatively
int number = reflect().method("parseInt")
  .withParameters(String.class)
  .from(Integer.class)
  .and(invoke("10"));
~~~

## Generic Type

Generic declarations in a class are present in the bytecode. Trugger can reflect them by using the method `genericType`.
Suppose we have this interface:

~~~java
public interface Repository<T> {
  // ... some useful methods here
}
~~~

A generic base implementation can use that **T**:

~~~java
public class BaseRepository<T> {

  private final Class<T> type;

  protected BaseRepository() {
    this.type = reflect().genericType("T").of(this);
  }
}
~~~

The constructor was declared `protected` to warn that this will only work for subclasses (it is a Java limitation). A 
workaround to use this trick in a variable-like way is by declaring an anonymous class:

~~~java
Repository<MyType> repo = new BaseRepository<MyType>(){};
~~~

This is an ugly solution, but works. You can also use a subclass as well, it's not too ugly, but can lead to a tons of
subclasses in your application.

# Proxy Creation

A proxy object is created using a interception handler and optionally a fail handler. The DSL exposed starts at 
`Interception` with the method `intercept` and lets you define one or more interfaces to intercept. Additionally, you
can set a target and its interfaces will be used. After the behaviour specification, use the method `proxy` to create
the proxy instance.

~~~java
SomeInterface proxy = Interception.intercept(SomeInterface.class)
  .onCall(context -> logger.info("method intercepted: " + context.method())
  .proxy();

proxy.doSomething();
~~~

The interception logic happens in the handler passed through the method `onCall`. The handler receives a context, which contains all information about the intercepted method. A fail handler can also be set using the method `onFail`.

~~~java
SomeInterface proxy = Interception.intercept(SomeInterface.class)
  // sets a target to delegate the call using the context object
  .on(instance)
  // delegates the call to the target (this is the default behaviour)
  .onCall(context -> context.invoke())
  // handles any error occurred
  .onFail((context, throwable) -> handleTheFail(throwable))
  .proxy();

proxy.doSomething();
~~~

The fail handler has access to the context so you can delegate the method to the target again (if a timeout occurs, for example).

## The Interception Context

The interception context holds everything related to the method interception, included:

- The arguments passed
- The method intercepted
- The declared method intercepted in the target instance
- The proxy instance
- The target instance (may be null if not specified when creating the proxy)

The context can be used to delegate the method call to the target (using `invoke`) or to another instance (using `invokeOn`). The declared method intercepted can be retrieve by using `targetMethod`.

# Elements of an Object

## What is an Element?

An element is any value that an object holds. It may be accessible through a field, invoking a method (a getter or a setter) or even a specific way like the `Map#get` method.

A basic element in Trugger is a Property or a Field. Trugger tries to find a getter and a setter method for the element name and a field with the same name. This allows manipulate private fields and properties in the same way without bothering you with the way of handling the value.

## Obtaining an Element

An element is obtained using the method `element` in `Elements`. The same features of a field reflection is here with the addition of getting an element without specifying a name. A set of predicates are present in `ElementPredicates`.

~~~java
Element value = element("value").from(MyClass.class).result();

Element id = element()
  .filter(annotatedWith(Id.class)) // static import
  .from(MyClass.class)
  .result();

List<Element> strings = elements()
  .filter(type(String.class) // static import
  .from(MyClass.class);
~~~

## Copying Elements

The elements of an object can be copied to another object, even if they are from different types. The DSL starts at the
method `copy`:

~~~java
copy().from(object).to(anotherObject);
~~~

This will copy every element. To restrict the copy to non null values, use the `notNull` method:

~~~java
copy().from(object).notNull().to(anotherObject);
~~~

You can also apply a function to transform the values before assigning them to the target object (useful when copying
values to a different type of object).

~~~java
copy().from(object)
  .map(copy -> copy.value().toString())
  .to(anotherObject);
~~~

To filter the elements to copy, just give a selector to the `copy` method:

~~~java
copy(elements().filter(annotatedWith(MyAnnotation.class)))
  .from(object)
  .to(anotherObject);
~~~

Or filter the copy directly using `filter`

~~~java
copy(elements().filter(annotatedWith(MyAnnotation.class)))
  .from(object)
  .filter(copy -> copy.dest().isAnnotationPresent(MyAnnotation.class))
  .to(anotherObject);
~~~

## Nested Elements

Nested elements are supported using a **"."** to separate the elements:

~~~java
Element element = element("address.street").from(Customer.class).result();

value = element.from(customer).getValue();
~~~

You can use any level of nesting:

~~~java
Element element = element("customer.address.street").from(Response.class).result();

value = element.from(response).getValue();
~~~

## Custom Elements

Some classes have a custom definition of elements. A `Map` has their keys as elements, an `Array` has their indexes as 
elements an so on. Elements are found by an element finder (a class that implements `Finder<Element>`) and you can write
a custom element finder and register it using the registry available through the method `Elements#registry`.

Trugger has custom element finders for a set of java core classes:

- `Map`: keys are used as the elements
- `ResourceBundle`: keys are used as the elements
- `Properties`: keys are used as the elements
- `ResultSet`: the column names are used as the elements
- `Annotation`: the methods as used as elements
- `List`: indexes are used as the elements (and also two special names, *first* and *last*)
- `Arrays`: indexes are used as the elements (and also two special names, *first* and *last*)

It is important to have clear that since this elements are instance specific, the elements should be queried by passing
an instance instead of a class for the method `from` or an empty list will be returned. For a single elements, you may
pass a class or an instance but using an instance is better because you can call the handling methods directly.

You can also use this custom element finders to copy elements easily:

~~~java
// this will copy every element from the result set to the instance
copy().from(resultSet).to(myEntity);
~~~

# Utilities

## Context Factories

If you need a lightweight component to invoke a constructor with a predicate based logic to resolve the parameter
values, you can use the `ContextFactory`.

A `ContextFactory` is a factory that maps a predicate that evaluates parameters to an object or supplier. After creating
a `ContextFactory`, you can manipulate the context through the `#context` method and create an object with the `create`
method. A set of predicates can be found in `ParameterPredicates` class.

~~~java
ContextFactory factory = new ContextFactory();
factory.context()
  //static imports
  .use(myImplementation)
    .when(type(MyInterface.class))
  .use(someObject)
    .when(named("component"))
  .use(parameter ->
      resolve(parameter.getAnnotation(MyAnnotation.class)))
    .when(annotatedWith(MyAnnotation.class))
  .use(() -> availableWorker())
    .when(type(MyWorker.class));
~~~

The above factory will:

1. use `myImplementation` for any parameter of the type `MyInterface`
2. use `someObject` for any parameter named *"component"*
3. use the return of `resolve` with the annotation `MyAnnotation` for any parameter annotated with `MyAnnotation`
4. use the return of `availableWorker` to any parameter of type `MyWorker`

These steps will be done with every public constructor of a type, if a constructor has one parameter that cannot be resolved to an object, then the next constructor will be used and if there is no more constructors to use, an exception is thrown.

## Component Factories

Component factories allows creating components defined by annotations. Suppose
you have:

~~~java
public @interface ComponentClass {

  Class<? extends Component> value();

}

@ComponentClass(MyComponentImplementation.class)
public @interface MyComponent {

  String name();

}

//inside a class

@MyComponent(name = "myName")
private String aField;
~~~

The annotation in `aField` can be used to create an instance of `MyComponentImplementation`. The context used to create
any components are:

1. Every property of the annotation with their specific types (in that case, the property `name` with the value
*"myName"* to a parameter named `name` and of type `String`)
2. The annotation itself with its type (in that case, the `MyComponent` annotation to the type `MyComponent`)

Since the annotation is used as the context, you can have a constructor in the component implementation that receives
the annotation instead of its properties. This is useful if you don't want to compile your code with `-parameters`
parameter.

This behaviour is completely replaceable by using the method `configureContextWith`. To add behaviour to the default
one, compose the `ComponentFactory#defaults` with your behaviour:

~~~java
factory.configureContextWith(
  defaults().andThen(
    (context, annotation) -> yourConfigurations
  )
);
~~~

To instantiate a component, just use a code like this one:

~~~java
ComponentFactory<ComponentClass, Component> factory =
  new ComponentFactory(ComponentClass.class);

// get the annotation from the field

Component component = factory.create(annotation);
~~~

Alternatively, you can get a list of components by passing an `AnnotatedElement`
to the method `#createAll`:

~~~java
Element = Elements.element("aField").from(myObject).result();
List<Component> components = factory.createAll(element);
~~~

Or creating a single one by passing an `AnnotatedElement` to the method `#create`:

~~~java
Element = Elements.element("aField").from(myObject).result();
Component component = factory.create(element);
~~~

# Extending

## How To Implement the Fluent Interfaces

The fluent interfaces are always defined through java interfaces and may be customized by your own implementation.
Trugger uses a `ServiceLoader` to load a factory that knows the implementations to instantiate, so you can override the
implementation of any fluent interface by defining a file in your **META-INF/services** directory with the factory
implementation.

The factory interfaces that can be customized are listed bellow:

- `ElementFactory`: used for selecting elements
- `ReflectionFactory`: used for reflection in general
- `InterceptorFactory`: used for method interception
