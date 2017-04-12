---
title:  "RESTful Transactions with Apache Sling"
date:   2013-08-18 23:53:06 +0100
categories: Apache Sling REST
background: /images/transaction.png
layout: post
excerpt_separator: <!--more-->
---
At the adaptTo() Apache Sling conference I gave a talk about RESTFul Transactions with Apache Sling.

### Session Summary:
<blockquote class="blockquote">REST and transactions is an oxymoron.</blockquote>

Trying to force a stateless model into something per definition stateful concept is most likely wrong. However, almost every developer using Apache Sling was at least once faced with the question or requriement to use transactions in his application.

Most engineers are familiar with the theory and usage of transaction working in an old fashion J2EE environment. When transitioning to a modern REST application framework like Sling, in most cases the solution is to use hibernate or similar tools, to leave and violate almost all REST principles.

In this Session we will talk about transactions in general, explain the different kind of transactions and especially how to deal with services layers in conjunctions with Apache Sling. Various approaches, to help J2EE developers to transition fully to a RESTful world, will be explained.
<!--more-->

# RESTFul Transactions with Apache Sling
In this Article I want to cover following Questions:

- Why is this Topic important?
- What are Transactions?
- What is REST?
- Transactions and Apache Sling?


## Why is this Topic important?
This is the questions of all questions, why do we have to write about transactions?
There has been an signifitant shift in web business.
I am the classical year 2k kind of guy. Fancy, nice but this is no longer the case, And the projects: ppl ask spring etc.

### Websites are...
- No longer (just) simple advertisement platforms
- Not only “online Business cards”
- Not a “nice to have” medium
- Not a “Playground”
- ...

_Not only digital representation of your print flyers
Or business cards
Remeber big jpgs?_


### Websites are…
- Serious business
- Make $$$
- Complex
- MUST have
- “Real” Applications

_Once you make money, it is getting serious , remember subdomains?
Forums. Or guestbook. ?  You can’t do that anymore! Before j2ee applications in house was important for business, now we web developer took over_


<blockquote class="blockquote">Your Website IS THE Application</blockquote>

## What Are Transactions?

- Find out “what is a transaction?”
- Quick reminder about REST
- How do this two concepts work together?

<blockquote class="blockquote">An input message to a computer system that must be dealt with
as a single unit of work</blockquote>

### Example
{% highlight ruby linenos %}
begin transaction
    debit checking account
    credit savings account
    update history log
commit transaction
{% endhighlight %}



### Definition?

<blockquote class="blockquote">Late 70s: Jim Gray defined the semantic of reliable transactions</blockquote>
_“James nicholas” Gray
One single unit.  No error and consistent, either transaction si complete without any errors or nothing will be done and you have to rollback the changes in the system_

<blockquote class="blockquote">Early 80s: Andreas Reuter and Theo Härder defined the acronym “ACID” in their paper “Principles of Transaction-Oriented Database Recovery</blockquote>


### ACID

- **A**tomicity
- **C**onsistency
- **I**solation
- **D**urability

_Atomoicity: “all or nothing” – on error, roll back!
Consistency:  transaction will bring the data from one valid state into another valid state. “it is alwayx the appliaction programmer is repsonsible that it is right”
Isolation: two ppl might read and don’t know that there r transactions
Durability: once it is committed it will remain so. Power loss, crash, errors._


### Hybernate?
How do tools like for instance Hybernate deal with Transactions?

{% highlight java linenos %}
Session sess = factory.openSession();
Transaction tx = null;
try {
  tx = sess.beginTransaction();
  //do some working
  ...
  tx.commit();
} catch (RuntimeException e) {
  if(tx != null) tx.rollback();
  throw e;
} finally {
  sess.close();
}
{% endhighlight %}

## What is REST?
- Representational State Transfer
- **Stateless**
- Client-server
- **Cachable**
- Scalable
- ..

# So? How does this work together with transactions?

<div class="jumbotron">
  <div class="container">
    <h1 class="display-4">Transactions and Apache Sling?</h1>
    <p class="lead">REST and transaction is an oxymoron.</p>
  </div>
</div>

## Recap
Atomoicity: “all or nothing” – on error, roll back!
Consistency:  transaction will bring the data from one valid state into another valid state. “it is alwayx the appliaction programmer is repsonsible that it is right”
Isolation: two ppl might read and don’t know that there r transactions
Durability: once it is committed it will remain so. Power loss, crash, errors.


## What are the challenges?

- HTTP REQUEST – RESPONSE PATTERN
- STATELESS
- ..?


<div class="jumbotron">
  <div class="container">
    <h1 class="display-4">You need to change your mindset...</h1>
  </div>
</div>

- Not everything has to be done in one request
- If you are using POST.jsp or similar in Sling, most likely something is wrong
- Events and Observations are your friends
Use the full power of the Sling Default Post and GET Servlet


## Apache Sling Example


Resource: /home/senol/profile

Begin transaction
     change interests
Commit transaction


### Begin Transactions
Copy the node ```/home/senol/profile```
to ```/home/senol/transactions/profile/*```

code example1:

{% highlight html linenos %}
<form action="/home/senol/transactions/profile/*" method="POST">
  <input type="hidden" name="@CopyFrom" value="/home/senol/profile">
  <input type="hidden" name="status" value="begin">
  <input type="hidden" name=":replace" value="true">
  <input type="hidden" name=":redirect" value="/hoe/senol/transactions/profile/*.html">
</form>
{% endhighlight %}

### Change Profile Interest
Update the node with a regular post request

{% highlight html linenos %}
<form action="/home/senol/transactions/profile/1_13800000477631" method="POST">  
  <input type="hidden" name="status" value="inprogress">
  <input type="hidden" name="interest" value="my interests">
</form>
{% endhighlight %}


### Commit Transaction
We have multiple solutions to actually perform the ```commit```.

#### With Observation or Events

{% highlight html linenos %}
<form action="/home/senol/transactions/profile/1_13800000477631" method="POST">  
  <input type="hidden" name="status" value="commit">
</form>
{% endhighlight %}

#### Directly via POST
{% highlight html linenos %}
<form action="/home/senol/profile" method="POST">  
  <input type="hidden" name="@CopyFrom" value="/home/senol/transactions/profile/1_13800000477631">
  <input type="hidden" name="status" value="updated">
  <input type="hidden" name=":replace" value="true">
  <input type="submit" value="save / commit">
</form>
{% endhighlight %}




# Further Reading
- Communicating with services layer
- Distributed transactions
- Nested transactions
- Locking…

## Using Adobe CQ?
Have a look at the Workflow Launcher!
