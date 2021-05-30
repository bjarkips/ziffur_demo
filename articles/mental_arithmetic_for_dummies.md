---
title: "Mental Arithmetic for Dummies (Using Binary Numbers)"
description: "A light-hearted, informational article on how to solve complex math problems in your head."
date: "4 May 2021"
image: "/ziffur/stack_of_books"
category: "Mathematics"
tags: ["Binary"]
---

Let's imagine a scenario: Your friend just discovered a cool new problem and decides to test you.$^1$ He asks you the following question:

> If you could fold an infinitely large sheet of paper an infinite number of times, after how many folds would it be thick enough to reach the moon?

Seems impossible to calculate in your head, right? It's actually relatively easy. "Relative" is a flexible term, after all. The above situation did happen to me a couple of years ago and I was able to answer it on the spot. My answer wasn't correct, but I came pretty close. The problem is counterintuitive to most because it's an example of exponential scaling. Let's learn how to answer it on the spot.

First, there's a bit of information hidden in the question, namely the thickness of a piece of paper and the distance to the moon. Since we'll be going exponential, you don't need to remember these exactly. As long as they're around the correct order of magnitude, your answer will be accurate enough to blow your friend's mind.

For now, let's assume the thickness of paper ($T_{paper}$) is 0.1 mm (or $10^{-4}$ m) and the distance to the moon ($d_{moon}$) is 400,000 km (or $4 \times 10^8$ m). We should also note that folding a sheet of paper in half doubles its number of layers. Therefore, folding a sheet $x$ times will result in $2^x$ layers.

Time for a little bit of math:

$$
T_{paper} \times 2^x = d_{moon}
$$

$$
2^x = d_{moon} / T_{paper} = 4\times10^8 / 10^{-4} = 4\times10^{8+4} = 4\times10^{12}
$$

$$
2^x = 4,000,000,000,000~\mathrm{(4~trillion)}
$$

This means that in order for a stack of paper (folded x times) to reach the moon, it needs to have 4 trillion layers. From here, you could grab a calculator and learn that $x = \log_2(4 \times 10^{12}) \simeq 41.86$, but that would be boring.$^2$ Let's see how to do it the cool way.

PS. Don't worry if you mess this part up a bit. Your friend will still be impressed if you give them any answer between 30 and 50. In other words, errors made until this point are mostly harmless. Here's where the real magic comes in.

## Harnessing the Arcane Power of Binary Numbers

That was a lot of numbers to juggle in your head, so let's take a step back and see what makes binary numbers so cool.

First, what are "binary numbers"? In this article, I've used the term as a vague buzzword (bad!). The term "binary number" may in fact be technically meaningless, but can be used to describe the binary representation of a real number. This is what enables computer science, computer engineering, and computers in general to exist in their current form. Here I use the term instead to mean "powers of two", which is a different term, albeit closely related.

So what are "powers of two", then? Consider the series $[1, 2, 4, 8, 16, 32, ...]$. Since we can rewrite it as $[2^0, 2^1, 2^2, 2^3, 2^4, 2^5, ...]$, these numbers are "powers of two". Let's see how this relates to our problem: If we fold a piece of paper 0 times, we end up with $2^0 = 1$ layer of paper. If we fold it once, we end up with 2 layers, then 4, 8, 16, 32, and so on. Therefore, in order to solve $2^x = \mathrm{4~trillion}$, we need to find the number in the series closest to 4 trillion.

Don't Panic. There's a very simple rule of thumb we can use here. Some powers of two are notable due to their implications in modern software. Not to get into too much technical detail, binary numbers are limited in range by the number of bits available. In computers, bits are usually grouped together in sets of eight known as bytes. One byte can therefore represent any whole number from 0 (in binary: $00000000_2$) to 255 ($11111111_2$). This is similar to how 3 digits can only represent numbers from 0 to 999 using the decimal system.$^3$

In the original Pokémon games for the Game Boy, for example, the number 255 ($2^8-1$) was the highest possible number a Pokémon could reach in a statistic (attack, speed, etc.), since its value was stored in 1 byte on the game cartridge. YouTube encountered a similar problem when Gangnam Style reached over 2 billion views and the view counter (at the time) could only count to around 2,147 million ($2^{31}-1$, the max value of a 32-bit signed integer).

Fun binary stories aside, our rule of thumb uses the number $2^{10} = 1024$. As we concluded earlier, approximations are mostly harmless when working with exponentials. Therefore we can pretend that $2^{10} \simeq 1000$. With this powerful trick, we can easily solve the rest of our problem:

$$
\begin{align}
2^x &= 4,000,000,000,000\\
&= 4 \times 1000 \times 1000 \times 1000 \times 1000\\
&\simeq 2^2 \times 2^{10} \times 2^{10} \times 2^{10} \times 2^{10}\\
&= 2^{2+10+10+10+10}\\
&= 2^{42}\\
x &\simeq 42
\end{align}
$$

QED.

$^1$ The author's definition of "cool" is entirely subjective and somewhat questionable.

$^2$ Since we don't know how to fold a piece of paper 41.86 times, we will need to fold it 42 times in order to reach the moon. This is why remembering the exact distance to the moon is unnecessary. Using e.g. 300,000 km instead of 400,000 km will result in $x = \log_2(3 \times 10^{12}) \simeq 41.45$, resulting in the same answer of 42 folds.

$^3$ You may also have run into strings like $00$, $FF$, $1F$, $A5$, etc. These are hexadecimal numbers. They can be interpreted as shorthand for binary numbers where e.g. $0_{16} = 0_{10} = 0_2$, $9_{16} = 9_{10} = 1001_2$, $A_{16} = 10_{10} = 1010_2$, and $F_{16} = 15_{10} = 1111_2$.