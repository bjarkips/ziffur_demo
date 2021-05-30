---
title: "Binary Numbers: A Gentle Introduction"
description: "Everything you need to know about binary numbers in 5 minutes."
date: "11 May 2021"
image: "/ziffur/stripes_blue_white"
category: "Computer Science"
tags: ["Binary"]
---

> There are 10 types of people in this world: Those who understand binary and those who don't.

Hilarious. 10 out of 10. If you don't understand this joke, that's okay. We're not here to judge. We're here to learn. So let's learn binary.

## What is Binary?

Binary is a numeral system. What's a numeral system, then? A numeral system is a method for representing numbers. The one humans use every day is called the decimal system. This system uses ten symbols, 0–9, to represent all real numbers. In order to represent numbers greater than 9, we use positional notation.

Positional notation can be illustrated by counting. When we run out of symbols, e.g. when we count to 9, we increment a digit to the left and then start the first digit (furthest to the right) over from 0. Since there is no digit to the left of 9, we start from 1. As you already know, this means that after 9 comes 10. This pattern continues until infinity: after 19 comes 20, after 99 comes 100, after 109 comes 110, and so on. The decimal system has a base of 10, making it a base-10 numeral system. This means that every digit to the left of the first weighs 10 times more than the one to its right.

Right. So binary is a numeral system, just like decimal. More specifically, binary is a base-**2** numeral system. This means that binary uses **2** symbols, 0 and 1, to represent all numbers. It also means that, for a binary number, every digit to the left of the first weighs **2** times more than the one to its right. Let's see how this affects counting. Already at 1, we've run out of symbols. Crap. In order to continue counting from here, we use the same pattern as the decimal system. That is, increment the digit to the left (which is technically 0) and then start the first digit over from 0. This means that after 1 comes 10, then 11, 100, 101, 110, 111, 1000, 1001, and so on.

![Binary Counter](https://res.cloudinary.com/mapbert/image/upload/f_auto,q_auto/ziffur/binary_counter.gif "Binary Counter")

The joke is already starting to make sense. The binary representation for the number two (10) is identical to the decimal representation for the number ten. In order to differentiate them, we can write the numeral base in the end, like so: $two = 10_2 = 2_{10}$, or $ten = 1010_2 = 10_{10}$.

## How to Read Binary Numbers

So now we know how to count in binary. But we don't really know how to read or write yet. Let's go back to the decimal system for a bit. Base 10 means each position weighs 10 times more than the one to its right. Take the number 578. Read it out loud. "Five hundred (and) seventy-eight". See what happened there? You calculated the number represented by the digits 578: $5 \times 100 + 7 \times 10 + 8 \times 1$. There's an important pattern in there: each position weighs 10 times more than the one to its right. This means that each position's weight is a power of 10: $1 = 10_0$, $10 = 10_1$, $100 = 10_2$, etc.

Let's see how this system applies to binary numbers. Take the number five. Its binary representation is $101_2$. How does that work and how to we read it? Well binary numbers are not very easy to read due to how many digits are needed to represent them. While not easy, it is quite simple. Using our knowledge of positional notation, we see that:

$$
\bm{101}_2 = \bm1 \times 2^2 + \bm0 \times 2^1 + \bm1 \times 2^0 = \bm1 \times 4 + \bm0 \times 2 + \bm1 \times 1 = 4 + 0 + 1 = 5_{10}.
$$

Here's a second example to illustrate further:

$$
\bm{11010}_2 = \bm1 \times 2^4 + \bm1 \times 2^3 + \bm0 \times 2^2 + \bm1 \times 2^1 + \bm0 \times 2^0 = 16 + 8 + 2 = 26_{10}.
$$

## But why?

Now that we have a pretty good idea how binary numbers work, what makes them so useful? They're generally harder to read, write, and count than decimal numbers, at least for humans with ten fingers. But what has zero fingers, no brain, and near-perfect memory? A computer.

The most important building block in a computer is the transistor. A transistor is an electrical component whose job is to represent one of two states: on or off (1 or 0). The number five can therefore be represented by three transistors ($101_2$: on off on). Scientists (most notably at Intel in Silicon Valley) have developed methods to manufacture circuit boards (contained on small "chips") with billions of transistors whose size is measured in nanometers. By encoding practical information in binary format, such as text, images, and video, computers can store unimaginable amounts of human knowledge and creation.