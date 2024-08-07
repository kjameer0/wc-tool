# wc-tool

## Summary

I am building a command line tool that works like the Unix wc command. What does that tool do?:

1. count bytes in a file with -c flag
2. count lines in a file with -l flag
3. count words in file with -w flag
4. count chars in file with -m flag
5. support default option that does 1-3 in one line

## Things we have to know how to do

1. read a file with our programming language
2. distinguish file types(.txt,.pdf,etc)
3. how to tell what a "line" is
4. how to create a terminal command on my local machine
   1. how to add optional flags to a terminal command
5. what is a byte?
6. How to count bytes
7. how separate a file into words
